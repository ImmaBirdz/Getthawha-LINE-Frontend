// import assets
import { useTranslation } from '../../context/TranslationContext';
import border1 from '../../assets/border1.png';
import border2 from '../../assets/border2.png';

function Header() {
    const { t, language } = useTranslation();
    
    // Function to split text into animated characters
    const createAnimatedText = (text: string, animationType: string) => {
        return (
            <span className={`animated-text ${animationType}`}>
                {text.split('').map((char, index) => (
                    <span key={index} className="char">
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        );
    };
    return (
        <div className="m-0 w-[360px] h-fit bg-[linear-gradient(90deg,#4C2B00_0%,#2D1406_100%)] flex flex-col relative">
            {/* Thai pattern at the top corner */}
            <img src={border1} alt="Left Top" className="absolute top-0 left-0 w-22 h-22" />
            <img src={border2} alt="Right Top" className="absolute top-0 right-0 w-22 h-22" />

            {/* Header */}
            <div className="p-2">
                <div
                  className={
                    language === 'TH'
                      ? 'text-[30px] text-[#DEC33A] font-athiti font-bold cursor-pointer'
                      : 'text-[30px] text-[#DEC33A] font-artifika cursor-pointer'
                  }
                >
                  {createAnimatedText(t.headerTitle, 'animate-char-dance')}
                </div>
                <div
                  className={
                    language === 'TH'
                      ? 'text-[20px] text-[#B9A43B] relative bottom-2 font-athiti font-bold cursor-pointer'
                      : 'text-[20px] text-[#B9A43B] relative bottom-2 font-arya cursor-pointer'
                  }
                >
                  {createAnimatedText(t.headerSubtitle, 'animate-char-wobble')}
                </div>
            </div>
        </div>
    );
}

export default Header