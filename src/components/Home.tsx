import { useContext } from 'react'
import {
    useState,
    useEffect
} from 'react'
// import liff from '@line/liff'
import '../App.css'
import { ProfileContext } from '../context/ProfileContext'
import edit from '../assets/edit.png'
import coupon1 from '../assets/coupon1.png'
import coupon2 from '../assets/coupon2.png'
import coupon3 from '../assets/coupon3.png' 
import coupon4 from '../assets/coupon4.png'
import Coupon from './Coupon'
import { getPackages } from '../services/backendApi'

// type Profile = {
//     userId: string
//     displayName: string
//     pictureUrl: string
//     email?: string
//     statusMessage?: string
//     phone?: string
//     birthday?: string
// }

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

    const [packages, setPackages] = useState<Package>()

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackages(data);
                // map packages
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
                console.log('Fetched packages (package):', mappedPackages);
                console.log('Fetched packages (data):', data);
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            }
        };
        fetchPackages();
    }, []);
    // const [profile, setProfile] = useState<Profile | null>(null);

    // useEffect(() => {
    //     const initLiff = async () => {
    //         await liff.init({ liffId: '2007750755-nv6wlyNZ' })
    //             .then(() => {
    //                 if (liff.isLoggedIn()) {
    //                     const idToken = liff.getIDToken()
    //                     console.log('ID Token:', idToken)

    //                     liff.getProfile().then(profile => {
    //                         setProfile({
    //                             userId: profile.userId,
    //                             displayName: profile.displayName,
    //                             pictureUrl: profile.pictureUrl ?? '',
    //                             statusMessage: profile.statusMessage,
    //                         })
    //                         console.log('User profile:', profile)
    //                     }).catch(err => {
    //                         console.error('Error getting profile:', err)
    //                     })
    //                 } else {
    //                     liff.login()
    //                 }
    //             })
    //             .catch(err => {
    //                 console.error('LIFF initialization failed:', err)
    //             })
    //     }
    //     initLiff();
    // }, [])

    return (
        profile
        // ? (
        &&
        isLiffLoaded ? (
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
                    onClick={() => { window.location.href = '/mybooking' }}>View Booking</button>
                </div>

                <div className="mx-2 h-1 bg-[#DEC33A]"></div>

                {/* Coupons */}
                {/* list of my coupon */}
                {/* if not, show "no coupon available" */}
                <ul className="flex flex-col gap-4 p-6 list-none">
                    <Coupon backgroundImage={coupon1} altText="Coupon 1" />
                    <Coupon backgroundImage={coupon2} altText="Coupon 2" />
                    <Coupon backgroundImage={coupon3} altText="Coupon 3" />
                    <Coupon backgroundImage={coupon4} altText="Coupon 4" />
                    <Coupon backgroundImage={coupon1} altText="Coupon 1" />
                    <Coupon backgroundImage={coupon2} altText="Coupon 2" />
                    <Coupon backgroundImage={coupon3} altText="Coupon 3" />
                </ul>
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
