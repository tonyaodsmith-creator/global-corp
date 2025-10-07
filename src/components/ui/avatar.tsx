import React from 'react'
export function Avatar({ className='', children }:{ className?: string; children: React.ReactNode }){
  return <div className={`rounded-full overflow-hidden bg-slate-800 ${className}`}>{children}</div>
}
export function AvatarImage({ src }:{ src?: string }){ return <img src={src} alt="" className="w-full h-full object-cover" /> }
export function AvatarFallback({ children }:{ children: React.ReactNode }){ return <div className="w-full h-full grid place-items-center text-sm">{children}</div> }
