interface CouponProps {
    backgroundImage: string;
    altText?: string;
    title?: string;
    description?: string;
    price?: number;
    duration?: number;
    note?: string;
}

function Coupon({ backgroundImage, altText = "Coupon Background", title, description, price, duration, note }: CouponProps) {
    return (
        <li className="relative rounded-2xl overflow-hidden h-40 w-full shadow-lg">
            <img src={backgroundImage} alt={altText} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 rounded-2xl"></div>
            
            {/* Duration badge - top right corner */}
            {duration && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 rounded-full px-3 py-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-sm font-medium">{duration} mins </span>
                </div>
            )}

            {/* Price section - top left */}
            <div className="absolute top-3 left-4">
                {price && (
                    <div className="text-[#FFD700] text-3xl font-bold font-trebuchet tracking-wide" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                        {price.toLocaleString()}.-
                    </div>
                )}
            </div>

            {/* Content section - left side */}
            <div className="absolute left-4 bottom-4 right-20">
                {title && (
                    <div className="text-white font-bold text-lg font-trebuchet mb-1 text-left" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                        {title}
                    </div>
                )}
                {description && (
                    <div className="text-white/90 text-sm text-left mb-1" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
                        {description}
                    </div>
                )}
                {note && (
                    <div className="text-[#FFD700] text-xs font-medium text-left" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                        {note}
                    </div>
                )}
            </div>
        </li>
    );
}

export default Coupon;
