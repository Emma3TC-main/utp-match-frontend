export default function RouteLoader() {
  return (
    <div className="route-loader" aria-live="polite" aria-busy="true">
      <div className="route-loader__card">
        <div className="skeleton-line skeleton-line--title" />
        <div className="skeleton-line" />
        <div className="skeleton-grid">
          <div className="skeleton-box" />
          <div className="skeleton-box" />
          <div className="skeleton-box" />
        </div>
      </div>
    </div>
  )
}
