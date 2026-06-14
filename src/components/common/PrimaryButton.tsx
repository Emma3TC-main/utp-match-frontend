import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function PrimaryButton({
  children,
  loading = false,
  className = "",
  disabled,
  type = "button",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={`btn btn-primary ${className}`}
      disabled={loading || disabled}
      aria-busy={loading || undefined}
    >
      {loading ? <span className="spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}
