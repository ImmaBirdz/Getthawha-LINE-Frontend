// import libraries
import {
    useState,
    useEffect,
    useContext
} from 'react'
import { useNavigate } from 'react-router-dom'

// import context
import { ProfileContext } from '../context/ProfileContext'
import { useTranslation } from '../context/TranslationContext'

// import API
import {
    getPackages,
} from '../services/backendApi'

// import styles
import '../App.css'

// import assets
import Coupon from './Package'

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

function Home() {
    const {
        profile,
        isLiffLoaded
    } = useContext(ProfileContext)
    const navigate = useNavigate();

    // Use global translation context
    const { language, setLanguage, t } = useTranslation();

    // // Dummy profile data for demonstration purposes
    // const [profile] = useState({
    //     userId: 'U1234567890abcdef',
    //     displayName: 'John Doe',
    //     pictureUrl: 'https://via.placeholder.com/150',
    //     email: 'john.doe@example.com'
    // });

    const [packages, setPackages] = useState<Package[]>([])

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();

                const mappedPackages = data.map((pkg: Package) => ({
                    id: pkg.id,
                    title: pkg.title,
                    description: pkg.description,
                    price: pkg.price,
                    duration: pkg.duration,
                    pictureUrl: pkg.pictureUrl,
                    note: pkg.note,
                    type: pkg.type,
                    isActive: pkg.isActive,
                }));
                setPackages(mappedPackages);
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            }
        };
        fetchPackages();
    }, []);

    return (
        profile 
        && isLiffLoaded 
        ? (
            <div className="App">
                <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col relative">
                    <div className="px-6 py-4 text-[#D49F00] bg-white justify-evenly ">
                        <div className="text-left pb-8">
                            {/* Profile picture and name section */}
                            <div className="flex items-center gap-4 mb-4 relative">
                                {/* Language selector - positioned at top right */}
                                <div className="absolute top-0 -right-4 text-sm text-[#673F00] font-tiroTamil">
                                    <span className="relative mx-1">
                                        <span
                                            className={`cursor-pointer hover:text-[#DCA900] transition-colors z-10 relative ${language === 'TH' ? 'text-[#DCA900] font-bold' : ''}`}
                                            onClick={() => setLanguage('TH')}
                                        >
                                            TH
                                        </span>
                                        {language === 'TH' && (
                                            <span className="absolute inset-0 rounded-full bg-[#F6E7C1] shadow-lg -z-0" style={{boxShadow:'0 0 0 8px #f6e7c1, 0 2px 8px 0 #dca90033'}}></span>
                                        )}
                                    </span>
                                    <span className="mx-1">|</span>
                                    <span className="relative mx-1">
                                        <span
                                            className={`cursor-pointer hover:text-[#DCA900] transition-colors z-10 relative ${language === 'EN' ? 'text-[#DCA900] font-bold' : ''}`}
                                            onClick={() => setLanguage('EN')}
                                        >
                                            EN
                                        </span>
                                        {language === 'EN' && (
                                            <span className="absolute inset-0 rounded-full bg-[#F6E7C1] shadow-lg -z-0" style={{boxShadow:'0 0 0 8px #f6e7c1, 0 2px 8px 0 #dca90033'}}></span>
                                        )}
                                    </span>
                                </div>
                                
                                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                                    {profile?.pictureUrl ? (
                                        <img src={profile?.pictureUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-bold text-[24px] font-tiroGurmukhi text-[#673F00] mt-2">{profile?.displayName}</h2>
                                </div>
                            </div>

                            {/* User details */}
                            <div className="space-y-1">
                                <p className="text-[16px] text-[#280A00]">
                                  <span className={language === 'TH' ? 'font-athiti font-bold' : 'font-tiroTamil'}>{t.email}:</span> <span className="font-tiroTamil">{profile?.email}</span>
                                </p>
                            </div>

                        </div>
                        {/* Booking Buttons */}
                        <div className="flex justify-between w-full mt-2 gap-6">
                            <button className={
                              language === 'TH'
                                ? 'flex-1 !bg-[#DCA900] text-white text-sm font-athiti font-black cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                                : 'flex-1 !bg-[#DCA900] text-white text-sm font-tiroTamil cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                            }
                                onClick={() => { navigate('/viewbooking') }}>{t.viewBooking}</button>
                            <button className={
                              language === 'TH'
                                ? 'flex-1 !bg-[#DCA900] text-white text-sm font-athiti font-black cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                                : 'flex-1 !bg-[#DCA900] text-white text-sm font-tiroTamil cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                            }
                                onClick={() => { navigate('/history') }}>{t.history}</button>
                        </div>
                    </div>

                    <div className="mx-2 h-1 bg-[#DEC33A]"></div>

                    {/* Services - Only show if there are services */}
                    {packages.filter(pkg => pkg.type === 'service').length > 0 && (
                        <>
                            <div className="px-4 pt-2 pb-1 w-full">
                                <div className={
                                  language === 'TH'
                                    ? 'text-[#7E4300] text-xl font-athiti font-black mb-1'
                                    : 'text-[#7E4300] text-xl font-tiroTamil mb-1'
                                }>{t.services}</div>
                            </div>
                            <ul className="flex flex-col gap-3 px-4 pb-2 list-none">
                                {packages.filter(pkg => pkg.type === 'service').map((pkg) => (
                                    <Coupon
                                        key={pkg.id}
                                        backgroundImage={pkg.pictureUrl}
                                        altText={pkg.title}
                                        title={pkg.title}
                                        description={pkg.description}
                                        price={pkg.price}
                                        duration={pkg.duration}
                                        note={pkg.note}
                                    />
                                ))}
                            </ul>
                        </>
                    )}

                    {/* Promotions - Only show if there are promotions */}
                    {packages.filter(pkg => pkg.type === 'promotion').length > 0 && (
                        <>
                            <div className="px-4 pt-2 pb-1 w-full">
                                <div className={
                                  language === 'TH'
                                    ? 'text-[#7E4300] text-xl font-athiti font-black mb-1'
                                    : 'text-[#7E4300] text-xl font-tiroTamil mb-1'
                                }>{t.promotions}</div>
                            </div>
                            <ul className="flex flex-col gap-3 px-4 pb-2 list-none">
                                {packages.filter(pkg => pkg.type === 'promotion').map((pkg) => (
                                    <Coupon
                                        key={pkg.id}
                                        backgroundImage={pkg.pictureUrl}
                                        altText={pkg.title}
                                        title={pkg.title}
                                        description={pkg.description}
                                        price={pkg.price}
                                        duration={pkg.duration}
                                        note={pkg.note}
                                    />
                                ))}
                            </ul>
                        </>
                    )}

                </div>
            </div>
        ) : (
            <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col relative">
                <p className={language === 'TH' ? 'text-[#7E4300] text-center mt-10 font-athiti font-black' : 'text-[#7E4300] text-center mt-10 font-tiroTamil'}>{t.loadingProfile}</p>
            </div>
        )
    );
}
export default Home;
