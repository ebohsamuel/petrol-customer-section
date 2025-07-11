import React, { useEffect, useState } from 'react'

function PendingRequest() {
    const [stations, setStations] = useState([]);
    const [products, setproducts] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [pendingRequestData, setPendingRequestData] = useState([])
    const [formData, setFormData] = useState({
        product: '',
        quantity: '',
        plateNumber: '',
        station: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSubmitRequest = () => {
        setPendingRequestData(prevData => {
            if (prevData.length !== 0) {
                const allIndex = prevData.map(item => item.id);
                const newIndex = Math.max(...allIndex) + 1;

                return [...prevData, { id: newIndex, date: new Date().toISOString().split('T')[0], ...formData }];
            } else {
                return [{ id: 1, date: new Date().toISOString().split('T')[0], ...formData }];
            }
        });
        setFormData({
            product: '',
            quantity: '',
            plateNumber: '',
            station: ''
        })
    };
    const handleCancelPendingRequest = (requestId) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure about cancelling this request?')) {
            setPendingRequestData(prevData => {
            const updatedData = [...prevData];
            return (
                updatedData.filter(item => item.id !== requestId)
            )
        })
        }
    }

    useEffect(() => {
        const {plateNumber, ...formDataWithOutPlateNumber} = formData
        const isEmpty = Object.values(formDataWithOutPlateNumber).some(value => value === '');
        setIsDisabled(isEmpty || parseInt(formDataWithOutPlateNumber.quantity) === 0);
    }, [formData])

    useEffect(() => {
        const stationData = [
            { id: 1, name: 'station 1' },
            { id: 2, name: 'station 2' },
            { id: 3, name: 'station 3' },
        ];
        const productData = [
            { id: 1, name: 'petrol' },
            { id: 2, name: 'diesel' },
            { id: 3, name: 'engine oil' },
        ];
        setStations(stationData);
        setproducts(productData);
    }, [])
    return (
        <div className='p-2 mt-12 md:mt-0 md:p-12 space-y-8'>
            <div className='bg-white p-2 md:p-4 space-y-8 rounded-md shadow-lg'>
                <h2 className='text-gray-900 font-bold text-2xl'>New Product Request</h2>
                <div className='flex gap-4 flex-wrap flex-none justify-between'>
                    <div className='flex flex-col gap-2 w-[98%] xl:w-[23%]'>
                        <label className='font-semibold text-[16px]' htmlFor='product'>Product *</label>
                        <select required onChange={handleInputChange} value={formData.product} name='product' id='product' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md'>
                            <option value="">Select Product</option>
                            {products.length > 0 && products.map(product => {
                                return (
                                    <option key={product.id} value={product.name}>{product.name[0].toUpperCase() + product.name.slice(1).toLowerCase()}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='flex flex-col gap-2 w-[98%] xl:w-[23%]'>
                        <label className='font-semibold text-[16px]' htmlFor='quantity'>Quantity *</label>
                        <input required onChange={handleInputChange} value={formData.quantity} name='quantity' type='number' id='quantity' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md rounded-md outline-none text-gray-500' />
                    </div>
                    <div className='flex flex-col gap-2 w-[98%] xl:w-[23%]'>
                        <label className='font-semibold text-[16px]' htmlFor='plateNumber'>Plate Number</label>
                        <input onChange={handleInputChange} value={formData.plateNumber} name='plateNumber' type='text' id='plateNumber' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md rounded-md outline-none text-gray-500' />
                    </div>
                    <div className='flex flex-col gap-2 w-[98%] xl:w-[23%]'>
                        <label className='font-semibold text-[16px]' htmlFor='station'>Station *</label>
                        <select required onChange={handleInputChange} value={formData.station} name='station' id='station' className='px-4 border border-gray-200 h-[50px] rounded-md drop-shadow-md'>
                            <option value="">Select Station</option>
                            {stations.length > 0 && stations.map(station => {
                                return (
                                    <option key={station.id} value={station.name}>{station.name[0].toUpperCase() + station.name.slice(1).toLowerCase()}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <button onClick={handleSubmitRequest} disabled={isDisabled} className='bg-gray-900 text-white focus:ring focus:ring-gray-900 hover:bg-gray-700 focus:ring-offset-1 px-8 py-2 rounded-lg shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed'>Submit Request</button>
                </div>
            </div>
            <div className='bg-white p-2 md:p-4 rounded-md shadow-lg overflow-auto max-h-[300px] overscroll-none'>
                <table className='table-auto border-collapse w-full text-left align-middle'>
                    <thead className='sticky -top-4 z-10'>
                        <tr className='h-8 bg-gray-200'>
                            <th className='border-b p-4'>Date</th>
                            <th className='border-b p-4'>Product</th>
                            <th className='border-b p-4'>Quantity</th>
                            <th className='border-b p-4'>Station</th>
                            <th className='border-b p-4'>Plate Number</th>
                            <th className='border-b p-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequestData.length > 0 && pendingRequestData.map(item => {
                            return (
                                <tr className='h-8' key={item.id}>
                                    <td className='border-b p-4'>{item.date}</td>
                                    <td className='border-b p-4'>{item.product}</td>
                                    <td className='border-b p-4'>{item.quantity}</td>
                                    <td className='border-b p-4'>{item.station}</td>
                                    <td className='border-b p-4'>{item.plateNumber}</td>
                                    <td className='border-b p-4'><button onClick={() => handleCancelPendingRequest(item.id)} className='bg-red-600 px-2 py-1 rounded-md shadow-md hover:bg-red-300 text-white'>Cancel</button></td>
                                </tr>
                            )
                        })}
                        {pendingRequestData.length === 0 && (
                            <tr className='h-8'>
                                <td className='border-b p-4 text-center' colSpan={5}>No pending request available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingRequest