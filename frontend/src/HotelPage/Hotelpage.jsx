import React from 'react'
import'./hotelpage.css'
import Navbar from './Comp/Navbar'
import LuxeSelection from './Comp/LuxeSelection'
import Footer from '../Components/Footer'
import Logincont from './Logincont'
export default function Hotelpage() {
  return (
    <div className='hotelpage-mn'> 
       <Navbar/>
       <Logincont/>
       <LuxeSelection/>
      <Footer/>

    </div>
  )
}
