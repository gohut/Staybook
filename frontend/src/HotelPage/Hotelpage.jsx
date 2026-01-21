import React, { useState, useEffect } from "react";
import'./hotelpage.css'
import Navbar from './Comp/Navbar'
import LuxeSelection from './Comp/LuxeSelection'
import Footer from '../Components/Footer'
import Logincont from './Logincont'

export default function Hotelpage() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showLogin]);

  return (
    <div className='hotelpage-mn'> 
      <Navbar onLoginClick={() => setShowLogin(true)} />
      {showLogin && <Logincont onClose={() => setShowLogin(false)}  showlgn={showLogin}/>}
      <LuxeSelection/>
      <Footer/>
    </div>
  )
}
