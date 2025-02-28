// components/Navbar.tsx
import React from 'react';
import Image from 'next/image';
import TestLogo from '/public/TestLogo.svg'
import HomeIcon from '/public/home_FILL0_wght300_GRAD0_opsz24.svg'
import GroupIcon from '/public/group_FILL0_wght300_GRAD0_opsz24.svg'
import CalenderIcon from '/public/calendar_today_FILL0_wght300_GRAD0_opsz24.svg'
import ChatIcon from '/public/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg'
import CreditCardIcon from '/public/credit_card_FILL0_wght300_GRAD0_opsz24.svg'
import SeniorDoctor from '/public/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png'
import Settings from '/public/settings_FILL0_wght300_GRAD0_opsz24.svg'
import MoreV from '/public/more_vert_FILL0_wght300_GRAD0_opsz24.svg'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md rounded-full mx-4 my-4 px-2 flex items-center justify-between flex-wrap">
      <div className="flex items-center">
      <Image src={TestLogo} alt="TechCare Logo" width={220} height={80} priority />
      </div>

      <div className="hidden md:flex ml-auto md:px-4 py-4 gap-8 justify-center"> 
        <div className="flex items-center">
          <Image src={HomeIcon} alt="Overview Icon" width={20} height={20} />
          <span className="ml-2 text-xl">Overview</span>
        </div>
        <div className="flex items-center bg-teal-200 rounded-full px-6 py-2">
          <Image src={GroupIcon} alt="Patients Icon" width={20} height={20} />
          <span className="ml-2 text-xl">Patients</span>
        </div>
        <div className="flex items-center">
          <Image src={CalenderIcon} alt="Schedule Icon" width={20} height={20} />
          <span className="ml-2 text-xl">Schedule</span>
        </div>
        <div className="flex items-center">
          <Image src={ChatIcon} alt="Message Icon" width={20} height={20} />
          <span className="ml-2 text-xl">Message</span>
        </div>
        <div className="flex items-center">
          <Image src={CreditCardIcon} alt="Transactions Icon" width={20} height={20} />
          <span className="ml-2 text-xl">Transactions</span>
        </div>
      </div>

      <div className="flex items-center ml-auto">
        <div className="flex items-center mr-6">
          <Image 
            src={SeniorDoctor} 
            alt="Dr. Jose Simmons" 
            width={60} 
            height={60} 
            className="rounded-full" 
          />
          <div className="ml-4">
            <span className="block text-l font-semibold">Dr. Jose Simmons</span>
            <span className="block text-sm text-gray-500">General Practitioner</span>
          </div>
        </div>

      <div className="w-1 h-8 bg-gray-300 mx-4"></div>
      
        <div className="p-2">
          <Image src={Settings} alt="Settings Icon" width={30} height={30} />
        </div>
        <div className="p-2">
          <Image src={MoreV} alt="More Icon" width={5} height={5} /> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
