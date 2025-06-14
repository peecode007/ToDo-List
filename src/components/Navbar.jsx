import React from 'react'

const Navbar = () => {
  return (
    <>
        <nav className="navbar flex bg-indigo-700 text-white justify-around gap-16 min-h-[7vh] items-center">
            <div className="logo">
                <span className='font-bold cursor-pointer text-xl'><a href="/">iTaskMaster</a></span>
            </div>
            <ul className="flex gap-5 font-bold">
                <li><a href="/" className=' hover:border-2 hover:bg-gradient-to-tr from-indigo-500 to-indigo-950-950 p-2 m-2 rounded-xl hover:shadow-lg'>Home</a></li>
                <li><a href="/about" className=' hover:border-2 hover:bg-gradient-to-tr from-indigo-500 to-indigo-950-950 p-2 m-2 rounded-xl hover:shadow-lg'>About Us</a></li>
                <li><a href="/contact" className=' hover:border-2 hover:bg-gradient-to-tr from-indigo-500 to-indigo-950-950 p-2 m-2 rounded-xl hover:shadow-lg'>Contact Us</a></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar
