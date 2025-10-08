// import libraries
import liff from '@line/liff';
import {
    createContext,
    useEffect,
    useState
} from 'react';

// import API
import {
    authorizeWithLine,
    getProfile
} from '../services/BackendApi';

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
    setProfile: () => { },
    isLiffLoaded: false,
    setIsLiffLoaded: () => { },
    isLogin: false,
    setIsLogin: () => { }
});

const ProfileProvider = (props: React.PropsWithChildren<{}>) => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLiffLoaded, setIsLiffLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    // initialize LIFF
    useEffect(() => {
            // await liff.init({ liffId: '2007750755-nv6wlyNZ' }) // old
            liff.init({ liffId: '2007725317-GXv8QvO3' }) // yung's
                .then(() => {
                    if (liff.isLoggedIn()) {
                        const idToken = liff.getIDToken() ?? '';

                                authorizeWithLine(idToken).then(() => {
                                    setIsLogin(true);
                                }).catch(error => {
                                    console.error('Authorization failed:', error);
                                });
                        
                    } else {
                        liff.login()
                    }
                })
                .catch(err => {
                    console.error('LIFF initialization failed:', err)
                })
            if (isLogin) setIsLiffLoaded(true);
    }, [])

    // Fetch profile from API
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
