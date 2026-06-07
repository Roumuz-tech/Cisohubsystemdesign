/* Shared useI18n hook + I18nProvider
   Source: README Bilingual + Authority RL-7/RL-8 + RQ-7
   - Default language: ar (Arabic-first per Authority DA-FONT-01)
   - dir = "rtl" when ar, "ltr" when en
   - t("section.key") looks up the active language                    */

const I18nContext = React.createContext(null);
const I18N_DATA = window.I18N_DATA || {};

function I18nProvider({ children }) {
  // Default language: Arabic (RTL) per Authority _INDEX.md §E.1 + README content guidelines
  const [lang, setLang] = React.useState("ar");
  const dir = lang === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang, dir]);

  const t = React.useCallback((path) => {
    const parts = path.split(".");
    let node = I18N_DATA[parts[0]];
    if (!node) return path;
    node = node[lang] || node.en;
    for (let i = 1; i < parts.length; i++) {
      if (!node) return path;
      node = node[parts[i]];
    }
    return node || path;
  }, [lang]);

  const value = React.useMemo(() => ({ lang, dir, t, toggleLang: () => setLang(l => l === "ar" ? "en" : "ar"), setLang }), [lang, dir, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

window.I18nProvider = I18nProvider;
window.useI18n = useI18n;
window.I18nContext = I18nContext;
