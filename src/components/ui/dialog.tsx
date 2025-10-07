import React from 'react'
const Ctx = React.createContext<{open:boolean,setOpen:(b:boolean)=>void}|null>(null)
export function Dialog({ children }:{ children: React.ReactNode }){
  const [open,setOpen] = React.useState(false)
  return <Ctx.Provider value={{open,setOpen}}>{children}</Ctx.Provider>
}
export function DialogTrigger({ asChild=false, children }:{ asChild?: boolean; children: React.ReactElement }){
  const ctx = React.useContext(Ctx)!
  if (asChild) return React.cloneElement(children, { onClick: ()=>ctx.setOpen(true) })
  return <button onClick={()=>ctx.setOpen(true)}>{children}</button>
}
export function DialogContent({ className='', children }:{ className?: string; children: React.ReactNode }){
  const ctx = React.useContext(Ctx)!
  if (!ctx.open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={()=>ctx.setOpen(false)} />
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,92vw)] rounded-2xl border border-slate-800 bg-slate-900 ${className}`}>
        {children}
      </div>
    </div>
  )
}
export function DialogHeader({ children }:{ children: React.ReactNode }){ return <div className="p-4 border-b border-slate-800">{children}</div> }
export function DialogTitle({ children }:{ children: React.ReactNode }){ return <div className="text-lg font-semibold">{children}</div> }
export function DialogDescription({ children }:{ children: React.ReactNode }){ return <div className="text-sm text-slate-400">{children}</div> }
