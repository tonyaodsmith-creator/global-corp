import React from 'react'

type Item = { value: string; label?: string; }

export function Select({ defaultValue, onValueChange, children }:{ defaultValue?: string, onValueChange?: (v:string)=>void, children: React.ReactNode }){
  const [value,setValue] = React.useState(defaultValue||'')
  return <SelectContext.Provider value={{value,setValue,onValueChange}}>{children}</SelectContext.Provider>
}
const SelectContext = React.createContext<{value:string,setValue:(v:string)=>void,onValueChange?: (v:string)=>void} | null>(null)

export function SelectTrigger({ className='', children, ...rest }: React.HTMLAttributes<HTMLDivElement>){
  const ctx = React.useContext(SelectContext)!
  const [open,setOpen]=React.useState(false)
  return (
    <div className={`relative ${className}`} {...rest}>
      <button onClick={()=>setOpen(!open)} className="w-full text-left px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">{children || ctx.value}</button>
      {open && <div className="absolute z-10 mt-1 w-full"><SelectContent onClose={()=>setOpen(false)} /></div>}
    </div>
  )
}
export function SelectValue(){ return null }
export function SelectContent({ className='', onClose }:{ className?:string, onClose?:()=>void }){
  return <div className={`rounded-xl border border-slate-800 bg-slate-900 ${className}`}><div data-select-list/></div>
}
export function SelectItem({ value, children }:{ value: string, children: React.ReactNode }){
  const ctx = React.useContext(SelectContext)!
  React.useEffect(()=>{
    const el = document.currentScript?.previousElementSibling as HTMLElement | null
  },[])
  return (
    <div className="px-3 py-2 hover:bg-slate-800 cursor-pointer"
      onClick={()=>{ ctx.setValue(value); ctx.onValueChange?.(value); }}>
      {children}
    </div>
  )
}
