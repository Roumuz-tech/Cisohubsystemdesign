import { useState } from "react";
import { Upload, File as FileIcon, X } from "lucide-react";
import { MButton } from "../_shared/MetronicButton";

/* ───────────────────────── File Upload (Dropzone) ───────────────────────── */
type DropFile = { name: string; size: number };
export function FileUploadDemo() {
  const [files, setFiles] = useState<DropFile[]>([
    { name: "audit-evidence-q1.pdf", size: 248_320 },
  ]);
  const [dragging, setDragging] = useState(false);

  const fmt = (n: number) => (n < 1024 ? `${n} B` : n < 1_048_576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1_048_576).toFixed(1)} MB`);

  return (
    <div className="flex flex-col gap-3 max-w-lg">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const list = Array.from(e.dataTransfer.files).map((f) => ({ name: f.name, size: f.size }));
          setFiles((s) => [...s, ...list]);
        }}
        className={
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center gap-2 transition-colors " +
          (dragging ? "border-primary bg-primary/5" : "border-border bg-muted/30")
        }
      >
        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Upload className="size-5" />
        </div>
        <div className="text-[13px] font-medium">Drop evidence files here</div>
        <div className="text-[11px] text-muted-foreground">PDF, PNG, JPG up to 10 MB</div>
        <MButton variant="outline" size="sm">Browse files</MButton>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-card">
              <FileIcon className="size-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] truncate">{f.name}</div>
                <div className="text-[11px] text-muted-foreground">{fmt(f.size)}</div>
              </div>
              <button
                onClick={() => setFiles((s) => s.filter((_, j) => j !== i))}
                className="size-7 rounded text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-center"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
