import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from "./MainNavbar/Navbar"
import LuxeSelection from "./Hotel_section/Main_Cont/LuxeSelection";
import Logincont from "./Login_container/Logincont";
import Footer from '../../Components/Footer';
import './landingpge.css';
import ExperienceAirlines from './Flight_section/Flight_content/ExperienceAirlines';
import FlagshipHotels from './Flight_section/Flight_content/FlagshipHotels';
import HandpickedCollections from './Flight_section/Flight_content/HandpickedCollections';
import VillasCities from './HmeStay_section/HmstayCont/VillasCities';
import OffersSection from './HmeStay_section/HmstayCont/OffersSection';
import DealsAndDestinations from "./Package_section/PackageContent/DealsAndDestinations";

export default function Landingpge() {
    const [activeTab, setActiveTab] = useState("Hotels");
      const [showLogin, setShowLogin] = useState(false);
      
      useEffect(() => {
        document.body.style.overflow = showLogin ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
      }, [showLogin]);
  return (
    <div>
        <div className='hotelpage-mn'> 
<Navbar
  onLoginClick={() => setShowLogin(true)}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

      {showLogin && <Logincont onClose={() => setShowLogin(false)}  showlgn={showLogin}/>}
      {activeTab === "Hotels" && <LuxeSelection />}
      {activeTab === "Flights" && <div className='FlightContent'><ExperienceAirlines/><FlagshipHotels/><HandpickedCollections/>   </div>}
      {activeTab === "Villas & Homestays" && <div className='Hmstaycontent' ><VillasCities/><OffersSection/>   </div>}
      {activeTab === "Holiday Packages" && <div><DealsAndDestinations/>  </div>}

      <Footer/>
    </div>
    </div>
  )   
}
