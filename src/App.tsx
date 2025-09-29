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
import MakeBooking from './components/MakeBooking'
import History from './components/History'

// import Translation Context
import { TranslationProvider } from './context/TranslationContext'

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewbooking" element={<ViewBooking />} />
          <Route path="/makebooking" element={<MakeBooking />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  );
}
export default App
