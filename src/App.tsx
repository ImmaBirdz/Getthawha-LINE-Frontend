// import libraries
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

// import UI Components
import Header from './components/layouts/Header'
import CreateBooking from './components/pages/CreateBooking'
import History from './components/pages/History'
import Home from './components/pages/Home'
import ViewBooking from './components/pages/ViewBooking'
import NotFound from './components/pages/NotFound'

// import Translation Context
import { TranslationProvider } from './context/TranslationContext'
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <TranslationProvider>
      <AlertProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<ViewBooking />} />
            <Route path="/booking/create" element={<CreateBooking />} />
            <Route path="/booking/history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </TranslationProvider>
  );
}
export default App
