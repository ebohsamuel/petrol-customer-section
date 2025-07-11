import React, { useEffect, useState } from 'react'

function PaymentHistory() {
    const [paymentHistoryData, setPaymentHistoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [inputData, setInputData] = useState('');

    const handleInputChange = (e) => {
        setInputData(e.target.value)
    }

    useEffect(() => {
        setFilteredData(() => {
            if (!inputData) {
                return paymentHistoryData
            } else {
                return (
                    paymentHistoryData.filter(item => item.date.includes(inputData.toLowerCase().trim()))
                )
            }
        })
    }, [inputData, paymentHistoryData])

    useEffect(() => {
        const history = [
            { date: '2025-06-21', amount: 10000 },
            { date: '2025-06-17', amount: 5000 },
            { date: '2025-06-15', amount: 17000 },
            { date: '2025-06-14', amount: 22000 },
            { date: '2025-06-10', amount: 19000 },
            { date: '2025-06-08', amount: 7500 },
            { date: '2025-06-05', amount: 23000 },
            { date: '2025-06-03', amount: 8800 },
            { date: '2025-05-30', amount: 14000 },
            { date: '2025-05-27', amount: 6000 },
            { date: '2025-05-25', amount: 21000 },
            { date: '2025-05-20', amount: 18000 },
            { date: '2025-05-15', amount: 12000 },
            { date: '2025-05-12', amount: 9000 },
            { date: '2025-05-10', amount: 16000 },
        ];

        setPaymentHistoryData(history);
    }, [])
    useEffect(() => {
        setFilteredData(paymentHistoryData)
    }, [paymentHistoryData])
    return (
        <div className='p-2 md:p-12 mt-8 md:mt-0 space-y-8'>
            <div className='bg-white h-20 px-4 flex items-center shadow-xl rounded'>
                <input onChange={handleInputChange} value={inputData} name='inputSearch' placeholder='Search Date...' type='text' id='inputSearch' className='border border-gray-200 drop-shadow-md h-14 w-full rounded-md outline-none px-4 placeholder-gray-400 text-gray-500' />
            </div>
            <div className='bg-white p-4 overflow-y-auto max-h-[300px] overscroll-none'>
                <table className='table-auto border-collapse w-full text-left align-middle'>
                    <thead className='sticky -top-4 z-10'>
                        <tr className='h-8 bg-gray-200'>
                            <th className='border-b p-4'>Date</th>
                            <th className='border-b p-4'>Amount (₦)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 && filteredData.map((item, id) => {
                            return (
                                <tr className='h-8 hover:bg-gray-100 focus:bg-gray-100 focus:font-semibold' tabIndex="0" key={id}>
                                    <td className='border-b p-4'>{item.date}</td>
                                    <td className='border-b p-4'>₦{item.amount}</td>
                                </tr>
                            )
                        })}
                        {filteredData.length === 0 && (
                            <tr className='h-8'>
                                <td className='border-b p-4' colSpan={2}>No payment history available</td>
                            </tr>
                        )}
                        <tr className='h-8'>
                            <td className='border-b p-4 text-center' colSpan={2}>Loading ...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentHistory