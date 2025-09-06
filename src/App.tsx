import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
// import Booking from './components/Booking'
// import Modal from './components/Modal'

function App() {

return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/mybooking" element={<Booking />} /> */}
      {/* <Route path="/mybooking/:{booking-id}" element={<Modal />} /> */}
    </Routes>

  </BrowserRouter>
);
}
export default App
