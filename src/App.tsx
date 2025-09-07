import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
// import Booking from './components/Booking'
// import CouponModal from './components/CouponModal'

function App() {

return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/mybooking" element={<Booking />} /> */}
      {/* <Route path="/mybooking/:{booking-id}" element={<Modal />} /> */}
    </Routes>
          {/* <Route path="/mycoupon/:couponId" element={<CouponModal />} /> */}

  </BrowserRouter>
);
}
export default App
