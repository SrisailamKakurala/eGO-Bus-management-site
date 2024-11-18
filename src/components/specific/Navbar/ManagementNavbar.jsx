import React from 'react'
import logo from '../../../assets/images/logo.png'

const Navbar = () => {
    return (
        <div className='absolute top-0 w-full flex items-center py-3 px-8  bg-[#FCD32D]'>
            <img className='w-12 h-12 mr-3' src={logo} alt="Logo" />
            <span className="text-3xl text-slate-800 font-bold font-['Ubuntu']">
                eGO Bus
            </span>
        </div>
    )
}

export default Navbar