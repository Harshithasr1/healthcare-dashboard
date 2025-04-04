// components/Navbar.tsx
import React from 'react';
import Image from 'next/image';

// Define a type for navigation items
interface NavItem {
  icon: string;
  label: string;
}

// Centralize navigation items
const NAV_ITEMS: NavItem[] = [
  { icon: '/home_FILL0_wght300_GRAD0_opsz24.svg', label: 'Overview' },
  { icon: '/group_FILL0_wght300_GRAD0_opsz24.svg', label: 'Patients' },
  { icon: '/calendar_today_FILL0_wght300_GRAD0_opsz24.svg', label: 'Schedule' },
  { icon: '/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg', label: 'Message' },
  { icon: '/credit_card_FILL0_wght300_GRAD0_opsz24.svg', label: 'Transactions' }
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md rounded-full mx-4 my-4 px-2 flex items-center justify-between flex-wrap">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image 
          src="/TestLogo.svg" 
          alt="TechCare Logo" 
          width={220} 
          height={80} 
          priority 
        />
      </div>

      {/* Navigation Items */}
      <div className="flex px-4 py-4 gap-8 justify-center">
        {NAV_ITEMS.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center ${item.label === 'Patients' ? 'bg-teal-200 rounded-full px-6 py-2' : ''}`}
          >
            <Image src={item.icon} alt={`${item.label} Icon`} width={20} height={20} />
            <span className="ml-2 text-xl">{item.label}</span>
          </div>
        ))}
      </div>

      {/* User and Settings Section */}
      <div className="flex items-center">
        <div className="flex items-center mr-6">
          <Image 
            src="/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png" 
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
        
        <div className="flex space-x-2">
          <div className="p-2">
            <Image src="/settings_FILL0_wght300_GRAD0_opsz24.svg" alt="Settings" width={30} height={30} />
          </div>
          <div className="p-2">
            <Image src="/more_vert_FILL0_wght300_GRAD0_opsz24.svg" alt="More" width={5} height={5} /> 
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
