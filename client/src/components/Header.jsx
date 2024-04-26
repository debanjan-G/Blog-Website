import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className="links flex gap-10 font-semibold p-5">

        <Link to="/" className='hover:scale-110 transition text-[#00ADB5]'>🏠 HOME</Link>

      </div>
    </div>
  )
}

export default Header
