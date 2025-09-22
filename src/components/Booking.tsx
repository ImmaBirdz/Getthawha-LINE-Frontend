// import libraries
import {
  useState,
  useEffect
} from 'react'

// import API
import { getBookings, deleteBooking } from '../services/backendApi';

// import assets
import Backtohomepage from '../assets/backhome.png';
import bin from '../assets/bin.png';

type Booking = {
  id: string;
  date: string;
  duration: number;
  totalPrice: string;
  user: {
    id: string;
    displayName: string;
    pictureUrl: string;
  };
  branch: {
    id: string;
    name: string;
  };
  package: {
    id: string;
    title: string;
  };
  voucher?: {
    id: string;
    code: string;
  };
};

function Booking() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null)

  const handleDeleteBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setShowDeleteModal(true);
  };

  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;

    try {
      setDeleting(bookingToDelete);
      await deleteBooking(bookingToDelete);
      // Remove the deleted booking from the list
      setBookings(bookings.filter(booking => booking.id !== bookingToDelete));
      setShowDeleteModal(false);
      setBookingToDelete(null);
      // You can add a success toast here instead of alert
    } catch (error) {
      console.error('Failed to delete booking:', error);
      alert('Failed to cancel booking. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const cancelDeleteBooking = () => {
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getBookings();
        const mappedData = data.map((booking: Booking) => ({
          id: booking.id,
          date: booking.date,
          duration: booking.duration,
          totalPrice: booking.totalPrice,
          user: booking.user,
          branch: booking.branch,
          package: booking.package,
          voucher: booking.voucher,
        }));
        setBookings(mappedData);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col items-center justify-start px-4 pt-2 pb-4">
      {loading ? (
        <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col relative">
          <p className="text-[#7E4300] text-center mt-10 font-tiroTamil">Loading bookings...</p>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Header with back button and title */}
          <div className="flex items-center justify-center w-full relative mt-2">
            <img src={Backtohomepage} alt="Back to Home" className="absolute left-[-10px] w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200" onClick={() => { window.location.href = '/' }} />
            <div className="text-[#7E4300] text-xl font-tiroTamil">Your Bookings</div>
          </div>

          {/* Dynamic Booking list from Backend API */}
          <ul className="flex flex-col gap-4 w-full px-4 list-none">
            {bookings.map((booking) => (
              <li key={booking.id} className="rounded-xl p-4 bg-white border-2 border-[#6B4423]">
                <div className="flex justify-between items-start text-left relative">
                  {/* Left side - Package and Branch info */}
                  <div className="flex flex-col gap-1 text-left">
                    <div className="text-[#6B4423] font-medium text-left text-sm">
                      Package: <span className="text-[#D49F00]">{booking.package.title}</span>
                    </div>
                    <div className="text-[#6B4423] font-medium text-left text-sm">
                      Branch: <span className="text-[#D49F00]">{booking.branch.name}</span>
                    </div>
                    <div className="text-[#6B4423] font-medium text-left text-sm">
                      Date: <span className="text-[#D49F00]">
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          month: 'numeric', 
                          day: 'numeric', 
                          year: 'numeric'
                        })}, {new Date(booking.date).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Right side - Price */}
                  <div className="flex flex-col items-end gap-1 -mt-1">
                    <div className="text-[#D49F00] text-lg">
                      ฿{booking.totalPrice}
                    </div>
                    {booking.voucher && (
                      <div className="text-[#6B4423] text-xs">
                        Code: {booking.voucher.code}
                      </div>
                    )}
                  </div>

                  {/* Delete icon - bottom right corner */}
                  <img src={bin} alt="Delete booking" onClick={() => handleDeleteBooking(booking.id)} className={`absolute -bottom-2 -right-2 w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200 ${deleting === booking.id ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`} />
                </div>
              </li>
            ))}
          </ul>

          {/* Make a booking button */}
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all" onClick={() => { window.location.href = 'https://client-getthawha.yungying.com/booking' }}> Make Booking</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-start p-4">
          {/* Header with back button for no booking */}
          <div className="flex items-center justify-center w-full relative mt-0">
            <img src={Backtohomepage} alt="Back to Home" className="absolute left-[-76px] w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200" onClick={() => { window.location.href = '/' }} />
            <div className="text-[#7E4300] text-xl font-tiroTamil">You have no bookings</div>
          </div>

          {/* Make a booking button */}
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all" onClick={() => { window.location.href = 'https://client-getthawha.yungying.com/booking' }}> Make Booking</button>
        </div>
      )}

      {/* Delete Confirmation Modal - Game Pause Style */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-[1px] flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-200 transform animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </div>
              <div className="text-[#7E4300] text-xl font-tiroTamil mb-3 font-bold">
                Cancel Booking
              </div>
              <div className="text-[#6B4423] text-sm mb-8 leading-relaxed">
                Are you sure you want to cancel this booking?<br/>
                <span className="text-red-500 font-medium">This action cannot be undone.</span>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={cancelDeleteBooking}
                  className="px-6 py-3 bg-gray-100 text-[#6B4423] rounded-lg hover:bg-gray-200 transition-all font-tiroTamil font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmDeleteBooking}
                  disabled={deleting === bookingToDelete}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 font-tiroTamil font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {deleting === bookingToDelete ? 'Canceling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;

