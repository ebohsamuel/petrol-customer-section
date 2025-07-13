import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Dashboard({ setActivePage }) {
    const [balance, setBalance] = useState(0);
    const [recentPayment, setRecentPayment] = useState({
        date: '',
        amount: 0
    });
    const [recentCollection, setRecentCollection] = useState([]);
    const makePayment = () => setActivePage('make-payment');
    const ProductCollectionHistory = () => setActivePage('product-collection');
    useEffect(() => {
        const walletBalance = 25000;
        const lastPayment = {
            date: '09-07-2025',
            amount: 10000
        };
        const latestCollections = [
            { product: 'diesel', branch: 'Station 1', amount: 5000, quantity: 10 },
            { product: 'petrol', branch: 'Station 1', amount: 18000, quantity: 20 },
            { product: 'engine-oil', branch: 'Station 2', amount: 5000, quantity: 1 },
        ];
        setBalance(walletBalance);
        setRecentPayment(lastPayment);
        setRecentCollection(latestCollections)
    }, [])
    return (
        <div className='p-2 mt-4 md:p-12'>
            <div className='bg-white md:m-w-[80%] p-4 rounded-lg shadow-lg flex flex-col gap-4'>
                <div className='space-y-1'>
                    <p className='text-gray-500'>Wallet Balance</p>
                    <p className='text-green-600 font-semibold'>₦{balance.toLocaleString()}</p>
                </div>
                <div className='space-y-1'>
                    <p className='text-gray-400'>Last Payment</p>
                    <p className='text-gray-900 font-semibold'>₦{recentPayment.amount.toLocaleString()} on {new Date(recentPayment.date).toDateString()}</p>
                </div>
                <div className='space-y-1'>
                    <p className='text-gray-400'>Last Product Collection</p>
                    <div className='space-y-2'>
                        {recentCollection.length > 0 && recentCollection.map((item, id) => {
                        return (
                            <p className='text-gray-900' key={id}>{item.product} – {item.quantity.toFixed(1)} Units – ₦{item.amount} – at {item.branch}</p>
                        )
                    })}
                    </div>
                </div>
                {/* sam breaking point is for min width of 540px */}
                <div className='space-y-2 sam:space-x-2 lg:space-x-4'>
                    <button onClick={makePayment} className='bg-gray-900 text-white hover:bg-gray-600 py-2 px-8 rounded-lg shadow-lg inline-block'><Link to="/Make-Payment">Make Payment</Link></button>
                    <button onClick={ProductCollectionHistory} className='bg-gray-900 text-white hover:bg-gray-600 py-2 px-8 rounded-lg shadow-lg inline-block'><Link to="/product-collection">View Collection History</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard