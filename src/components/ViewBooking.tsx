// import libraries
import {
  useState,
  useEffect
} from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

function ViewBooking() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const navigate = useNavigate()

  const MySwal = withReactContent(Swal)

  const handleDeleteBooking = async (bookingId: string) => {
    MySwal.fire({
      title: <div className="font-tiroTamil text-[#7E4300] text-lg ">Are you sure to delete the bookings?</div>,
      html: <div className="font-tiroTamil text-[#6B4423] text-sm ">You can't change your decision later.</div>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7E4300",
      cancelButtonColor: "#7E4300",
      confirmButtonText: <span className="font-tiroTamil">Yes, delete it!</span>,
      cancelButtonText: <span className="font-tiroTamil">No, keep it</span>
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setDeleting(bookingId);
          await deleteBooking(bookingId);
          // Remove the deleted booking from the list
          setBookings(bookings.filter(booking => booking.id !== bookingId));
          
          MySwal.fire({
            title: <div className="font-tiroTamil text-[#7E4300] text-lg">Cancelled!</div>,
            html: <div className="font-tiroTamil text-[#6B4423] text-sm">Your booking has been cancelled.</div>,
            icon: "success",
            confirmButtonColor: "#7E4300",
            confirmButtonText: <span className="font-tiroTamil">OK</span>
          });
        } catch (error) {
          console.error('Failed to delete booking:', error);
          MySwal.fire({
            title: <div className="font-tiroTamil text-[#7E4300] text-lg">Error!</div>,
            html: <div className="font-tiroTamil text-[#6B4423] text-sm">Failed to cancel booking. Please try again.</div>,
            icon: "error",
            confirmButtonColor: "#7E4300",
            confirmButtonText: <span className="font-tiroTamil">OK</span>
          });
        } finally {
          setDeleting(null);
        }
      }
    });
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

          {/* border line */}
          <div className="w-100 px-7">
            <div className="h-1 bg-[#DEC33A] w-full"></div>
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
                          day: 'numeric',
                          month: 'numeric',  
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
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all" onClick={() => navigate('/makebooking')}> Make Booking</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Header with back button and title */}
          <div className="flex items-center justify-center w-full relative mt-2">
            <img src={Backtohomepage} alt="Back to Home" className="absolute left-[-10px] w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200" onClick={() => { window.location.href = '/' }} />
            <div className="text-[#7E4300] text-xl font-tiroTamil">Your Bookings</div>
          </div>

          {/* border line */}
          <div className="w-100 px-7">
            <div className="h-1 bg-[#DEC33A] w-full"></div>
          </div>

          {/* No bookings message */}
          <div className="flex flex-col items-center gap-4 justify-start p-4">
            <div className="text-[#7E4300] text-lg font-tiroTamil">You have no bookings</div>

            {/* Make a booking button */}
            <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all" onClick={() => navigate('/makebooking')}> Make Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBooking;

