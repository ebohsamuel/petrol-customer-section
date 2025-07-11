import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import VerticalNavigation from "./components/VerticalNavigation";
import UserMenu from './components/UserMenu';
import { useState, useRef, useEffect } from 'react'
import Dashboard from "./components/Dashboard";
import MakePayment from "./components/MakePayment";
import PaymentHistory from "./components/PaymentHistory";
import PendingRequest from "./components/PendingRequest";


function App() {

  const [isShown, setIsShown] = useState(false)
  const [showVerticalNav, setShowVerticalNav] = useState(false)
  const [activePage, setActivePage] = useState('');
  const userRef = useRef();

  useEffect(() => {
    const path = window.location.pathname.split('/').filter(Boolean).pop() || '';
    if (['', 'make-payment', 'payment-history', 'product-collection',].includes(path)) {
      setActivePage(path);
    }
  }, []);

  useEffect(() => { setShowVerticalNav(false) }, [activePage]);

  const handleAppClick = (e) => {
    if (isShown && !userRef.current.contains(e.target)) {
      setIsShown(false);
    }
  }
  const handleCoverClick = () => {
    if (showVerticalNav) {
      setShowVerticalNav(false);
    }
  }
  return (
    <Router>
      
      <div onClick={handleAppClick} className="grid grid-rows-7 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-2 h-screen w-screen font-poppins">
        {/* Sidebar: only visible on md and above */}
        <div className="hidden md:block md:col-span-1 row-start-1 row-span-7">
          <VerticalNavigation setActivePage={setActivePage} activePage={activePage} />
        </div>
        {/* Mobile sidebar (slide-in, controlled by showVerticalNav) */}
        <div className={`fixed top-0 ${showVerticalNav? 'left-0':'-left-full'} w-[250px] h-screen z-50 md:hidden transition-left duration-300 ease-in-out`}>
          <VerticalNavigation setActivePage={setActivePage} activePage={activePage} />
        </div>
        {/* Mobile sidebar cover (slide-in, controlled by showVerticalNav) */}
        <div onClick={handleCoverClick} className={`fixed top-0 ${showVerticalNav? 'left-0':'-left-full'} w-screen h-screen z-40 bg-gray-500 md:hidden opacity-60 transition-left duration-300 ease-in-out`}></div>

        {/* Top Bar */}
        <div className="row-start-1 col-span-2 lg:col-span-3 bg-gray-200 flex justify-between items-center relative">
          <UserMenu userRef={userRef} setIsShown={setIsShown} isShown={isShown} setShowVerticalNav={setShowVerticalNav} />
        </div>

        {/* Main Content */}
        <div className="row-start-2 row-span-6 col-span-2 lg:col-span-3 bg-gray-200 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard setActivePage={setActivePage} />} />
            <Route path="/make-payment" element={<MakePayment />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/pending-request" element={<PendingRequest />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
