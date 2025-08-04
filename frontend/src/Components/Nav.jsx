import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { CiLight } from "react-icons/ci";
const Nav = ({darkMode, toggleDarkMode, onAddProduct}) => {
  return (
    <nav className={`flex justify-center ${darkMode ? 'bg-blue-950 text-white' : 'bg-white text-black'} p-4`}>
         <div className="">
            <h1 className="">Products store</h1>
            <FaShoppingCart size={25} className='text-cyan-500' />
         </div>
         <div className="flex gap-4">
            <button className="">
               <MdOutlineAddBox size={25} className='text-cyan-500' onClick={onAddProduct} />
            </button>
            <button className="">
                {
                   darkMode?  (<HiOutlineMoon size={25} className='text-gray-700' onClick={toggleDarkMode} />) : (<HiOutlineSun size={25} className='text-cyan-500' onClick={toggleDarkMode} />)
                }
            </button>
         </div>
    </nav>
  )
}

export default Nav
