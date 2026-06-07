import { useState } from "react";
import { CheckCircle2, Copy, FileText } from "lucide-react";

/* ───────────────────────── Code block + Diff ───────────────────────── */
export function CodeBlockDemo() {
  const [copied, setCopied] = useState(false);
  const code = `// audit-log.ts
import { createHash } from "crypto";

export function hashEvidence(buf: Buffer): string {
  return createHash("sha256")
    .update(buf)
    .digest("hex");
}`;
  return (
    <div className="rounded-lg border border-border bg-zinc-950 text-zinc-100 overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
          <FileText className="size-3.5" />
          audit-log.ts
        </div>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded"
        >
          {copied ? <><CheckCircle2 className="size-3" /> Copied</> : <><Copy className="size-3" /> Copy</>}
        </button>
      </div>
      <pre className="p-4 text-[12.5px] leading-relaxed font-mono overflow-x-auto"><code>{code}</code></pre>
    </div>
  );
}
