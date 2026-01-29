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
import Flightpge1 from './Main_website/Flight_Section/Flight_pge_1/Flightpge1';
import Flightpge2 from './Main_website/Flight_Section/Flight_pge_2/Flightpge2'; 
import Flightpge3 from './Main_website/Flight_Section/Flight_pge_3/Flightpge3';
import Flightpge4 from './Main_website/Flight_Section/Flight_pge_4/Flightpge4';

function App() {
  return (

      <Routes>
        {/* <Route path="/" element={<Hotelpage />} /> */}
        <Route path="/" element={<Flightpge1/>} />
      </Routes>
 
  )
}

export default App
