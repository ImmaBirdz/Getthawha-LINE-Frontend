import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { useContext } from 'react'
// import { ProfileContext } from './context/ProfileContext'
import Header from './components/Header'
import Home from './components/Home'
// import Register from './components/Register'
import Booking from './components/Booking'
// import CouponModal from './components/CouponModal'

function App() {
  const profile = false; // for testing
  // const { profile, isLiffLoaded } = useContext(ProfileContext);

  return (
    profile
    // && isLiffLoaded
    ? (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybooking" element={<Booking />} />
          {/* <Route path="/mycoupon/:couponId" element={<CouponModal />} /> */}
        </Routes>
      </BrowserRouter>

      // wait for main website api to check if user is registered
    ) : (
      <BrowserRouter>
      <Header />
        <Routes>
          {/* <Route path="/" element={<Register />} /> */}

          {/* Temporary: direct to Home for testing */}
          <Route path="/" element={<Home />} />
          <Route path="/mybooking" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    )
  );
}
export default App
