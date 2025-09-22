// import libraries
import {
  useState,
  useEffect
} from 'react'

// import API
import { getBookings } from '../services/backendApi';

// import assets
import Calendar from '../assets/calendar.png';
import Clock from '../assets/clock.png';
import Location from '../assets/location.png';
import Backtohomepage from '../assets/backhome.png';

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
        <div className="flex flex-col items-center gap-4 justify-center h-full">
          <div className="text-[#7E4300] text-lg font-tiroTamil">Loading your bookings...</div>
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
              <li key={booking.id} className="relative rounded-xl p-4 bg-white">
                {/* Top and bottom border lines */}
                <div className="absolute top-0 left-[-24px] right-[-24px] h-0.5 bg-[#DEC33A]"></div>
                <div className="absolute bottom-0 left-[-24px] right-[-24px] h-0.5 bg-[#DEC33A]"></div>

                <div className="flex justify-center gap-4">
                  <div className="w-22 h-25 bg-[#D9D9D9] rounded flex items-center justify-center overflow-hidden">
                    {booking.user.pictureUrl ? (
                      <img src={booking.user.pictureUrl} alt={booking.user.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[#7E4300] text-xs text-center p-2">{booking.package.title.substring(0, 20)}</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 text-base">
                    <div className="flex items-center gap-2">
                      <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                      <span className="text-[#FFD633] font-medium">
                        {new Date(booking.date).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Clock} alt="Clock" className="w-4 h-4" />
                      <span className="text-[#FFD633] font-medium">
                        {booking.duration}h - {booking.package.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Location} alt="Location" className="w-4 h-4" />
                      <span className="text-[#FFD633] font-medium">{booking.branch.name}</span>
                    </div>
                    <div className="text-[#7E4300] font-bold text-sm">
                      Total: {booking.totalPrice} THB
                      {booking.voucher && (
                        <div className="text-[#D49F00] text-xs">
                          Voucher: {booking.voucher.code}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Make a booking button */}
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all" onClick={() => { window.location.href = 'https://client-getthawha.yungying.com/booking' }}> Make Another Booking</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-start p-4">
          {/* Header with back button for no booking */}
          <div className="flex items-center justify-center w-full relative mt-0">
            <img src={Backtohomepage} alt="Back to Home" className="absolute left-[-76px] w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200" onClick={() => { window.location.href = '/' }} />
            <div className="text-[#7E4300] text-xl font-tiroTamil">You have no bookings</div>
          </div>

          {/* Make a booking button */}
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all" onClick={() => { window.location.href = 'https://client-getthawha.yungying.com/booking' }}> Make a Booking</button>
        </div>
      )}
    </div>
  );
}

export default Booking;

