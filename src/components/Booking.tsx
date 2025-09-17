import Calendar from '../assets/calendar.png';
import Clock from '../assets/clock.png';
import Location from '../assets/location.png';
import Backtohomepage from '../assets/backhome.png';
import { getBookings } from '../services/backendApi';


function Booking() {
  const hasBooking = true; // change to false to test no booking case

  return (
    <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col items-center justify-start px-4 pt-2 pb-4">
      {hasBooking ? (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Header with back button and title */}
          <div className="flex items-center justify-center w-full relative mt-2">
            <img  src={Backtohomepage} alt="Back to Home"  className="absolute left-[-10px] w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200"  onClick={() => { window.location.href = '/' }} />
            <div className="text-[#7E4300] text-xl font-tiroTamil">Your Bookings</div>
          </div>

        {/* Booking list */}
        <ul className="flex flex-col gap-4 w-full px-4 list-none">
          {/* Booking Card 1 */}
          <li className="relative rounded-xl p-4 bg-white">
            {/* Top and bottom border lines */}
            <div className="absolute top-0 left-[-24px] right-[-24px] h-0.5 bg-[#DEC33A]"></div>
            <div className="absolute bottom-0 left-[-24px] right-[-24px] h-0.5 bg-[#DEC33A]"></div>

            <div className="flex justify-center gap-4">
              <div className="w-22 h-25 bg-[#D9D9D9]"></div>
              <div className="flex flex-col gap-2 text-base">
                <div className="flex items-center gap-2">
                  <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                  <span className="text-[#FFD633] font-medium">00/00/00</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Clock} alt="Clock" className="w-4 h-4" />
                  <span className="text-[#FFD633] font-medium">00:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Location} alt="Location" className="w-4 h-4" />
                  <span className="text-[#FFD633] font-medium">Rimping</span>
                </div>
              </div>
            </div>
          </li>

          {/* Booking Card 2 */}
          <li className="relative rounded-xl p-4 bg-white">
            {/* Top and bottom border lines */}
            <div className="absolute top-0 left-[-24px] right-[-24px] h-0.5 bg-[#DEC33A]"></div>
            <div className="absolute bottom-0 left-[-24px] right-[-24px] h-0.5 bg-[#DEC33A]"></div>

            <div className="flex justify-center gap-4">
              <div className="w-22 h-25 bg-[#D9D9D9]"></div>
              <div className="flex flex-col gap-2 text-base">
                <div className="flex items-center gap-2">
                  <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                  <span className="text-[#FFD633] font-medium">11/11/25</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Clock} alt="Clock" className="w-4 h-4" />
                  <span className="text-[#FFD633] font-medium">14:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Location} alt="Location" className="w-4 h-4" />
                  <span className="text-[#FFD633] font-medium">Bangkok</span>
                </div>
              </div>
            </div>
          </li>
        </ul>

          {/* Make a booking button */}
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all"> Make a Booking</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-start p-4">
          {/* Header with back button for no booking */}
          <div className="flex items-center justify-center w-full relative mt-0">
            <img  src={Backtohomepage} alt="Back to Home"  className="absolute left-[-76px] w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200"  onClick={() => { window.location.href = '/' }} />
            <div className="text-[#7E4300] text-xl font-tiroTamil">You have no bookings</div>
          </div>

          {/* Make a booking button */}
          <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all"> Make a Booking</button>
        </div>
      )}
    </div>
  );
}

export default Booking;

