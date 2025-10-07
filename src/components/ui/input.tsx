import React from 'react'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 ${props.className||''}`} />
}
