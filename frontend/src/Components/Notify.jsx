import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
const Notify = ({ message, type, onClose }) => {
    return (
        <div className={`relative mt-7 max-w-[280px] mx-auto p-4 rounded-lg shadow-md  ${type === 'success' ? 'bg-cyan-300 text-white' : 'bg-red-500 text-white'} flex items-center justify-between`}>
            <div className="flex items-center justify-between ">

                <div className="flex flex-col justify-start items-start text-gray-700 ml-4">
                    <span className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}:</span>
                    <p className="">{message}</p>
                </div>
                <FaCheck className='absolute top-6 bg-gray-500 left-2 rounded-full p-1' color='white' size={16} />
                <button onClick={onClose} className="ml-2 text-gray-600 hover:text-gray-800 absolute right-2 top-2">
                    <IoCloseOutline  size={25} color="red" />
                </button>
            </div>
        </div>
    )
}
export default Notify
