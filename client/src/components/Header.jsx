import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className=" flex gap-10 font-semibold p-5">

        <Link to="/" className='bg-gradient-to-r from-amber-200 to-yellow-400 hover:scale-110 transition text-slate-900 p-4 rounded-md text-3xl'>🏠︎</Link>

      </div>
    </div>
  )
}

export default Header
