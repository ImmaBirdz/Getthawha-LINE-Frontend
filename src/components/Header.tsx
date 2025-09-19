// import assets
import border1 from '../assets/border1.png';
import border2 from '../assets/border2.png';

function Header() {
    return (
        <div className="m-0 w-[360px] h-fit bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)] flex flex-col relative">
            {/* Thai pattern at the top corner */}
            <img src={border1} alt="Left Top" className="absolute top-0 left-0 w-22 h-22" />
            <img src={border2} alt="Right Top" className="absolute top-0 right-0 w-22 h-22" />

            {/* Header */}
            <div className="p-2">
                <div className="text-[30px] text-[#DEC33A] font-artifika">GETTHAWHA</div>
                <div className="text-[20px] text-[#B9A43B] relative bottom-2 font-arya">THAI MASSAGE</div>
            </div>
        </div>
    );
}

export default Header