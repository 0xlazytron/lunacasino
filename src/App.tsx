import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { FaCrown } from 'react-icons/fa';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import backgroundImage from './assets/background.svg';
import logo from './assets/logo/logo.svg';
import { useTickSound } from './hooks/useTickSound';

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

  const { playTick } = useTickSound();
  const [isLogoLoading, setIsLogoLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('countdownEndTime', endTime.toString());
  }, [endTime]);



  return (
    <div className="min-h-screen bg-cover bg-center font-krona" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-4 py-8">
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

          <div className="mb-8">
            <FlipClockCountdown
              to={endTime}
              labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
              labelStyle={{
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase',
                color: '#ffffff'
              }}
              digitBlockStyle={{
                width: 40,
                height: 60,
                fontSize: 30,
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
              dividerStyle={{
                color: '#ffffff',
                height: 1
              }}
              separatorStyle={{
                color: '#ffffff',
                size: '6px'
              }}
              duration={0.5}
              onTick={playTick}
            />
          </div>

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
