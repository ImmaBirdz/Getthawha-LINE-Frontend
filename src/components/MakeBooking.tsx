//import libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import assets
import backhome from '../assets/backhome.png';
import edit from '../assets/edit.png';
import arrow1 from '../assets/arrow1.png';
import arrow2 from '../assets/arrow2.png';
import clock from '../assets/clock.png';
import calendar from '../assets/calendar.png';



function MakeBooking() {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('Choose your branch');
  const [selectedService, setSelectedService] = useState('Choose your service');
  const [selectedPromotion, setSelectedPromotion] = useState('Choose your promotion');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const branchOptions = ['Rimping', 'Prasing', 'Rimsing2', 'Location'];
  const serviceOptions = ['Thai massage (60min)', 'Thai massage (90min)', 'Thai massage (120min)'];
  const promotionOptions = ['Thai massage (60min)', 'Special promotion', 'No promotion'];

  return (
    <div className="w-[360px] min-h-screen bg-white flex flex-col">
      {/* Header with back arrow and title */}
      <div className="flex items-center justify-center px-4 py-3 relative">
        <img src={backhome} alt="Back"  className="w-10 h-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all duration-200 absolute left-2" onClick={() => navigate('/viewbooking')}/>
        <div className="text-2xl font-tiroTamil text-[#7E4300]">Booking</div>
      </div>
      
      {/* border line */}
      <div className="mx-2 h-1 bg-[#DEC33A]"></div>

      {/* Form */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Select Branch */}
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            Select branch<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div 
              onClick={() => {
                setDropdownOpen(dropdownOpen === 'branch' ? null : 'branch');
              }}
              className={`w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-3xl font-tiroTamil text-base focus:outline-none cursor-pointer text-left ${
                selectedBranch === 'Choose your branch' ? 'text-[#999999]' : 'text-[#000000]'
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
                    setSelectedBranch('Choose your branch');
                    setDropdownOpen(null);
                  }}
                  className="px-3 py-2 font-tiroTamil text-[#999999] text-base cursor-pointer rounded-full mx-2 my-1 text-left hover:bg-red-100 hover:text-red-600 italic"
                >
                  Clear selection
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
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            Select service<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div 
              onClick={() => {
                setDropdownOpen(dropdownOpen === 'service' ? null : 'service');
              }}
              className={`w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-3xl font-tiroTamil text-base focus:outline-none cursor-pointer text-left ${
                selectedService === 'Choose your service' ? 'text-[#999999]' : 'text-[#000000]'
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
                    setSelectedService('Choose your service');
                    setDropdownOpen(null);
                  }}
                  className="px-3 py-2 font-tiroTamil text-[#999999] text-base cursor-pointer rounded-full mx-2 my-1 text-left hover:bg-red-100 hover:text-red-600 italic"
                >
                  Clear selection
                </div>
                {serviceOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelectedService(option);
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
        <div>
          <label className="block text-base font-tiroTamil text-[#000000] text-left mb-1">
            Select promotion<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div 
              onClick={() => {
                setDropdownOpen(dropdownOpen === 'promotion' ? null : 'promotion');
              }}
              className={`w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-3xl font-tiroTamil text-base focus:outline-none cursor-pointer text-left ${
                selectedPromotion === 'Choose your promotion' ? 'text-[#999999]' : 'text-[#000000]'
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
                    setSelectedPromotion('Choose your promotion');
                    setDropdownOpen(null);
                  }}
                  className="px-3 py-2 font-tiroTamil text-[#999999] text-base cursor-pointer rounded-full mx-2 my-1 text-left hover:bg-red-100 hover:text-red-600 italic"
                >
                  Clear selection
                </div>
                {promotionOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelectedPromotion(option);
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
            Date<span className="text-red-500">*</span>
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
            Time<span className="text-red-500">*</span>
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
            Voucher Code
          </label>
          <div className="relative">
            <input 
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="w-full px-3 py-1 bg-[#E7E7E7] border border-[#818181] rounded-full font-tiroTamil text-[#000000] text-base focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              placeholder="Enter voucher code"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img src={edit} alt="Edit" className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <div className="pt-4 flex justify-center">
          <button 
            className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-center cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all"
            onClick={() => {
              // Validate required fields
              if (selectedBranch === 'Choose your branch' || 
                  selectedService === 'Choose your service' || 
                  selectedPromotion === 'Choose your promotion' || 
                  !selectedDate || 
                  !selectedTime) {
                alert('Please fill in all required fields');
                return;
              }

              // Create booking object
              const bookingData = {
                id: Date.now(), // Simple ID generation
                branch: selectedBranch,
                service: selectedService,
                promotion: selectedPromotion,
                date: selectedDate,
                time: selectedTime,
                voucherCode: voucherCode || 'None',
                status: 'Confirmed',
                bookingDate: new Date().toLocaleDateString('en-GB')
              };

              // Navigate to view booking page with booking data
              navigate('/viewbooking', { state: { booking: bookingData } });
            }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeBooking;