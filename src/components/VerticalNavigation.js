import React from 'react'
import { Link } from 'react-router-dom'

function VerticalNavigation({ activePage, setActivePage }) {
    const dashboard = () => setActivePage('');
    const makePayment = () => setActivePage('make-payment');
    const paymentHistory = () => setActivePage('payment-history');
    const productCollection = () => setActivePage('product-collection');
    const pendingRequest = () => setActivePage('pending-request');
    return (
        <div className="bg-white w-full h-full py-[30px]">
            <h3 className="text-[20px] font-bold mb-1 px-5 pt-2 w-full">My Account</h3>
            <ul className="mt-[30px] space-y-5">
                <li className='mx-3' onClick={dashboard}>
                    <Link to="/" className={`inline-block ${activePage === '' ? 'font-bold bg-blue-500 text-white shadow-md' : ''} py-2 px-8 rounded-md focus:font-bold focus:bg-blue-500 focus:text-white focus:shadow-md hover:bg-gray-200 w-[98%]`}>
                        Dashboard
                    </Link>
                </li>
                <li className='mx-3' onClick={makePayment}>
                    <Link to="/make-payment" className={`inline-block ${activePage === 'make-payment' ? 'font-bold bg-blue-500 text-white shadow-md' : ''} py-2 px-8 rounded-md focus:font-bold focus:bg-blue-500 focus:text-white focus:shadow-md hover:bg-gray-200 w-[98%]`}>
                        Make Payment
                    </Link>
                </li>
                <li className='mx-3' onClick={paymentHistory}>
                    <Link to="/payment-history" className={`inline-block ${activePage === 'payment-history' ? 'font-bold bg-blue-500 text-white shadow-md' : ''} py-2 px-8 rounded-md focus:font-bold focus:bg-blue-500 focus:text-white focus:shadow-md hover:bg-gray-200 w-[98%]`}>
                        Payment History
                    </Link>
                </li>
                <li className='mx-3' onClick={productCollection}>
                    <Link to="/product-collection" className={`inline-block ${activePage === 'product-collection' ? 'font-bold bg-blue-500 text-white shadow-md' : ''} py-2 px-8 rounded-md focus:font-bold focus:bg-blue-500 focus:text-white focus:shadow-md hover:bg-gray-200 w-[98%]`}>
                        Product Collection
                    </Link>
                </li>
                <li className='mx-3' onClick={pendingRequest}>
                    <Link to="/pending-request" className={`inline-block ${activePage === 'pending-request' ? 'font-bold bg-blue-500 text-white shadow-md' : ''} py-2 px-8 rounded-md focus:font-bold focus:bg-blue-500 focus:text-white focus:shadow-md hover:bg-gray-200 w-[98%]`}>
                        Pending Request
                    </Link>
                </li>
            </ul>


        </div>
    )
}

export default VerticalNavigation