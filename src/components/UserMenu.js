import React from 'react'
import aoc from '../assets/aoc.jpg'
import { Link } from 'react-router-dom'
import { FilterLeft } from 'react-bootstrap-icons';

function UserMenu({ setIsShown, isShown, userRef, setShowVerticalNav }) {
    const handleImageClick = () => {
        setIsShown(prevData => !prevData)
    }
    const handleFilterClick = () => {
      setShowVerticalNav(true)
    }
  return (
    <>
        <FilterLeft onClick={handleFilterClick} className='text-7xl md:invisible text-gray-900 cursor-pointer' />
        <img src={aoc} onClick={handleImageClick} className="w-[70px] h-[70px] mr-[5px] rounded-full object-contain cursor-pointer" alt="aoc pics" />
        <div ref={userRef} className={"absolute right-[10px] h-[150px] bottom-[-145px] bg-white rounded-md shadow-xl z-20 flex flex-col gap-1 flex-none transition-opacity duration-200 ease-in-out " + (isShown ? "visible opacity-100" : "invisible opacity-0")}>
            <span className="inline-block w-52 px-2 py-4 font-bold text-[20px]">Samuel Eboh</span>
            <hr className="my-[5px] border-1 border-gray-900" />
            <span className="inline-block w-52 px-2 py-4 cursor-pointer font-[600] text-[18px] hover:bg-gray-200"><Link to="/account-setting">Account Settings</Link></span>
            <button className="py-4 bg-gray-900 text-white rounded-b-md hover:bg-gray-500 text-[20px]"><Link to="/logout">Logout</Link></button>
        </div>
    </>
  )
}

export default UserMenu