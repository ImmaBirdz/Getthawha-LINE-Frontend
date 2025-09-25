// import libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import API
import { getBookings } from '../services/backendApi';

// import assets
import backhome from '../assets/backhome.png';

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
  status?: string; // Add status field for API
};

function History() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        
        // Fetch real booking data from API
        const apiBookings: Booking[] = await getBookings();
        
        setBookings(apiBookings);
        
      } catch (error) {
        console.error('Failed to fetch booking history:', error);
        
        // Fallback to empty array if API fails
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Helper functions for data transformation
  const getFormattedDate = (dateString: string) => {
    const bookingDate = new Date(dateString);
    return bookingDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const getFormattedTime = (dateString: string) => {
    const bookingDate = new Date(dateString);
    return bookingDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatus = (booking: Booking): 'Succeeded' | 'Cancelled' | 'Pending' => {
    if (booking.status) {
      // If API provides status, use it
      if (booking.status.toLowerCase().includes('cancel')) {
        return 'Cancelled';
      } else if (booking.status.toLowerCase().includes('pending')) {
        return 'Pending';
      } else if (booking.status.toLowerCase().includes('success') || booking.status.toLowerCase().includes('complete')) {
        return 'Succeeded';
      }
    }
    
    // Default logic if no status from API
    const now = new Date();
    const bookingDateTime = new Date(booking.date);
    return bookingDateTime < now ? 'Succeeded' : 'Pending';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Succeeded') return 'text-green-600';
    if (status === 'Cancelled') return 'text-red-600';
    return 'text-yellow-600'; // Pending
  };

  return (
    <div className="w-[360px] min-h-screen bg-white flex flex-col">
      {loading ? (
        <div className="w-[360px] min-h-screen bg-white flex flex-col relative">
          <p className="text-[#7E4300] text-center mt-10 font-tiroTamil">Loading history...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full">
          {/* Header with back button and title */}
          <div className="flex items-center justify-center w-full relative px-4 py-3">
            <img 
              src={backhome} 
              alt="Back" 
              className="w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200 absolute left-2" 
              onClick={() => navigate('/')}
            />
            <div className="text-2xl font-tiroTamil text-[#7E4300]">History</div>
          </div>

           {/* border line */}
          <div className="w-100 px-7">
            <div className="h-1 bg-[#DEC33A] w-full"></div>
          </div>


          {/* History Items */}
          <div className="flex flex-col gap-4 w-full px-4 mt-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const status = getStatus(booking);
                return (
                  <div key={booking.id} className="rounded-xl p-4 bg-white border-2 border-[#6B4423] relative">
                    <div className="flex justify-between items-start">
                      {/* Left side - Package info */}
                      <div className="flex flex-col gap-1 text-left">
                        <div className="text-[#6B4423] font-medium text-sm text-left">
                          Package: <span className="text-[#D49F00]">{booking.package.title}</span>
                        </div>
                        <div className="text-[#6B4423] font-medium text-sm text-left">
                          Branch: <span className="text-[#D49F00]">{booking.branch.name}</span>
                        </div>
                        <div className="text-[#6B4423] font-medium text-sm text-left">
                          Date: <span className="text-[#D49F00]">{getFormattedDate(booking.date)}, {getFormattedTime(booking.date)}</span>
                        </div>
                      </div>

                      {/* Right side - Status and Price */}
                      <div className="flex flex-col items-end gap-1">
                        <div className={`text-sm font-medium ${getStatusColor(status)}`}>
                          {status}
                        </div>
                        <div className="text-xs text-[#6B4423]">
                          ฿{booking.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center py-0">
                <div className="text-[#7E4300] text-lg font-tiroTamil">No History</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
