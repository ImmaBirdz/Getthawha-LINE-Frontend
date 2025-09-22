// import libraries
import {
    useState,
    useEffect,
    useContext
} from 'react'
import { useNavigate } from 'react-router-dom'

// import context
import { ProfileContext } from '../context/ProfileContext'

// import API
import {
    getPackages,
} from '../services/backendApi'

// import styles
import '../App.css'

// import assets
import edit from '../assets/edit.png'
import coupon1 from '../assets/coupon1.png'
import Coupon from './Coupon'

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

function App() {
    const {
        profile,
        isLiffLoaded
    } = useContext(ProfileContext)
    const navigate = useNavigate();

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
                            <div className="flex items-center gap-4 mb-4">
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
                                <img src={edit} alt="Edit" className="w-6 h-6 cursor-pointer mt-[-8px] hover:scale-110 hover:opacity-80 transition-all" />
                            </div>

                            {/* User details */}
                            <div className="space-y-1">
                                <p className="text-[16px] font-tiroTamil text-[#280A00]">Email: {profile?.email}</p>
                                <p className="text-[16px] font-tiroTamil text-[#280A00]">Phone: {/* {profile?.phone} */}</p>
                                <p className="text-[16px] font-tiroTamil text-[#280A00]">BD: {/* {profile?.birthday} */}</p>
                            </div>

                        </div>
                        {/* Booking */}
                        <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-start cursor-pointer py-1 px-2 rounded border-none hover:scale-110 hover:opacity-80 transition-all"
                            onClick={() => { navigate('/mybooking') }}>View Booking</button>
                    </div>

                    <div className="mx-2 h-1 bg-[#DEC33A]"></div>

                    {/* Services - Only show if there are services */}
                    {packages.filter(pkg => pkg.type === 'service').length > 0 && (
                        <>
                            <div className="px-4 pt-2 pb-1 w-full">
                                <div className="text-[#7E4300] text-xl font-tiroTamil mb-1">Services</div>
                            </div>
                            <ul className="flex flex-col gap-3 px-4 pb-2 list-none">
                                {packages.filter(pkg => pkg.type === 'service').map((pkg) => (
                                    <Coupon
                                        key={pkg.id}
                                        backgroundImage={pkg.pictureUrl || coupon1}
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
                                <div className="text-[#7E4300] text-xl font-tiroTamil mb-1">Promotions</div>
                            </div>
                            <ul className="flex flex-col gap-3 px-4 pb-2 list-none">
                                {packages.filter(pkg => pkg.type === 'promotion').map((pkg) => (
                                    <Coupon
                                        key={pkg.id}
                                        backgroundImage={pkg.pictureUrl || coupon1}
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
                <p className="text-[#7E4300] text-center mt-10 font-tiroTamil">Loading profile...</p>
            </div>
        )
    );
}
export default App
