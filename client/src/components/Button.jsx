import React from 'react'

const Button = ({children}) => {
  return (
    <button className='bg-slate-900 py-4 px-10 opacity-90 text-white font-bold hover:opacity-100'>
      {children}
    </button>
  )
}

export default Button
