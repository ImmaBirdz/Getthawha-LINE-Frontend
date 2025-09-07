import {
    createContext,
    useState,
    useEffect
} from 'react'
import liff from '@line/liff'

type Profile = {
    userId: string
    displayName: string
    pictureUrl: string
    statusMessage?: string
}

const ProfileContext = createContext<{
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}>({
    profile: null,
    setProfile: () => {},
});

const ProfileProvider = (props: React.PropsWithChildren<{}>) => {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        const initLiff = async () => {
            await liff.init({ liffId: '2007750755-nv6wlyNZ' })
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
        }
        initLiff();
    }, [])

    return (
        <ProfileContext.Provider value={{
            profile,
            setProfile
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export {
    ProfileContext,
    ProfileProvider
};