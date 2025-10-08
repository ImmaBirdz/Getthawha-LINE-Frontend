// import libraries
import { useNavigate } from 'react-router-dom';

// import translation
import { useTranslation } from '../../context/TranslationContext';

function NotFound() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="m-0 w-[360px] min-h-[90vh] bg-white flex flex-col items-center justify-center px-4 py-8">
      <div className={language === 'TH' ? 'text-[#7E4300] text-2xl font-athiti font-black mb-4' : 'text-[#7E4300] text-2xl font-tiroTamil mb-4'}>{t.notFoundTitle}</div>
      <p className={language === 'TH' ? 'text-base text-gray-600 mb-6 font-athiti' : 'text-base text-gray-600 mb-6 font-tiroTamil'}>{t.notFoundMessage}</p>
      <button
        className={
          language === 'TH'
            ? 'w-fit !bg-[#DCA900] text-white text-base font-athiti font-black cursor-pointer py-3 px-6 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
            : 'w-fit !bg-[#DCA900] text-white text-base font-tiroTamil cursor-pointer py-3 px-6 rounded-lg border-none hover:scale-105 hover:opacity-90 transition-all'
        }
        onClick={() => { navigate(-1) }}
      >
        {t.notFoundGoBack}
      </button>
    </div>
  )
}

export default NotFound;