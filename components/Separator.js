import React from 'react'

export default function Separator({children}) {
  return (
    <div className="flex items-center justify-center align-middle my-6">
      <span className="h-1 bg-blue-400 opacity-30 w-full" ></span>
      <h2 className="whitespace-nowrap mx-6">{children}</h2>
      <span className="h-1 bg-blue-400 opacity-30 w-full" ></span>
    </div>
  )
}
