import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
// import Register from './components/Register'
// import Booking from './components/Booking'
// import CouponModal from './components/CouponModal'

function App() {
  // const profile = false; // or true, depending on your logic

return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/mybooking" element={<Booking />} /> */}
      {/* <Route path="/mybooking/:{booking-id}" element={<Modal />} /> */}
    </Routes>
    // profile ? (
          {/* <Route path="/mycoupon/:couponId" element={<CouponModal />} /> */}

      // wait for main website api to check if user is registered
    // ) : (
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Register />} />
    //     </Routes>
    //   </BrowserRouter>
    // )
  );
}
export default App
