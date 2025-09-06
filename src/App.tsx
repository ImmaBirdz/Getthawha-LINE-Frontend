import { useState, useEffect } from 'react'
import './App.css'
import liff from '@line/liff'

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
      <div className="w-[360px] min-h-screen bg-gradient-to-b from-[#5c2500] to-[#d59700] flex flex-col">
        
        {/* Header */}
        <div className="p-2">
          <div className="text-[25px] text-yellow-300 ">GETTHAWHA</div>
          <div className="text-[15px] text-yellow-200 relative bottom-2 ">THAI MASSAGE</div>
        </div>

        <div className="border-t-10 border-white"></div>

        <div className="px-6 py-4 pb-16 text-black bg-gradient-to-b from-[#c77c00] to-[#d59c00]">
          <div className="text-left">
            <p className="font-semibold text-lg">Username: {profile?.displayName}</p>
            <p className="text-sm">User ID: {profile?.userId}</p>
            <p className="text-sm">Detail</p>
          </div>
        </div>

        <div className="border-t-10 border-white"></div>

        {/* Coupons */}
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

        {/* show line id and user profile */}
        {/* {profile ? (
          <>
            <p>LINE ID: {profile.userId}</p>
            <p>Name: {profile.displayName}</p>
            <img src={profile.pictureUrl} alt="Profile" />
          </>
        ) : (
          <p>Loading profile...</p>
        )} */}
      </div>
    </div>
  ) : (
    <div className="w-[360px] min-h-screen bg-gradient-to-b from-[#5c2500] to-[#d59700] flex flex-col">
      <p>Loading profile...</p>
    </div>
    
  )
);
}
export default App
