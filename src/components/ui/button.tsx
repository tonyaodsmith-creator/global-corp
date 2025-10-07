import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost'
  size?: 'default' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { className = '', variant = 'default', size = 'default', ...props }, ref
) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40'
  const variants = {
    default: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-200'
  } as const
  const sizes = { default: 'px-3 py-2', icon: 'h-9 w-9 p-0' } as const
  return <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
})
