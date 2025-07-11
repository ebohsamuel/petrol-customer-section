import React, { useEffect, useState } from 'react'
import { CreditCard } from 'react-bootstrap-icons'

function MakePayment() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [inputData, setInputData] = useState('');
    const handleInputChange = (e) => {
        setInputData(e.target.value)
    }
    useEffect(() => {
        setIsDisabled(inputData>10000 ? false : true)
    }, [inputData])
  return (
    <div className='p-2 mt-8 md:mt-0 md:p-12 flex justify-center w-[100%]'>
        <div className='p-4 w-[100%] md:w-[90%] space-y-4 bg-white shadow-lg rounded-md'>
            <h2 className='text-gray-900 font-extrabold text-2xl'>Make Payment</h2>
            <div className='space-y-2'>
                <label className='block text-gray-600 font-semibold'>Amount (₦)</label>
                <input onChange={handleInputChange} type="number" name='amount' value={inputData} placeholder='e.g., 5000' className='text-gray-700 border border-gray-200 placeholder-gray-400 focus:outline-none w-full h-12 rounded-md px-4 drop-shadow-md' />
                <span className='text-red-500 mt-0.5 inline-block'>minimum amount is ₦10,000</span>
            </div>
            <button className='space-x-1 w-full py-2 shadow-md rounded-md hover:bg-gray-700 flex justify-center items-center  bg-gray-900 text-white disabled:bg-gray-500 disabled:cursor-not-allowed' disabled={isDisabled}><CreditCard className='mr-2 h-5 w-5' />Pay Now</button>
        </div>
    </div>
  )
}

export default MakePayment