import { NavLink } from 'react-router-dom'
import { BOTTOM_NAV_ITEMS } from '../constants/navigation'

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const Icon = item.icon

        return (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
