import React, { useEffect, useRef, useState } from 'react'

function ProductCollectionHistory({ showExportChildrenButton, setShowExportChildrenButton, exportRef, pdfRef, excelRef }) {
    const handleExportButtonClick = () => {
        setShowExportChildrenButton(true)
    }
    const startRef = useRef();
    const endRef = useRef();
    const [isDisabled, setIsDisabled] = useState(true)
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: ''
    })

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        // Default max values: today
        startRef.current.max = today;
        endRef.current.max = today;

        // If endDate is selected, adjust startDate constraints
        if (formData.endDate) {
            const end = new Date(formData.endDate);

            const oneYearAgo = new Date(end);
            oneYearAgo.setDate(end.getDate() - 365);

            startRef.current.max = formData.endDate;
            startRef.current.min = oneYearAgo.toISOString().split("T")[0];
        }

        // If startDate is selected, adjust endDate constraints
        if (formData.startDate) {
            endRef.current.min = formData.startDate;
        }

        setIsDisabled(Object.values(formData).some(value => value === ''));

    }, [formData]);
  return (
    <div className='p-2 mt-12 md:mt-0 md:p-12 space-y-8'>
        <div className='bg-white p-2 md:p-4 rounded-md shadow-lg flex gap-4 flex-wrap justify-between flex-none items-center'>
            <div className='flex flex-col xl:w-[23%] w-[98%] gap-2'>
                <label className='font-semibold text-[16px]' htmlFor='startDate'>From</label>
                <input onChange={handleInputChange} value={formData.startDate} ref={startRef} name='startDate' id='startDate' type='date' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md rounded-md outline-none text-gray-500' />
            </div>
            <div className='flex flex-col xl:w-[23%] w-[98%] gap-2'>
                <label className='font-semibold text-[16px]' htmlFor='endDate'>To</label>
                <input onChange={handleInputChange} value={formData.endDate} ref={endRef} name='endDate' id='endDate' type='date' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md rounded-md outline-none text-gray-500' />
            </div>
            <div className='flex flex-col xl:w-[23%] w-[98%] gap-2'>
                <label className='font-semibold text-[16px]' htmlFor='product'>Product</label>
                <select name='product' id='product' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md rounded-md outline-none text-gray-500'>
                    <option value={'all'}>All</option>
                    <option value={'petrol'}>Petrol</option>
                    <option value={'diesel'}>Diesel</option>
                </select>
            </div>
            <div className='self-end'>
                <button disabled={isDisabled} className='disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-600 py-2 px-8 hover:bg-blue-500 rounded-lg shadow-lg text-white focus:ring-1 focus:ring-blue-400 focus:ring-offset-1'>Filter</button>
            </div>
        </div>
        <div className='bg-white p-2 md:p-4 rounded-md shadow-lg relative overflow-x-auto overscroll-x-none'>
            <button ref={exportRef} onClick={handleExportButtonClick} className='py-2 px-8 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg text-white focus:ring-1 focus:ring-blue-400 focus:ring-offset-1'>Export</button>
            <button ref={pdfRef} className={`absolute top-50 z-20 ${showExportChildrenButton ? 'left-[150px] visible': 'left-0 invisible'} transition-left duration-300 ease-in-out bg-gray-900 px-6 py-2 text-white rounded-lg shadow hover:bg-gray-600 focus:ring-1 focus:ring-gray-500 focus:ring-offset-1`}>pdf</button>
            <button ref={excelRef} className={`absolute top-50 z-20 ${showExportChildrenButton ? 'left-[250px] visible': 'left-0 invisible'} transition-left duration-300 ease-in-out bg-gray-900 px-6 py-2 text-white rounded-lg shadow hover:bg-gray-600 focus:ring-1 focus:ring-gray-500 focus:ring-offset-1`}>excel</button>
        </div>
        <div className='bg-white p-4 overflow-y-auto max-h-[300px] overscroll-none'>
            <table className='table-auto border-collapse w-full text-left align-middle'>
                <thead className='sticky -top-4 z-10'>
                    <tr className='h-8 bg-gray-200'>
                        <th className='border-b p-4'>Date</th>
                        <th className='border-b p-4'>Product</th>
                        <th className='border-b p-4'>Quantity</th>
                        <th className='border-b p-4'>Amount(₦)</th>
                        <th className='border-b p-4'>Plate Number</th>
                        <th className='border-b p-4'>Station</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='h-8 hover:bg-gray-100 focus:bg-gray-100 focus:font-semibold' tabIndex="0">
                        <td className='border-b p-4'>2025-10-05</td>
                        <td className='border-b p-4'>petrol</td>
                        <td className='border-b p-4'>20</td>
                        <td className='border-b p-4'>10,000</td>
                        <td className='border-b p-4'>mkk295xa</td>
                        <td className='border-b p-4'>station 1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductCollectionHistory