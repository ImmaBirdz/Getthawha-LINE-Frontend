//import libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import translation
import { useTranslation } from '../context/TranslationContext'

// import API
import { getBranches, getPackages, createBooking, getVoucher } from '../services/backendApi';

//import assets
import backhome from '../assets/backhome.png';
import edit from '../assets/edit.png';
import arrow1 from '../assets/arrow1.png';
import arrow2 from '../assets/arrow2.png';
import clock from '../assets/clock.png';
import calendar from '../assets/calendar.png';

// Types
type Branch = {
  id: string;
  name: string;
  address?: string;
};

type Package = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  pictureUrl: string;
  note?: string;
  type: string;
  isActive: boolean;
};



function MakeBooking() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [selectedBranch, setSelectedBranch] = useState(t.chooseBranch);
  const [selectedService, setSelectedService] = useState(t.chooseService);
  const [selectedPromotion, setSelectedPromotion] = useState(t.choosePromotion);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingType, setBookingType] = useState<'service' | 'promotion' | null>(null);

  // API data
  const [branches, setBranches] = useState<Branch[]>([]);
  const [services, setServices] = useState<Package[]>([]);
  const [promotions, setPromotions] = useState<Package[]>([]);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [branchData, packageData] = await Promise.all([
          getBranches(),
          getPackages()
        ]);

        setBranches(branchData);

        // Separate services and promotions
        const servicePackages = packageData.filter((pkg: Package) => pkg.type === 'service');
        const promotionPackages = packageData.filter((pkg: Package) => pkg.type === 'promotion');
        
        setServices(servicePackages);
        setPromotions(promotionPackages);

      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const branchOptions = branches.map(branch => branch.name);
  const serviceOptions = services.map(service => `${service.title} (${service.duration}min)`);
  const promotionOptions = promotions.map(promotion => promotion.title);

  return (
    <div className="w-[360px] min-h-screen bg-white flex flex-col">
      {/* Header with back arrow and title */}
      <div className="flex items-center justify-center px-4 py-3 relative">
        <img src={backhome} alt="Back"  className="w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200 absolute left-2" onClick={() => navigate('/viewbooking')}/>
        <div className="text-xl font-tiroTamil text-[#7E4300]">{t.booking}</div>
      </div>
      
      {/* border line */}
      <div className="mx-2 h-1 bg-[#DEC33A]"></div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#7E4300] text-lg font-tiroTamil">{t.loading}</div>
        </div>
      ) : (
        <div className="flex-1 px-4 py-4 space-y-4">
        {/* Select Branch */}
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            {t.selectBranch}<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div 
              onClick={() => {
                setDropdownOpen(dropdownOpen === 'branch' ? null : 'branch');
              }}
              className={`w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-3xl font-tiroTamil text-base focus:outline-none cursor-pointer text-left ${
                selectedBranch === t.chooseBranch ? 'text-[#999999]' : 'text-[#000000]'
              }`}
            >
              {selectedBranch}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img 
                src={dropdownOpen === 'branch' ? arrow2 : arrow1} 
                alt="Arrow" 
                className={dropdownOpen === 'branch' ? "w-4 h-2" : "w-2 h-4"} 
              />
            </div>
            {dropdownOpen === 'branch' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#E7E7E7] border border-[#818181] rounded-2xl shadow-lg z-10">
                <div
                  onClick={() => {
                    setSelectedBranch(t.chooseBranch);
                    setDropdownOpen(null);
                  }}
                  className="px-3 py-2 font-tiroTamil text-[#999999] text-base cursor-pointer rounded-full mx-2 my-1 text-left hover:bg-red-100 hover:text-red-600 italic"
                >
                  {t.clear}
                </div>
                {branchOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelectedBranch(option);
                      setDropdownOpen(null);
                    }}
                    className={`px-3 py-2 font-tiroTamil text-[#000000] text-base cursor-pointer rounded-full mx-2 my-1 text-left ${
                      selectedBranch === option 
                        ? 'bg-[#E7E7E7] hover:bg-[#D7D7D7]' 
                        : 'hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Select Service */}
        <div className={selectedPromotion !== t.choosePromotion ? 'opacity-50 pointer-events-none' : ''}>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            {t.selectService}<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div 
              onClick={() => {
                setDropdownOpen(dropdownOpen === 'service' ? null : 'service');
              }}
              className={`w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-3xl font-tiroTamil text-base focus:outline-none cursor-pointer text-left ${
                selectedService === t.chooseService ? 'text-[#999999]' : 'text-[#000000]'
              }`}
            >
              {selectedService}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img 
                src={dropdownOpen === 'service' ? arrow2 : arrow1} 
                alt="Arrow" 
                className={dropdownOpen === 'service' ? "w-4 h-2" : "w-2 h-4"} 
              />
            </div>
            {dropdownOpen === 'service' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#E7E7E7] border border-[#818181] rounded-2xl shadow-lg z-10">
                <div
                  onClick={() => {
                    setSelectedService(t.chooseService);
                    setSelectedPromotion(t.choosePromotion);
                    setBookingType(null);
                    setDropdownOpen(null);
                  }}
                  className="px-3 py-2 font-tiroTamil text-[#999999] text-base cursor-pointer rounded-full mx-2 my-1 text-left hover:bg-red-100 hover:text-red-600 italic"
                >
                  {t.clear}
                </div>
                {serviceOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelectedService(option);
                      setSelectedPromotion(t.choosePromotion); // Reset promotion
                      setBookingType('service');
                      setDropdownOpen(null);
                    }}
                    className={`px-3 py-2 font-tiroTamil text-[#000000] text-base cursor-pointer rounded-full mx-2 my-1 text-left ${
                      selectedService === option 
                        ? 'bg-[#E7E7E7] hover:bg-[#D7D7D7]' 
                        : 'hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Select Promotion */}
        <div className={selectedService !== t.chooseService ? 'opacity-50 pointer-events-none' : ''}>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            {t.selectPromotion}<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div 
              onClick={() => {
                setDropdownOpen(dropdownOpen === 'promotion' ? null : 'promotion');
              }}
              className={`w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-3xl font-tiroTamil text-base focus:outline-none cursor-pointer text-left ${
                selectedPromotion === t.choosePromotion ? 'text-[#999999]' : 'text-[#000000]'
              }`}
            >
              {selectedPromotion}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img 
                src={dropdownOpen === 'promotion' ? arrow2 : arrow1} 
                alt="Arrow" 
                className={dropdownOpen === 'promotion' ? "w-4 h-2" : "w-2 h-4"} 
              />
            </div>
            {dropdownOpen === 'promotion' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#E7E7E7] border border-[#818181] rounded-2xl shadow-lg z-10">
                <div
                  onClick={() => {
                    setSelectedPromotion(t.choosePromotion);
                    setSelectedService(t.chooseService);
                    setBookingType(null);
                    setDropdownOpen(null);
                  }}
                  className="px-3 py-2 font-tiroTamil text-[#999999] text-base cursor-pointer rounded-full mx-2 my-1 text-left hover:bg-red-100 hover:text-red-600 italic"
                >
                  {t.clear}
                </div>
                {promotionOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelectedPromotion(option);
                      setSelectedService(t.chooseService); // Reset service  
                      setBookingType('promotion');
                      setDropdownOpen(null);
                    }}
                    className={`px-3 py-2 font-tiroTamil text-[#000000] text-base cursor-pointer rounded-full mx-2 my-1 text-left ${
                      selectedPromotion === option 
                        ? 'bg-[#E7E7E7] hover:bg-[#D7D7D7]' 
                        : 'hover:bg-[#F5F5F5]'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            {t.date}<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-start">
            <div className="relative inline-block">
              <input 
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40 px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-full font-tiroTamil text-[#000000] text-base focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                placeholder="DD/MM/YYYY"
                readOnly
              />
              <input 
                type="date"
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  });
                  setSelectedDate(formattedDate);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none -mt-1">
                <img src={calendar} alt="Calendar" className="w-4 h-4 " />
              </div>
            </div>
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            {t.selectTime.replace('Select ', '')}<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-start">
            <div className="relative inline-block">
              <input 
                type="text"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-40 px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-full font-tiroTamil text-[#000000] text-base focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                placeholder="-- : -- --"
                readOnly
              />
              <input 
                type="time"
                onChange={(e) => {
                  const time = e.target.value;
                  if (time) {
                    const [hours, minutes] = time.split(':');
                    const hour = parseInt(hours);
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    const formattedTime = `${displayHour}:${minutes} ${ampm}`;
                    setSelectedTime(formattedTime);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <img src={clock} alt="Clock" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Code */}
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            {t.voucherCode}
          </label>
          <div className="relative">
            <input 
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-full font-tiroTamil text-[#000000] text-base focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder={t.enterVoucherCode}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img src={edit} alt="Edit" className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="pt-4 flex justify-center">
          <button 
            className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
            onClick={async () => {
              try {
                // Validate required fields
                if (selectedBranch === t.chooseBranch || 
                    (selectedService === t.chooseService && selectedPromotion === t.choosePromotion) ||
                    !selectedDate || 
                    !selectedTime) {
                  alert('Please fill in all required fields. Choose either a service or promotion.');
                  return;
                }

                setSubmitting(true);

                // Find selected items from API data
                const selectedBranchData = branches.find(b => b.name === selectedBranch);
                
                let selectedPackageData = null;
                let packagePrice = 0;
                let packageDuration = 60;
                
                if (selectedService !== t.chooseService) {
                  // Service selected
                  selectedPackageData = services.find(s => `${s.title} (${s.duration}min)` === selectedService);
                  packagePrice = selectedPackageData?.price || 0;
                  packageDuration = selectedPackageData?.duration || 60;
                } else if (selectedPromotion !== t.choosePromotion) {
                  // Promotion selected
                  selectedPackageData = promotions.find(p => p.title === selectedPromotion);
                  packagePrice = selectedPackageData?.price || 0;
                  packageDuration = selectedPackageData?.duration || 60;
                }

                // Validate voucher if provided
                if (voucherCode) {
                  try {
                    await getVoucher(voucherCode);
                    // Voucher is valid, continue with booking
                  } catch (error) {
                    console.warn('Invalid voucher code:', error);
                    // Continue without voucher
                  }
                }

                // Create booking data for API
                const bookingData = {
                  branchId: selectedBranchData?.id,
                  packageId: selectedPackageData?.id,
                  promotionId: bookingType === 'promotion' ? selectedPackageData?.id : null,
                  date: `${selectedDate}T${selectedTime}:00.000Z`, // Convert to ISO format
                  duration: packageDuration,
                  voucherCode: voucherCode || null,
                  totalPrice: packagePrice,
                };

                // Submit booking to API
                await createBooking(bookingData);

                // Navigate to view booking page
                navigate('/viewbooking');

              } catch (error) {
                console.error('Failed to create booking:', error);
                alert('Failed to create booking. Please try again.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? t.creating : t.confirmBooking}
          </button>
        </div>
        </div>
      )}
    </div>
  );
}

export default MakeBooking;