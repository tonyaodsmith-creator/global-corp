import React from 'react'
export function Switch({ defaultChecked=false, onCheckedChange }:{ defaultChecked?: boolean; onCheckedChange?: (b:boolean)=>void }){
  const [on,setOn]=React.useState(!!defaultChecked)
  return (
    <button onClick={()=>{ const v=!on; setOn(v); onCheckedChange?.(v) }}
      className={`w-12 h-6 rounded-full transition ${on?'bg-cyan-600':'bg-slate-700'} relative`}>
      <span className={`absolute top-0.5 transition ${on?'left-6':'left-0.5'} inline-block h-5 w-5 rounded-full bg-white`} />
    </button>
  )
}
