import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hotelpage from "./HotelPage/Hotelpage"
import Admin_portal from './Admin_portal_/Admin_portal';
import User_portal from './User_profile/User_portal';
import Partner_portal from './Partner_Portal/Partner_portal';
function App() {
  return (

      <Routes>
        {/* <Route path="/" element={<Hotelpage />} /> */}
        <Route path="/" element={<Admin_portal />} />
      </Routes>
 
  )
}

export default App
