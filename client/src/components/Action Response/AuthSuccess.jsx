import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const AuthSuccess = () => {

    const { action } = useLocation().state

    return (
        <div className='flex flex-col h-screen items-center justify-center'>
            <img src="https://www.svgrepo.com/show/422280/correct-success-tick.svg" alt="" className='h-56 my-4' />
            <h1 className='text-5xl text-slate-700'>{action} successful</h1>
            <div className="flex my-4 gap-4">
                <Link to="/">
                    <button className='bg-slate-700 text-slate-200 py-3 px-4 rounded-2xl hover:bg-slate-800'>Home</button>
                </Link>
                <Link to="/profile">
                    <button className='bg-slate-200 text-slate-700  py-3 px-4 rounded-2xl hover:bg-slate-300'>Dashboard</button>
                </Link>
            </div>

        </div>
    )
}

export default AuthSuccess
