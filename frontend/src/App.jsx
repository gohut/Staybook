import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hotelpage from "./HotelPage/Hotelpage"
function App() {
  return (

      <Routes>
        <Route path="/" element={<Hotelpage />} />
      </Routes>
 
  )
}

export default App
