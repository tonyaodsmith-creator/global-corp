import React from 'react'
export function Progress({ value=0, className='' }:{ value?: number; className?: string }){
  return (
    <div className={`h-2 w-full rounded-xl overflow-hidden ${className}`}>
      <div className="h-full bg-cyan-600" style={{ width: `${Math.max(0,Math.min(100,value))}%` }} />
    </div>
  )
}
