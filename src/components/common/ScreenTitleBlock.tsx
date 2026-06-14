export function ScreenTitleBlock({ eyebrow, title, body }: { eyebrow?: string; title: string; body: string }) {
  return (
    <div className="title-block">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}
