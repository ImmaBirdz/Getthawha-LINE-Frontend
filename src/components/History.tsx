// import libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import API
import { getBookings } from '../services/backendApi';

// import translation
import { useTranslation } from '../context/TranslationContext'

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

type BookingStatus = 'Completed' | 'Cancelled';

function History() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        
        // Fetch real booking data from API
        const apiBookings: Booking[] = await getBookings();
        
        // Since getStatus now only returns these two, we can show all results
        const historyBookings = apiBookings.filter(booking => {
          // Only include bookings that have a definitive status (not pending)
          if (booking.status) {
            return !booking.status.toLowerCase().includes('pending');
          }
          // For bookings without status, use date logic - only past bookings
          const now = new Date();
          const bookingDateTime = new Date(booking.date);
          return bookingDateTime < now;
        });
        
        setBookings(historyBookings);
        
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

  const getStatus = (booking: Booking): BookingStatus => {
    if (booking.status) {
      // If API provides status, use it
      if (booking.status.toLowerCase().includes('cancel')) {
        return 'Cancelled';
      } else {
        // Default to Completed for history (since we filter out pending)
        return 'Completed';
      }
    }
    
    // Default logic if no status from API - assume completed bookings are successful
    return 'Completed';
  };

  const getStatusColor = (status: string) => {
  if (status === 'Completed') return 'text-green-600';
    if (status === 'Cancelled') return 'text-red-600';
    return 'text-yellow-600'; // Pending
  };

  return (
    <div className="w-[360px] min-h-screen bg-white flex flex-col">
      {loading ? (
        <div className="w-[360px] min-h-screen bg-white flex flex-col relative">
          <p className={language === 'TH' ? 'text-[#7E4300] text-center mt-10 font-athiti font-bold' : 'text-[#7E4300] text-center mt-10 font-tiroTamil'}>{t.loadingHistory}</p>
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
            <div className={language === 'TH' ? 'text-2xl font-athiti font-bold text-[#7E4300]' : 'text-2xl font-tiroTamil text-[#7E4300]'}>{t.history}</div>
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
                        <div className={language === 'TH' ? 'text-[#6B4423] font-medium text-sm text-left font-athiti font-bold' : 'text-[#6B4423] font-medium text-sm text-left'}>
                          {t.package}: <span className="font-medium text-[#6B4423] text-sm">{booking.package.title}</span>
                        </div>
                        <div className={language === 'TH' ? 'text-[#6B4423] font-medium text-sm text-left font-athiti font-bold' : 'text-[#6B4423] font-medium text-sm text-left'}>
                          {t.branch}: <span className="font-medium text-[#6B4423] text-sm">{booking.branch.name}</span>
                        </div>
                        <div className={language === 'TH' ? 'text-[#6B4423] font-medium text-sm text-left font-athiti font-bold' : 'text-[#6B4423] font-medium text-sm text-left'}>
                          {t.date}: <span className="font-medium text-[#6B4423] text-sm">{getFormattedDate(booking.date)}, {getFormattedTime(booking.date)}</span>
                        </div>
                      </div>

                      {/* Right side - Status and Price */}
                      <div className="flex flex-col items-end gap-1">
                        <div className={`text-xl font-medium ${getStatusColor(status)} ${language === 'TH' ? 'font-athiti font-bold' : ''}`}>
                          <span className="font-medium">{status === 'Completed' ? t.completed : status === 'Cancelled' ? t.cancelled : status}</span>
                        </div>
                        <div className="text-xs text-[#6B4423] font-medium">
                          ฿{booking.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center py-0">
                <div className={language === 'TH' ? 'text-[#7E4300] text-lg font-athiti font-bold' : 'text-[#7E4300] text-lg font-tiroTamil'}>{t.noHistory}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
