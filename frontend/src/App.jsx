import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hotelpage from "./HotelPage/Hotelpage"
import Admin_portal from './Admin_portal_/Admin_portal';
import User_portal from './User_profile/User_portal';
import Partner_portal from './Partner_Portal/Partner_portal';
import StaybookSearchPage from './HotelPage/hotelpage_2/StaybookSearchPage';
function App() {
  return (

      <Routes>
        {/* <Route path="/" element={<Hotelpage />} /> */}
        <Route path="/" element={<StaybookSearchPage/>} />
      </Routes>
 
  )
}

export default App
