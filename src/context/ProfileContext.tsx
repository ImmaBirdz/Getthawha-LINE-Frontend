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
    email?: string
    statusMessage?: string
}

const ProfileContext = createContext<{
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
    isLiffLoaded: boolean;
    setIsLiffLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    profile: null,
    setProfile: () => {},
    isLiffLoaded: false,
    setIsLiffLoaded: () => {},
});

const ProfileProvider = (props: React.PropsWithChildren<{}>) => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLiffLoaded, setIsLiffLoaded] = useState(false);

    useEffect(() => {
        const initLiff = async () => {
            await liff.init({ liffId: '2007750755-nv6wlyNZ' })
                .then(() => {
                    if (liff.isLoggedIn()) {
                        const idToken = liff.getIDToken()
                        console.log('ID Token:', idToken)

                        liff.getProfile().then(profile => {
                            // Decode email from idToken (JWT)
                            let email = '';
                            if (idToken) {
                                try {
                                    const payload = JSON.parse(atob(idToken.split('.')[1]));
                                    email = payload.email || '';
                                } catch (e) {
                                    console.error('Error decoding ID token:', e);
                                }
                            }
                            setProfile({
                                userId: profile.userId,
                                displayName: profile.displayName,
                                pictureUrl: profile.pictureUrl ?? '',
                                statusMessage: profile.statusMessage,
                                email,
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
            setIsLiffLoaded(true);
        }
        initLiff();
    }, [])

    return (
        <ProfileContext.Provider value={{
            profile,
            setProfile,
            isLiffLoaded,
            setIsLiffLoaded
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export {
    ProfileContext,
    ProfileProvider
};