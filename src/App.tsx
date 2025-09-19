// import libraries
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// import UI Components
import Header from './components/Header'
import Home from './components/Home'
import Booking from './components/Booking'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
