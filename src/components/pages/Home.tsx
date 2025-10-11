// import libraries
import {
    useContext,
    useEffect,
    useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Extend Window interface for LIFF
declare global {
    interface Window {
        liff: {
            init: (config: any) => Promise<void>;
            login: (config?: any) => void;
            logout: () => Promise<void>;
            isLoggedIn: () => boolean;
            isInClient: () => boolean;
            closeWindow: () => void;
            getProfile: () => Promise<any>;
            getAccessToken: () => string;
        };
    }
}

// import context
import { ProfileContext } from '../../context/ProfileContext'
import { useTranslation } from '../../context/TranslationContext'

// import API
import {
    getPackages,
} from '../../services/BackendApi'

// import styles
import '../../App.css'

// import assets
import Package from './Package'
import PackageModal from '../modals/PackageModal'

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

function Home() {
    // Profile context
    const {
        profile,
        isLiffLoaded
    } = useContext(ProfileContext)
    
    // // Dummy profile for testing
    // const profile = {
    //     displayName: "John Doe",
    //     pictureUrl: "https://via.placeholder.com/64x64/FF6B6B/FFFFFF?text=JD"
    // };
    // const isLiffLoaded = true;
    
    // Translation context
    const {
        language,
        setLanguage,
        t
    } = useTranslation();
    
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const [packages, setPackages] = useState<Package[]>([])
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [draggedItem, setDraggedItem] = useState<Package | null>(null)
    const [draggedOverItem, setDraggedOverItem] = useState<Package | null>(null)

    // Proper logout function for LINE app (phone/iPad)
    const handleLogout = async () => {
        try {
            // Show loading indicator
            MySwal.fire({
                title: <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
                    {language === 'TH' ? 'กำลังออกจากระบบ...' : 'Logging out...'}
                </div>,
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    MySwal.showLoading();
                }
            });

            // Check if LIFF is available and user is logged in
            if (window.liff && window.liff.isLoggedIn()) {
                // Clear any stored user data
                localStorage.clear();
                sessionStorage.clear();
                
                // Perform LIFF logout
                await window.liff.logout();

                // Device-specific handling
                if (window.liff.isInClient()) {
                    // Running inside LINE app (phone/iPad)
                    MySwal.fire({
                        title: <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
                            {language === 'TH' ? 'ออกจากระบบสำเร็จ' : 'Logged out successfully'}
                        </div>,
                        html: <div className={language === 'TH' ? 'font-athiti font-black text-[#6B4423] text-sm' : 'font-tiroTamil text-[#6B4423] text-sm'}>
                            {language === 'TH' ? 'กรุณาเข้าสู่ระบบใหม่ผ่าน Rich Menu' : 'Please login again through Rich Menu'}
                        </div>,
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false,
                        confirmButtonColor: "#7E4300"
                    }).then(() => {
                        // Close LIFF window and redirect to LINE rich menu
                        window.liff.closeWindow();
                    });
                } else {
                    // Running in external browser
                    MySwal.fire({
                        title: <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
                            {language === 'TH' ? 'ออกจากระบบสำเร็จ' : 'Logged out successfully'}
                        </div>,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        confirmButtonColor: "#7E4300"
                    }).then(() => {
                        // Redirect to home page
                        window.location.href = '/';
                    });
                }
            } else {
                // Fallback when LIFF is not available or user not logged in
                console.log('LIFF not available or user not logged in');
                MySwal.close();
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
            MySwal.fire({
                title: <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
                    {language === 'TH' ? 'เกิดข้อผิดพลาด' : 'Error'}
                </div>,
                html: <div className={language === 'TH' ? 'font-athiti font-black text-[#6B4423] text-sm' : 'font-tiroTamil text-[#6B4423] text-sm'}>
                    {language === 'TH' ? 'ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง' : 'Unable to logout. Please try again.'}
                </div>,
                icon: 'error',
                confirmButtonColor: "#7E4300",
                confirmButtonText: <span className={language === 'TH' ? 'font-athiti font-black' : 'font-tiroTamil'}>OK</span>
            });
        }
    };

    const handlePackageClick = (pkg: Package) => {
        setSelectedPackage(pkg)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedPackage(null)
    }

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent, pkg: Package) => {
        setDraggedItem(pkg)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', pkg.id)
    }

    const handleDragEnd = () => {
        setDraggedItem(null)
        setDraggedOverItem(null)
    }

    const handleDragOver = (e: React.DragEvent, pkg: Package) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setDraggedOverItem(pkg)
    }

    const handleDragLeave = () => {
        setDraggedOverItem(null)
    }

    const handleDrop = (e: React.DragEvent, dropTarget: Package) => {
        e.preventDefault()
        
        if (!draggedItem || draggedItem.id === dropTarget.id) {
            return
        }

        // Only allow reordering within the same type (service or promotion)
        if (draggedItem.type !== dropTarget.type) {
            return
        }

        const updatedPackages = [...packages]
        
        // Find indices
        const draggedIndex = updatedPackages.findIndex(pkg => pkg.id === draggedItem.id)
        const targetIndex = updatedPackages.findIndex(pkg => pkg.id === dropTarget.id)
        
        // Remove dragged item and insert at new position
        const [draggedPackage] = updatedPackages.splice(draggedIndex, 1)
        updatedPackages.splice(targetIndex, 0, draggedPackage)
        
        setPackages(updatedPackages)
        setDraggedItem(null)
        setDraggedOverItem(null)
    }

    // Check login status on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            if (window.liff) {
                try {
                    await window.liff.init({ liffId: process.env.REACT_APP_LIFF_ID || '' });
                    
                    // If not logged in, redirect to login through rich menu
                    if (!window.liff.isLoggedIn()) {
                        MySwal.fire({
                            title: <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
                                {language === 'TH' ? 'กรุณาเข้าสู่ระบบ' : 'Please Login'}
                            </div>,
                            html: <div className={language === 'TH' ? 'font-athiti font-black text-[#6B4423] text-sm' : 'font-tiroTamil text-[#6B4423] text-sm'}>
                                {language === 'TH' ? 'กรุณาเข้าสู่ระบบผ่าน Rich Menu ของ LINE' : 'Please login through LINE Rich Menu'}
                            </div>,
                            icon: 'info',
                            confirmButtonColor: "#7E4300",
                            confirmButtonText: <span className={language === 'TH' ? 'font-athiti font-black' : 'font-tiroTamil'}>
                                {language === 'TH' ? 'ตกลง' : 'OK'}
                            </span>
                        }).then(() => {
                            window.liff.closeWindow();
                        });
                        return;
                    }
                } catch (error) {
                    console.error('LIFF initialization error:', error);
                }
            }
        };

        checkLoginStatus();
    }, [language, MySwal]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();

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
                
                // Sort packages by price (lowest to highest) within each type
                const sortedPackages = mappedPackages.sort((a: Package, b: Package) => {
                    // First sort by type to keep services and promotions grouped
                    if (a.type !== b.type) {
                        return a.type.localeCompare(b.type);
                    }
                    // Then sort by price within each type (lowest to highest)
                    return a.price - b.price;
                });
                
                setPackages(sortedPackages);
            } catch (error) {
                console.error('Failed to fetch packages:', error);
            }
        };
        fetchPackages();
    }, []);

    return (
        profile && isLiffLoaded ?
         (
                <div className="App">
                    <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col relative">
                        <div className="px-6 py-4 text-[#D49F00] bg-white justify-evenly ">
                            <div className="text-left pb-8">
                                {/* Profile picture and name section */}
                                <div className="flex items-center gap-4 mb-4 relative">
                                    {/* Language selector and Logout */}
                                    <div className="absolute top-0 -right-4 flex flex-col items-end gap-2">
                                        {/* Language Selector */}
                                        <div className="text-sm text-[#673F00] font-tiroTamil">
                                            <span
                                                className={`cursor-pointer hover:text-[#DCA900] transition-colors ${language === 'TH' ? 'text-[#DCA900] font-bold' : ''}`}
                                                onClick={() => setLanguage('TH')}
                                            >
                                                TH
                                            </span>
                                            <span className="mx-1">|</span>
                                            <span
                                                className={`cursor-pointer hover:text-[#DCA900] transition-colors ${language === 'EN' ? 'text-[#DCA900] font-bold' : ''}`}
                                                onClick={() => setLanguage('EN')}
                                            >
                                                EN
                                            </span>
                                        </div>
                                        
                                        {/* Logout Button */}
                                        <div
                                            onClick={() => {
                                                MySwal.fire({
                                                    title: <div className={language === 'TH' ? 'font-athiti font-black text-[#7E4300] text-lg' : 'font-tiroTamil text-[#7E4300] text-lg'}>
                                                        {language === 'TH' ? 'ออกจากระบบ?' : 'Logout?'}
                                                    </div>,
                                                    html: <div className={language === 'TH' ? 'font-athiti font-black text-[#6B4423] text-sm' : 'font-tiroTamil text-[#6B4423] text-sm'}>
                                                        {language === 'TH' ? 'คุณต้องการออกจากระบบหรือไม่?' : 'Do you want to logout?'}
                                                    </div>,
                                                    icon: "question",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#7E4300",
                                                    cancelButtonColor: "#7E4300",
                                                    confirmButtonText: <span className={language === 'TH' ? 'font-athiti font-black' : 'font-tiroTamil'}>
                                                        {language === 'TH' ? 'ออกจากระบบ' : 'Yes, Logout'}
                                                    </span>,
                                                    cancelButtonText: <span className={language === 'TH' ? 'font-athiti font-black' : 'font-tiroTamil'}>
                                                        {language === 'TH' ? 'ยกเลิก' : 'Cancel'}
                                                    </span>
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleLogout();
                                                    }
                                                });
                                            }}
                                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500 hover:bg-red-600 hover:scale-110 active:scale-95 active:bg-red-700 text-white text-xs rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                                            title={language === 'TH' ? 'ออกจากระบบ' : 'Logout'}
                                        >
                                            {/* Logout Icon */}
                                            <svg 
                                                className="w-3 h-3" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                    </div>

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
                                </div>

                            </div>
                            {/* Booking Buttons */}
                            <div className="flex justify-between w-full mt-2 gap-6">
                                <button className={
                                    language === 'TH'
                                        ? 'flex-1 !bg-[#DCA900] text-white text-sm font-athiti font-black cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                                        : 'flex-1 !bg-[#DCA900] text-white text-sm font-tiroTamil cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                                }
                                    onClick={() => { navigate('/booking') }}>{t.viewBooking}</button>
                                <button className={
                                    language === 'TH'
                                        ? 'flex-1 !bg-[#DCA900] text-white text-sm font-athiti font-black cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                                        : 'flex-1 !bg-[#DCA900] text-white text-sm font-tiroTamil cursor-pointer py-2 px-4 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
                                }
                                    onClick={() => { navigate('/booking/history') }}>{t.history}</button>
                            </div>
                        </div>

                        <div className="mx-2 h-1 bg-[#DEC33A]"></div>

                        {/* Services - Only show if there are services */}
                        {packages.filter(pkg => pkg.type === 'service').length > 0 && (
                            <>
                                <div className="px-4 pt-2 pb-1 w-full">
                                    <div className={
                                        language === 'TH'
                                            ? 'text-[#7E4300] text-xl font-athiti font-black mb-1'
                                            : 'text-[#7E4300] text-xl font-tiroTamil mb-1'
                                    }>{t.services}</div>
                                </div>
                                <ul className="flex flex-col gap-3 px-4 pb-2 list-none">
                                    {packages.filter(pkg => pkg.type === 'service').map((pkg) => (
                                        <Package
                                            key={pkg.id}
                                            backgroundImage={pkg.pictureUrl}
                                            altText={pkg.title}
                                            title={pkg.title}
                                            description={pkg.description}
                                            price={pkg.price}
                                            duration={pkg.duration}
                                            note={pkg.note}
                                            onClick={() => handlePackageClick(pkg)}
                                            showOnlyTitle={true}
                                            draggable={true}
                                            onDragStart={(e) => handleDragStart(e, pkg)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => handleDragOver(e, pkg)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, pkg)}
                                            isDragging={draggedItem?.id === pkg.id}
                                            isDraggedOver={draggedOverItem?.id === pkg.id}
                                        />
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* Promotions - Only show if there are promotions */}
                        {packages.filter(pkg => pkg.type === 'promotion').length > 0 && (
                            <>
                                <div className="px-4 pt-2 pb-1 w-full">
                                    <div className={
                                        language === 'TH'
                                            ? 'text-[#7E4300] text-xl font-athiti font-black mb-1'
                                            : 'text-[#7E4300] text-xl font-tiroTamil mb-1'
                                    }>{t.promotions}</div>
                                </div>
                                <ul className="flex flex-col gap-3 px-4 pb-2 list-none">
                                    {packages.filter(pkg => pkg.type === 'promotion').map((pkg) => (
                                        <Package
                                            key={pkg.id}
                                            backgroundImage={pkg.pictureUrl}
                                            altText={pkg.title}
                                            title={pkg.title}
                                            description={pkg.description}
                                            price={pkg.price}
                                            duration={pkg.duration}
                                            note={pkg.note}
                                            onClick={() => handlePackageClick(pkg)}
                                            showOnlyTitle={false}
                                            draggable={true}
                                            onDragStart={(e) => handleDragStart(e, pkg)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => handleDragOver(e, pkg)}
                                            onDragLeave={handleDragLeave}
                                            onDrop={(e) => handleDrop(e, pkg)}
                                            isDragging={draggedItem?.id === pkg.id}
                                            isDraggedOver={draggedOverItem?.id === pkg.id}
                                        />
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* Package Modal */}
                        <PackageModal 
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            packageData={selectedPackage}
                        />
                    </div>
                </div>
            ) : (
                <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col relative">
                    <p className={language === 'TH' ? 'text-[#7E4300] text-center mt-10 font-athiti font-black' : 'text-[#7E4300] text-center mt-10 font-tiroTamil'}>{t.loadingProfile}</p>
                </div>
            )
    );
}
export default Home;
