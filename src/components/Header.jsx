"use client";

import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import LanguageSwitcher from './LanguageSwitcher';
import AudioControls from './AudioControls';
import { useI18n } from './I18nProvider';
import { useEffect, useState } from 'react';

const Header = () => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className="top-0 sticky z-40 bg-[#a842b1] h-24 w-screen">
    <div className={`flex items-center z-40 transition-all h-24 duration-300 ${isScrolled ? 'bg-[#a842b1]/60 backdrop-blur-xs' : 'bg-[#a842b1]'}`}>
      <nav className="flex items-center justify-between w-full px-4">
        <div className="flex items-start">
          <Link href="/menu" className="flex items-center">
            <Image
            src="/assets/logo2.svg"
            alt="Logo"
            width={20}
            height={10}
            className='h-20 w-30 hover:scale-120 transition-transform duration-300 ease-in-out'
            />
          </Link>
        </div>
        
        {/* Menú central */}
        <div className="flex flex-col items-center justify-center transition-all duration-200 cursor-pointer">
          <div className="block md:hidden w-full">
            <Menu />
          </div>
          <ul className="hidden md:flex items-center justify-center">
            <li className="mx-4">
              <Link href="/about" className="text-[#fddbff] hover:underline">
                {t('navigation.about')}
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/portfolio" className="text-[#fddbff] hover:underline">
                {t('navigation.portfolio')}
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/contact" className="text-[#fddbff] hover:underline">
                {t('navigation.contact')}
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Controles de audio y selector de idioma - solo en pantallas grandes */}
        <div className="hidden md:flex items-center gap-4 relative z-50">
          <AudioControls />
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
    </div>
    </>
  );
}

export default Header;