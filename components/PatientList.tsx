
import React from 'react';
import Image from 'next/image';
import SearchIcon from '/public/search_FILL0_wght300_GRAD0_opsz24.svg'
import MoreInfo from '/public/more_horiz_FILL0_wght300_GRAD0_opsz24.svg'

const patients = [
  { id: 1, name: 'Emily Williams', gender: 'Female', age: 18, photo: '/Layer 8.png' },
  { id: 2, name: 'Ryan Johnson', gender: 'Male', age: 45, photo: '/Layer 1.png' },
  { id: 3, name: 'Brandon Mitchell', gender: 'Male', age: 36, photo: '/Layer 3.png' },
  { id: 4, name: 'Jessica Taylor', gender: 'Female', age: 28, photo: '/Layer 2.png' },
  { id: 5, name: 'Samantha Johnson', gender: 'Female', age: 56, photo: '/Layer 6.png' },
  { id: 6, name: 'Olivia Brown', gender: 'Female', age: 32, photo: '/Layer 12.png' },
  { id: 7, name: 'Tyler Davis', gender: 'Male', age: 19, photo: '/Layer 10.png' },
  { id: 8, name: 'Kevin Anderson', gender: 'Male', age: 30, photo: '/Layer 9.png' },
  { id: 9, name: 'Dylan Thompson', gender: 'Male', age: 36, photo: '/Layer 4.png' },
  { id: 10, name: 'Nathan Evens', gender: 'Male', age: 58, photo: '/Layer 5.png' },
  { id: 11, name: 'Mike Nolan', gender: 'Male', age: 31, photo: '/Layer 7.png' },
  { id: 12, name: 'John Martinez', gender: 'Male', age: 59, photo: '/pexels-photo-1222271.png' },
];

const PatientList = () => {
  return (
    <div className="flex flex-col h-[100vh] w-1/5 bg-white shadow-md rounded-lg mx-4 my-4 p-4">
      <div className="flex justify-between items-center gap-x-6 mb-8">
        <h2 className="text-2xl font-semibold">Patients</h2>
          <Image 
            src={SearchIcon}
            alt="Search Icon" 
            width={20} 
            height={20} 
          />
      </div>

      <div className="overflow-y-auto space-y-4">
        {patients.map(patient => (
          <div key={patient.id} 
          className={`flex justify-between border-b border-gray-200 py-2  ${patient.id === 4 ? 'bg-[#D8FCF7]' : ''}`} 
          >            
          <div className="flex items-center">
              <Image 
                src={patient.photo} 
                alt={`${patient.name}'s photo`} 
                width={50} 
                height={50} 
                className="rounded-full mr-3" 
              />
              <div>
                <span className="block font-semibold">{patient.name}</span>
                <span className="block text-gray-500">{patient.gender}, {patient.age}</span>
              </div>
            </div>
            <button className="p-2">
              <Image 
                src={MoreInfo} 
                alt="More Info Icon" 
                width={30} 
                height={30} 
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;