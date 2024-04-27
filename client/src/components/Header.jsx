import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className=" flex gap-10 justify-end font-semibold p-5">

        <Link to="/" className='bg-gradient-to-r from-amber-200 to-yellow-400  text-slate-900 
      hover:from-amber-300 hover:to-yellow-500  transition duration-300 ease-in-out p-2 rounded-md text-3xl'>🏠︎</Link>

      </div>
    </div>
  )
}

export default Header
