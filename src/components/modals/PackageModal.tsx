// import assets
import closeIcon from '../assets/close.png';

// Fixed English labels for consistency
const labels = {
    serviceDetails: 'Service Details',
    promotionDetails: 'Promotion Details',
    description: 'Description',
    price: 'Price', 
    duration: 'Duration',
    minutes: 'minutes',
    note: 'Note',
    close: 'Close'
};

interface PackageModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageData: {
        id: string;
        title: string;
        description: string;
        price: number;
        duration?: number;
        pictureUrl: string;
        note?: string;
        type: string;
    } | null;
}

function PackageModal({ isOpen, onClose, packageData }: PackageModalProps) {
    if (!isOpen || !packageData) return null;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 "
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl w-80 h-[70vh] flex flex-col border-2 border-[#7E4300]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 relative">
                    <div className="flex-1"></div>
                    <h2 className="text-lg font-tiroTamil text-[#7E4300] absolute left-1/2 transform -translate-x-1/2">
                        {packageData.type === 'service' ? labels.serviceDetails : labels.promotionDetails}
                    </h2>
                    <div 
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center hover:scale-110 hover:opacity-80 transition-all duration-200"
                    >
                        <img src={closeIcon} alt="Close" className="w-8 h-8" />
                    </div>
                </div>

                {/* Package image */}
                <div className="relative h-48 w-full flex-shrink-0">
                    <img 
                        src={packageData.pictureUrl} 
                        alt={packageData.title}
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Duration badge */}
                    {packageData.duration && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 rounded-full px-3 py-1">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white text-sm font-medium">
                                {packageData.duration} mins
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="absolute top-3 left-3">
                        <div className="text-[#FFD700] text-3xl font-bold font-trebuchet tracking-wide drop-shadow-lg">
                            {packageData.price.toLocaleString()}.-
                        </div>
                    </div>
                </div>

                {/* Package details */}
                <div className="p-4 space-y-3 flex-1">
                    {/* Title */}
                    <div>
                        <h3 className="text-xl font-tiroTamil text-[#7E4300] mb-2">
                            {packageData.title}
                        </h3>
                    </div>

                    {/* Description */}
                    {packageData.description && (
                        <div>
                            <label className="block text-sm font-tiroTamil text-[#7E4300] mb-1">
                                {labels.description}:
                            </label>
                            <p className="text-gray-700 font-tiroTamil text-sm ">
                                {packageData.description}
                            </p>
                        </div>
                    )}

                    {/* Price and Duration in one row */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-tiroTamil text-[#7E4300] mb-1">
                                {labels.price}:
                            </label>
                            <p className="text-xl font-bold text-[#DCA900] font-trebuchet">
                                {packageData.price.toLocaleString()}.-
                            </p>
                        </div>
                        
                        {/* Duration detail */}
                        {packageData.duration && (
                            <div className="flex-1">
                                <label className="block text-sm font-tiroTamil text-[#7E4300] mb-1">
                                    {labels.duration}:
                                </label>
                                <p className="text-xl font-bold text-[#DCA900] font-trebuchet">
                                    {packageData.duration} {labels.minutes}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Note */}
                    {packageData.note && (
                        <div>
                            <label className="block text-sm font-tiroTamil text-[#7E4300] mb-1">
                                {labels.note}:
                            </label>
                            <p className="text-[#DCA900] font-tiroTamil text-sm">
                                {packageData.note}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PackageModal;