// import libraries
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

// import UI Components
import Header from './components/layouts/Header'
import MakeBooking from './components/pages/CreateBooking'
import History from './components/pages/History'
import Home from './components/pages/Home'
import ViewBooking from './components/pages/ViewBooking'

// import Translation Context
import { TranslationProvider } from './context/TranslationContext'

function App() {
  return (
    <TranslationProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<ViewBooking />} />
          <Route path="/booking/create" element={<MakeBooking />} />
          <Route path="/booking/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </TranslationProvider>
  );
}
export default App
