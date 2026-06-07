import { Skeleton } from "../../ui/skeleton";

/* ───────────────────────── Skeleton ───────────────────────── */
export function SkeletonDemo() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 max-w-md">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded" />
          <Skeleton className="h-2.5 w-2/5 rounded" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-[90%] rounded" />
        <Skeleton className="h-3 w-[70%] rounded" />
      </div>
      <div className="text-[11px] text-muted-foreground mt-3">
        Skeleton (RL-15) — never a centered spinner.
      </div>
    </div>
  );
}

/* ============================================================
 * 5. SkeletonWithPattern — composed skeleton (card placeholder)
 * ========================================================== */
function SkeletonCard() {
  return (
    <div className="border border-border rounded-lg p-3 bg-card flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2.5 w-1/4" />
        </div>
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-11/12" />
        <Skeleton className="h-2.5 w-8/12" />
      </div>
      <div className="flex gap-1.5 mt-1">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-12 rounded" />
      </div>
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b border-border last:border-0">
      <Skeleton className="size-7 rounded-md" />
      <Skeleton className="h-3 flex-1" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-5 w-16 rounded" />
    </div>
  );
}

export function SkeletonWithPatternDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        <div className="text-[11px] text-muted-foreground font-medium">
          Card placeholder
        </div>
        <SkeletonCard />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-[11px] text-muted-foreground font-medium">
          Table rows placeholder
        </div>
        <div className="border border-border rounded-lg bg-card">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonTableRow key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
