export function StatusToast({ title, body }: { title: string; body: string }) {
  return (
    <div className="toast">
      <strong>{title}</strong>
      <span>{body}</span>
    </div>
  )
}
