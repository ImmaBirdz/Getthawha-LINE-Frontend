import { useContext } from 'react'
// import {
//     useState,
//     useEffect
// } from 'react'
// import liff from '@line/liff'
import '../App.css'
import { ProfileContext } from '../context/ProfileContext'
import edit from '../assets/edit.png'

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
            <div className="m-0 w-[360px] min-h-[90vh] bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)] flex flex-col relative">
                <div className="px-6 py-4 text-[#D49F00] bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)] justify-evenly ">
                    <div className="text-left pb-8">
                        {/* Username + Edit icon */}
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg font-tiroGurmukhi"> Username: {profile?.displayName} </p>
                            <img src={edit} alt="Edit" className="relative top-0 left-4 w-5 h-5 cursor-pointer" />
                        </div>
                        <p className="text-sm font-tiroTamil">User ID: {profile?.userId}</p>
                        <p className="text-sm font-tiroTamil">Email: {profile?.email}</p>
                        <p className="text-sm font-tiroTamil">Phone:
                            {/* {profile?.phone} */}
                            </p>
                        <p className="text-sm font-tiroTamil">BD:
                            {/* {profile?.birthday} */}
                            </p>

                    </div>
                    {/* Booking */}
                   <div  className="mt-2 text-[#FFD633] text-[14px] font-tiroGurmukhi self-start cursor-pointer hover:[text-shadow:0_0_8px_#FFD633]"
                    onClick={() => { window.location.href = '/mybooking' }}>  View Booking </div>
                </div>

                <div className="h-0.5 bg-gradient-to-r from-[#B9A43B] via-transparent to-[#B9A43B]"></div>

                {/* Coupons */}
                {/* list of my coupon */}
                {/* if not, show "no coupon available" */}
                <ul className="flex flex-col gap-4 p-6 list-none">
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
                    </li>
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
                    </li>
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
                    </li>
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
                    </li>
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
                    </li>
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
                    </li>
                    <li className="bg-white rounded-2xl shadow-md flex flex-col justify-center items-center h-32">
                        <div className="flex text-black">Sample Coupon</div>
                        {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                            use coupon
                        </button> */}
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
