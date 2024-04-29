import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className=" flex gap-10 justify-end font-semibold p-5">

        <Link to="/" className='p-2 rounded-md text-4xl hover:text-black'>🏠︎</Link>

      </div>
    </div>
  )
}

export default Header
