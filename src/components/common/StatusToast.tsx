import { AlertCircle, CheckCircle2 } from "lucide-react";

export function StatusToast({
  title,
  body,
  tone = "success",
}: {
  title: string;
  body: string;
  tone?: "success" | "warning";
}) {
  const Icon = tone === "warning" ? AlertCircle : CheckCircle2;

  return (
    <div className={`toast toast--${tone}`}>
      <Icon size={18} />
      <div>
        <strong>{title}</strong>
        <span>{body}</span>
      </div>
    </div>
  );
}
