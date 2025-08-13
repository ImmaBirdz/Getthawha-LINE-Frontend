import { useState, useEffect } from 'react'
import './App.css'
import liff from '@line/liff'


function App() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    liff.init({ liffId: '2007750755-JNQLOKwl' })
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
    <div className="App">
      {/* show line id and user profile */}
      {profile ? (
        <>
          <p>LINE ID: {profile.userId}</p>
          <p>Name: {profile.displayName}</p>
          <img src={profile.pictureUrl} alt="Profile" />
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  )
}
export default App
