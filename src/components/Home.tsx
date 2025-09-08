import { useContext } from 'react'
// import {
//     useState,
//     useEffect
// } from 'react'
// import liff from '@line/liff'
import '../App.css'
import { ProfileContext } from '../context/ProfileContext'
import edit from '../assets/edit.png'
import coupon1 from '../assets/coupon1.png'
import coupon2 from '../assets/coupon2.png'
import coupon3 from '../assets/coupon3.png' 
import coupon4 from '../assets/coupon4.png'
import Coupon from './Coupon'

// type Profile = {
//     userId: string
//     displayName: string
//     pictureUrl: string
//     email?: string
//     statusMessage?: string
//     phone?: string
//     birthday?: string
// }

function App() {
    const {
        profile,
        isLiffLoaded
    } = useContext(ProfileContext)

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
                                <h2 className="font-bold text-[24px] font-tiroGurmukhi text-[#673F00]">{profile?.displayName}</h2>
                                <p className="text-[12px] font-tiroGurmukhi text-[#000000]">User ID: {profile?.userId}</p>
                            </div>
                            <img src={edit} alt="Edit" className="w-6 h-6 cursor-pointer" />
                        </div>
                        
                        {/* User details */}
                        <div className="space-y-1">
                            <p className="text-[16px] font-tiroTamil text-[#280A00]">Email: {profile?.email}</p>
                            <p className="text-[16px] font-tiroTamil text-[#280A00]">Phone: {/* {profile?.phone} */}</p>
                            <p className="text-[16px] font-tiroTamil text-[#280A00]">BD: {/* {profile?.birthday} */}</p>
                        </div>

                    </div>
                    {/* Booking */}
                    <button className="mt-2 !bg-[#DCA900] text-white text-xs font-tiroTamil self-start cursor-pointer py-1 px-2 rounded border-none"
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
            <div className="w-[360px] min-h-screen bg-gradient-to-b from-[#5c2500] to-[#d59700] flex flex-col items-center justify-center">
                <p>Loading profile...</p>
            </div>
        )
    );
}
export default App
