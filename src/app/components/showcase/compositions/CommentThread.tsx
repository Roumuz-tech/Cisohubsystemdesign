import { MoreHorizontal, Reply } from "lucide-react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { MButton } from "../_shared/MetronicButton";

/* ============================================================
 * 4. CommentThread — threaded comments with replies
 * ========================================================== */
type Comment = {
  id: string;
  who: string;
  initials: string;
  when: string;
  body: string;
  replies?: Comment[];
};

function CommentItem({ c, depth = 0 }: { c: Comment; depth?: number }) {
  return (
    <div className={depth > 0 ? "ms-9 mt-3 ps-3 border-s border-border" : ""}>
      <div className="flex gap-2.5">
        <Avatar className="size-7">
          <AvatarFallback className="text-[10px]">{c.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[12px] font-medium">{c.who}</span>
            <span className="text-[10px] text-muted-foreground">{c.when}</span>
            <button
              aria-label="More"
              className="ms-auto text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="size-3.5" />
            </button>
          </div>
          <div className="text-[12px] text-foreground leading-relaxed">
            {c.body}
          </div>
          <button className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary">
            <Reply className="size-3" /> Reply
          </button>
        </div>
      </div>
      {c.replies?.map((r) => (
        <CommentItem key={r.id} c={r} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentThreadDemo() {
  const thread: Comment[] = [
    {
      id: "1",
      who: "Sara M.",
      initials: "SM",
      when: "2 h ago",
      body: "The evidence file for SC-7 looks outdated — last scan was from Q1. Can we refresh before submitting?",
      replies: [
        {
          id: "1a",
          who: "Khalid R.",
          initials: "KR",
          when: "1 h ago",
          body: "Agreed, I'll re-run the scan today and attach the new report.",
        },
        {
          id: "1b",
          who: "Ahmed S.",
          initials: "AS",
          when: "45 min ago",
          body: "Thanks both. Please tag me when the new evidence is uploaded.",
        },
      ],
    },
    {
      id: "2",
      who: "Lina K.",
      initials: "LK",
      when: "10 min ago",
      body: "Reminder: assessment cycle closes Thursday — let's wrap this up.",
    },
  ];
  return (
    <div className="max-w-[560px] border border-border rounded-lg bg-card p-4 flex flex-col gap-4">
      {thread.map((c) => (
        <CommentItem key={c.id} c={c} />
      ))}
      <div className="flex gap-2 pt-2 border-t border-border">
        <Avatar className="size-7">
          <AvatarFallback className="text-[10px]">YO</AvatarFallback>
        </Avatar>
        <input
          className="flex-1 h-8 px-2.5 rounded-md border border-input bg-input text-[12px] outline-none focus:ring-2 focus:ring-ring/50"
          placeholder="Write a reply…"
        />
        <MButton size="sm" variant="primary">
          Send
        </MButton>
      </div>
    </div>
  );
}
