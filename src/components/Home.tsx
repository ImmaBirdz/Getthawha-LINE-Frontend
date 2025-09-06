import {
    useState,
    useEffect
} from 'react'
import '../App.css'
import liff from '@line/liff'
import border1 from '../assets/border1.png'
import border2 from '../assets/border2.png'


type Profile = {
    userId: string
    displayName: string
    pictureUrl: string
    statusMessage?: string
}

function App() {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        liff.init({ liffId: '2007750755-nv6wlyNZ' })
            .then(() => {
                if (liff.isLoggedIn()) {

                    const idToken = liff.getIDToken()
                    console.log('ID Token:', idToken)


                    liff.getProfile().then(profile => {
                        setProfile({
                            userId: profile.userId,
                            displayName: profile.displayName,
                            pictureUrl: profile.pictureUrl ?? '',
                            statusMessage: profile.statusMessage,
                        })
                        console.log('User profile:', profile)
                    }).catch(err => {
                        console.error('Error getting profile:', err)
                    })
                } else {
                    liff.login()
                }
            })
            .catch(err => {
                console.error('LIFF initialization failed:', err)
            })
    }, [])
    return (
        profile ? (
            <div className="App">
               <div className="m-0 w-[360px] min-h-screen bg-[linear-gradient(90deg,#2D1406_29%,#4C2B00_75%)] flex flex-col relative">


            {/* img left top corner */}
            <img src={border1} alt="Left Top"  className="absolute top-0 left-0 w-16 h-16" />

            {/* img right top corner */}
            <img src={border2} alt="Right Top" className="absolute top-0 right-0 w-16 h-16" />

                    {/* Header */}
                    <div className="p-2">
                        <div className="text-[30px] text-[#DEC33A] font-artifika">GETTHAWHA</div>
                        <div className="text-[20px] text-[#B9A43B] relative bottom-2 font-arya">THAI MASSAGE</div>
                    </div>

                    <div className="border-t-10 border-white"></div>

                  <div className="px-6 py-4 pb-16 text-[#D49F00] bg-[linear-gradient(90deg,#2D1406_25%,#734B00_100%)]">

                        <div className="text-left">
                            <p className="font-semibold text-lg font-tiroGurmukhi">Username: {profile?.displayName}</p>
                            <p className="text-sm font-tiroGurmukhi">User ID: {profile?.userId}</p>
                            <p className="text-sm font-tiroGurmukhi">Detail</p>
                            {/* Booking */}
                            <button className="mt-2 bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">View Booking</button>
                        </div>
                    </div>

                    <div className="border-t-10 border-white"></div>

                    {/* Coupons */}
                    {/* list of my coupon */}
                    {/* if not, show "no coupon available" */}
                    <ul className="grid grid-cols-2 gap-4 p-6 list-none">
                        <li className="bg-rose-300 rounded-2xl shadow-md flex flex-col justify-between h-32">
                            <div className="flex-1"></div>
                            <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                                use coupon
                            </button>
                        </li>
                        <li className="bg-rose-300 rounded-2xl shadow-md flex flex-col justify-between h-32">
                            <div className="flex-1"></div>
                            <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                                use coupon
                            </button>
                        </li>
                        <li className="bg-rose-300 rounded-2xl shadow-md flex flex-col justify-between h-32">
                            <div className="flex-1"></div>
                            <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                                use coupon
                            </button>
                        </li>
                        <li className="bg-rose-300 rounded-2xl shadow-md flex flex-col justify-between h-32">
                            <div className="flex-1"></div>
                            <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                                use coupon
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        ) : (
            <div className="w-[360px] min-h-screen bg-gradient-to-b from-[#5c2500] to-[#d59700] flex flex-col items-center justify-center">
                <p>Loading profile...</p>
            </div>
        )
    );
}
export default App
