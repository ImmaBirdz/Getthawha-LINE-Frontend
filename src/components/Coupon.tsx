interface CouponProps {
    backgroundImage: string;
    altText?: string;
}

function Coupon({ backgroundImage, altText = "Coupon Background" }: CouponProps) {
    return (
        <li className="relative rounded-2xl overflow-hidden h-32 w-full">
            <img src={backgroundImage} alt={altText} className="absolute inset-0 w-full h-full object-contain" />
            <div className="relative flex flex-col justify-center items-center h-full text-white">
                {/* <button className="bg-white text-gray-700 text-xs py-2 w-full rounded-b-2xl">
                    use coupon
                </button> */}
            </div>
        </li>
    );
}

export default Coupon;
