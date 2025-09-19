import {
    createContext,
    useState,
    useEffect
} from 'react'
import liff from '@line/liff'
import {
    authorizeWithLine,
    getProfile
} from '../services/backendApi';

type Profile = {
    userId: string
    displayName: string
    pictureUrl: string
    statusMessage?: string
    email?: string
}

const ProfileContext = createContext<{
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
    isLiffLoaded: boolean;
    setIsLiffLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    profile: null,
    setProfile: () => {},
    isLiffLoaded: false,
    setIsLiffLoaded: () => {},
    isLogin: false,
    setIsLogin: () => {}
});

const ProfileProvider = (props: React.PropsWithChildren<{}>) => {
    const [profile, setProfile] = useState<Profile | null>(null)
    // const [profile, setProfile] = useState<Profile | null>({
    //     userId: 'U1234567890abcdef1234567890abcdef',
    //     displayName: 'John Doe',
    //     pictureUrl: 'https://example.com/profile.jpg',
    //     statusMessage: 'Hello, world!',
    //     email: 'john.doe@example.com'
    // });
    const [isLiffLoaded, setIsLiffLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const initLiff = async () => {
            // await liff.init({ liffId: '2007750755-nv6wlyNZ' }) // old
            await liff.init({ liffId: '2007725317-GXv8QvO3' }) // yung's
                .then(() => {
                    if (liff.isLoggedIn()) {
                        const idToken = liff.getIDToken() ?? ''
                        console.log('ID Token:(', idToken)

                        liff.getProfile().then(async profile => {
                            // setProfile({
                            //     userId: profile.userId,
                            //     displayName: profile.displayName,
                            //     pictureUrl: profile.pictureUrl ?? '',
                            //     statusMessage: profile.statusMessage,
                            //     email: liff.getDecodedIDToken()?.email ?? 'no email',
                            // })
                            console.log('User profile:', profile)

                            try {
                                await authorizeWithLine(idToken);
                                setIsLogin(true);
                            } catch (error) {
                                console.error('Authorization failed:', error);
                            }

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

    // fetch profile from backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                const mappedData: Profile = {
                    userId: data.user.id,
                    displayName: data.user.displayName,
                    pictureUrl: data.user.pictureUrl,
                    email: data.user.email ?? 'no email',
                };
                setProfile(mappedData);
                console.log('Fetched profile:', mappedData);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, [isLogin]);

    return (
        <ProfileContext.Provider value={{
            profile,
            setProfile,
            isLiffLoaded,
            setIsLiffLoaded,
            isLogin,
            setIsLogin
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export {
    ProfileContext,
    ProfileProvider
};