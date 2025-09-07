import Calendar from '../assets/calendar.png';
import Clock from '../assets/clock.png';
import Location from '../assets/location.png';


function Booking() {
  const hasBooking = true; // change to false to test no booking case

  return (
    <div className="m-0 w-[360px] min-h-[90vh] bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)] flex flex-col items-center justify-start p-4">
      {hasBooking ? (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Title */}
          <div className="text-[#FFD633] text-2xl font-tiroTamil mt-6">Your Bookings</div>

        {/* Booking list */}
        <ul className="flex flex-col gap-4 w-full px-4 list-none">
          {/* Booking Card 1 */}
          <li className="relative rounded-xl p-4 bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)]">
            {/* Border lines */}
            <div className="absolute top-0 left-4 right-4 h-0.5 bg-[#B9A43B]"></div>
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#B9A43B]"></div>
            <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#B9A43B]"></div>
            <div className="absolute right-0 top-4 bottom-4 w-0.5 bg-[#B9A43B]"></div>
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
              <div className="flex flex-col text-sm text-[#DEC33A]">
                <div className="flex items-center gap-2">
                  <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                  <span>00/00/00</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Clock} alt="Clock" className="w-4 h-4" />
                  <span>00:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Location} alt="Location" className="w-4 h-4" />
                  <span>Rimping</span>
                </div>
              </div>
            </div>
          </li>

          {/* Booking Card 2 */}
          <li className="relative rounded-xl p-4 bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)]">
            {/* Border lines */}
            <div className="absolute top-0 left-4 right-4 h-0.5 bg-[#B9A43B]"></div>
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#B9A43B]"></div>
            <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#B9A43B]"></div>
            <div className="absolute right-0 top-4 bottom-4 w-0.5 bg-[#B9A43B]"></div>
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
              <div className="flex flex-col text-sm text-[#DEC33A]">
                <div className="flex items-center gap-2">
                  <img src={Calendar} alt="Calendar" className="w-4 h-4" />
                  <span>11/11/25</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Clock} alt="Clock" className="w-4 h-4" />
                  <span>14:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Location} alt="Location" className="w-4 h-4" />
                  <span>Bangkok</span>
                </div>
              </div>
            </div>
          </li>
        </ul>

          {/* Make a booking button */}
          <button className="bg-white text-black font-bold py-2 px-4 rounded mt-2"> Make a Booking</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-start p-4">
          {/* No booking */}
          <div className="text-[#FFD633] text-2xl font-tiroTamil mt-6">You have no bookings</div>

          {/* Make a booking button */}
          <button className="bg-white text-black font-bold py-2 px-4 rounded"> Make a Booking</button>
        </div>
      )}
    </div>
  );
}

export default Booking;

