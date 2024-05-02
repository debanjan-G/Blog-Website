// import React from 'react'
import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

const AccDeleted = () => {

    // const { action } = useLocation().state

    return (
        <div className='flex flex-col bg-slate-100 h-screen items-center justify-center'>
            {/* <img src="https://www.pngitem.com/pimgs/m/423-4236284_png-images-success-icon-png-transparent-png-download.png" alt="" className='h-56' /> */}
            <h1 className='text-6xl font-semibold text-slate-700'>It's gone.</h1>

            <div className="flex my-4 gap-4">
                <Link to="/">
                    <button className='bg-slate-700 text-slate-200 py-3 px-4 rounded-2xl hover:bg-slate-800'>Home</button>
                </Link>
                <Link to="/register">
                    <button className='bg-slate-300 text-slate-700  py-3 px-4 rounded-2xl hover:bg-slate-400 hover:text-slate-200'>Sign up again</button>
                </Link>
            </div>

        </div>
    )
}

export default AccDeleted
