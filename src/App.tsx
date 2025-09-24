// import libraries
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// import UI Components
import Header from './components/Header'
import Home from './components/Home'
import ViewBooking from './components/ViewBooking'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooking" element={<ViewBooking />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
