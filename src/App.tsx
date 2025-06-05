import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { FaCrown } from 'react-icons/fa';


import backgroundImage from './assets/background.svg';
import bgmobile2Image from './assets/bg.svg';
import logo from './assets/logo/logo.svg';
// import vipIcon from './assets/vip-icon.svg';
// import { useTickSound } from './hooks/useTickSound';
import Timer from './components/Timer';

function App() {
  const [endTime] = useState(() => {
    const savedEndTime = localStorage.getItem('countdownEndTime');
    if (savedEndTime) {
      return parseInt(savedEndTime, 10);
    }
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return thirtyDaysFromNow.getTime();
  });

  // const { playTick } = useTickSound();
  const [isLogoLoading, setIsLogoLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('countdownEndTime', endTime.toString());
  }, [endTime]);



  return (
    <div className="min-h-screen bg-cover font-krona relative">
      <style>{`
        .background-container {
          background-image: url(${bgmobile2Image});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh;
        }
        
        @media (min-width: 768px) {
          .background-container {
            background-image: url(${backgroundImage});
          }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px 2px rgba(255, 211, 110, 0.7); }
          50% { box-shadow: 0 0 20px 5px rgba(255, 211, 110, 0.9); }
        }
      `}</style>
      <div className="background-container absolute inset-0"></div>
      <div className="container mx-auto px-4 py-8 relative">
        {/* VIP Access Button */}
        <div className="flex justify-end mb-4 md:pr-8 lg:pr-16 xl:pr-24">
          <button
            className="px-5 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-r from-[#FFD36E] to-[#A58141] hover:opacity-90 transition-all flex items-center animate-[pulse-glow_2s_infinite] shadow-lg"
            onClick={() => window.open('https://lunafounder.io/vip', '_blank')}
          >
            <FaCrown className="inline-block mr-2 text-lg" />VIP ACCESS
          </button>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center min-h-screen md:pr-8 lg:pr-16 xl:pr-24">
          {/* Logo with loader */}
          <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
            {isLogoLoading && (
              <ImSpinner2 className="animate-spin text-white text-4xl absolute" />
            )}
            <img
              src={logo}
              alt="Luna Casino Logo"
              className={`w-full h-full ${isLogoLoading ? 'hidden' : 'block'}`}
              onLoad={() => setIsLogoLoading(false)}
            />
          </div>

          <h1 className="text-4xl md:text-5xl text-white font-bold mb-8 text-center md:text-right">
            LAUNCH IN
          </h1>

          <Timer targetDate={new Date(endTime).toISOString()} />

          <h2 className="text-3xl md:text-4xl text-white font-bold mt-12 mb-8 text-center md:text-right">
            Become a Luna Founder
          </h2>

          <button
            className="px-8 py-4 text-xl font-bold text-black rounded-full bg-gradient-to-r from-[#FFD36E] to-[#A58141] hover:opacity-90 transition-opacity"
            onClick={() => window.open('https://lunafounder.io', '_blank')}
          >
            <FaCrown className="inline-block mr-2 text-xl" />Become a founder now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;