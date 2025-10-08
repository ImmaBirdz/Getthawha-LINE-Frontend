interface PackageProps {
    backgroundImage: string;
    altText?: string;
    title?: string;
    description?: string;
    price?: number;
    duration?: number;
    note?: string;
    onClick?: () => void;
    showOnlyTitle?: boolean;
}

function Package({ backgroundImage, altText = "Package Background", title, description, price, duration, note, onClick, showOnlyTitle = false }: PackageProps) {
    return (
        <li 
            className="relative rounded-2xl overflow-hidden h-40 w-full shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out group"
            onClick={onClick}
        >
            <img 
                src={backgroundImage} 
                alt={altText} 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 animate-image-zoom filter brightness-110 contrast-110 saturate-110 group-hover:brightness-115 group-hover:contrast-115 group-hover:saturate-115" 
            />

            {/* Shimmer shine effect */}
            <div className="absolute inset-0 w-16 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-shine pointer-events-none"></div>

            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 rounded-2xl transition-opacity duration-300 group-hover:from-black/40 group-hover:via-black/10 group-hover:to-black/20"></div>
            

            
            {/* Duration badge - top right corner */}
            {duration && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 rounded-full px-3 py-1 transition-all duration-300 group-hover:bg-black/80 group-hover:scale-110 animate-pulse animate-slide-in-right delay-200">
                    <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-sm font-medium">{duration} mins </span>
                </div>
            )}

            {/* Price section - top left */}
            <div className="absolute top-3 left-4">
                {price && (
                    <div className="text-[#FFD700] text-3xl font-bold font-trebuchet tracking-wide drop-shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:text-[#FFEA00] group-hover:drop-shadow-2xl animate-bounce-in delay-100">
                        {price.toLocaleString()}.-
                    </div>
                )}
            </div>

            {/* Content section - left side */}
            <div className="absolute left-4 bottom-4 right-20 transition-transform duration-300 group-hover:translate-y-[-2px]">
                {title && (
                    <div className="text-white font-bold text-lg font-trebuchet mb-1 text-left drop-shadow-lg transition-all duration-300 group-hover:text-shadow-xl animate-slide-in-left delay-300">
                        {title}
                    </div>
                )}
                {!showOnlyTitle && description && (
                    <div className="text-white/90 text-sm text-left mb-1 drop-shadow-md transition-all duration-300 group-hover:text-white animate-fade-in-up delay-400">
                        {description}
                    </div>
                )}
                {!showOnlyTitle && note && (
                    <div className="text-[#FFD700] text-xs font-medium text-left drop-shadow-md transition-all duration-300 group-hover:text-[#FFEA00] group-hover:scale-105 animate-fade-in-up delay-400">
                        {note}
                    </div>
                )}
            </div>
        </li>
    );
}

export default Package;
