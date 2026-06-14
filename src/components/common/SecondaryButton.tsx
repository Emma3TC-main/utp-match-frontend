import type { ButtonHTMLAttributes } from 'react'

export function SecondaryButton(props: ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  const { children, className = '', ...rest } = props

  return (
    <button className={`btn btn-secondary ${className}`} type="button" {...rest}>
      <span>{children}</span>
    </button>
  )
}
