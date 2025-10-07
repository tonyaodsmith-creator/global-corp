import React from 'react'
export function Tabs({ children }: { children: React.ReactNode }) { return <div>{children}</div> }
export function TabsList({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`inline-flex rounded-xl border border-slate-800 p-1 ${className}`} {...props} />
}
export function TabsTrigger({ className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`px-3 py-1.5 rounded-lg hover:bg-slate-800 ${className}`} {...props} />
}
export function TabsContent({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />
}
