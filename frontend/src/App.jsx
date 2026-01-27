import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Hotelpage from "./HotelPage/Hotelpage"
import Admin_portal from './Admin_portal_/Admin_portal';
import User_portal from './User_profile/User_portal';
import Partner_portal from './Partner_Portal/Partner_portal';
import StaybookSearchPage from "./Main_website/Hotel_Section/Hotel_pge_2/StaybookSearchPage"
import Hotelpge3 from './Main_website/Hotel_Section/Hotel_pge_3/Hotelpge3';
import Hotelpge4 from './Main_website/Hotel_Section/Hotel_pge_4/Hotelpge4';
import Hotelpge5 from './Main_website/Hotel_Section/Hotel_pge_5/Hotelpge5';
import Hmstaypge2 from './Main_website/HomeStay_Section/HmStay_pge_2/Hmstaypge2';
function App() {
  return (

      <Routes>
        {/* <Route path="/" element={<Hotelpage />} /> */}
        <Route path="/" element={<Hmstaypge2/>} />
      </Routes>
 
  )
}

export default App
