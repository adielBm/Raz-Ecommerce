import React from 'react'

export default function Separator({ children }) {
  return (
    <div className="my-6 flex items-center justify-center align-middle">
      <span className="h-1 w-full bg-blue-400 opacity-30"></span>
      <h2 className="mx-6 whitespace-nowrap">{children}</h2>
      <span className="h-1 w-full bg-blue-400 opacity-30"></span>
    </div>
  )
}
