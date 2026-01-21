import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hotelpage from "./HotelPage/Hotelpage"
import Partner_portal from './Partner_Portal/Partner_portal'
function App() {
  return (

      <Routes>
        {/* <Route path="/" element={<Hotelpage />} /> */}
        <Route path="/" element={<Partner_portal />} />
      </Routes>
 
  )
}

export default App
