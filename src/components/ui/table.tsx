import React from 'react'
export function Table({ children }:{ children: React.ReactNode }){ return <table className="w-full text-sm">{children}</table> }
export function TableHeader({ children }:{ children: React.ReactNode }){ return <thead className="text-slate-300">{children}</thead> }
export function TableRow({ children }:{ children: React.ReactNode }){ return <tr className="border-t border-slate-800">{children}</tr> }
export function TableHead({ children }:{ children: React.ReactNode }){ return <th className="text-left px-2 py-2 font-medium">{children}</th> }
export function TableBody({ children }:{ children: React.ReactNode }){ return <tbody className="text-slate-200">{children}</tbody> }
export function TableCell({ children, className='' }:{ children: React.ReactNode; className?: string }){ return <td className={`px-2 py-2 ${className}`}>{children}</td> }
