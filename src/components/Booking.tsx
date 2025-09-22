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
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null)

  const showCustomAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;

    try {
      setDeleting(bookingToDelete);
      setShowConfirm(false);
      await deleteBooking(bookingToDelete);
      // Remove the deleted booking from the list
      setBookings(bookings.filter(booking => booking.id !== bookingToDelete));
      showCustomAlert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Failed to delete booking:', error);
      showCustomAlert('Failed to cancel booking. Please try again.');
    } finally {
      setDeleting(null);
      setBookingToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
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

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6 mx-4 max-w-sm w-full shadow-lg">
            <div className="text-center">
              <div className="text-[#7E4300] text-lg font-tiroTamil mb-6">
                Are you sure you want to cancel this booking?
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-500 text-white rounded font-tiroTamil hover:bg-red-600 transition-colors"
                >
                  yes
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-6 py-3 bg-gray-400 text-white rounded font-tiroTamil hover:bg-gray-500 transition-colors"
                >
                  no
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Popup */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-6 mx-4 max-w-sm w-full shadow-lg border border-[#6B4423]">
            <div className="text-center">
              <div className="text-[#7E4300] text-lg font-tiroTamil mb-4">
                {alertMessage}
              </div>
              <button
                onClick={closeAlert}
                className="px-4 py-2 bg-[#DCA900] text-white rounded font-tiroTamil hover:bg-[#B8940A] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;

