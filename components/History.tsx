import React from 'react';
import Image from 'next/image';
import Respiratory from '/public/respiratory rate.svg'
import Temperature from '/public/temperature.svg'
import HeartRate from '/public/HeartBPM.svg'
import ExpandMore from 'public/expand_more_FILL0_wght300_GRAD0_opsz24.svg'
import ArrowUp from '/public/ArrowUp.png';
import ArrowDown from '/public/ArrowDown.png';

const History = () => {
    return (
        <div className="flex flex-col h-[66vh] w-200 bg-white shadow-md rounded-lg mx-4 my-4 p-4">
        <div className="flex items-center pb-10">
            <h2 className="text-2xl font-bold" >Diagnosis History</h2>
        </div> 
        <section className='grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-y-12 bg-blue-50 px-5 pt-2 rounded-xl' >
          <div className='grid col-span-2 row-span-1 gap-y-8 lg:gap-0'>
            <div className='grid grid-cols-2 grid-rows-1' >
                <h2 className="flex items-center text-xl font-medium">Blood Pressure</h2>
                <div className='grid grid-cols-1 text-sm md:mr-0 lg:mr-8'>
                    <p className='flex justify-end items-center'>
                        Last 6 Months <span className='ml-3'>expand</span>
                    </p>
                </div>
            </div>
            
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full grid grid-cols-1 grid-rows-3 text-md font-medium mb-4'>
                <div className='flex items-center'>
                    <div className=' w-4 h-4 mr-2 bg-pink-400 rounded-full' ></div>
                    Systolic
                </div>
                <h3 className="py-1 flex items-center text-2xl font-medium">systolicAverage</h3>
                <div className='flex items-center'>
                    ArrowUp
                    <p className='ml-1 font-extralight'>Higher than Average</p>
                </div>
            </div>
            <div className='h-px w-full mr-2 bg-gray-400 mb-4' ></div>
            <div className='w-full grid grid-cols-1 grid-rows-3 text-md font-medium'>
                <div className='flex items-center'>
                    <div className='w-4 h-4 mr-2 bg-purple-400 rounded-full' ></div>
                    Diastolic
                </div>
                <h3 className="py-1 flex items-center text-2xl font-medium">diastolicAverage</h3>
                <div className='flex items-center'>
                <Image src={ArrowDown} alt="Arrow down" width={20} height={20} />  
                <p className='ml-2 font-extralight'>Lower than Average</p>
                </div>
            </div>
          </div>
        </section>

         <section className='grid grid-cols-3 gap-4 mt-4 px-1'>
            {/* Respiratory Rate */}
            <div className='bg-blue-100 p-4 rounded-xl'>
                <Image src={Respiratory} alt="Respiratory Rate" width={70} height={70} />
                <h3 className='text-lg font-medium mb-2'>Respiratory Rate</h3>
                <p className='text-3xl font-bold mb-4'>18 bpm</p>
                <p className='text-lg font-medium'>Normal</p>
            </div>

            {/* Temperature */}
            <div className='bg-rose-100 p-4 rounded-xl'>
            <Image src={Temperature} alt="Temperature" width={70} height={70} />
                <h3 className='text-lg font-medium mb-2'>Temperature</h3>
                <p className='text-3xl font-bold mb-4'>98.6 °F</p>
                <p className='text-lg font-medium'>Normal</p>
            </div>

            {/* Heart Rate */}
            <div className='bg-red-300 p-4 rounded-xl'>
            <Image src={HeartRate} alt="Heart Rate" width={70} height={70} />  
                <h3 className='text-lg font-medium mb-2'>Heart Rate</h3>
                <p className='text-3xl font-bold mb-4'>72 bpm</p>
                <div className='flex items-center mb-2'>
                    <Image src={ArrowDown} alt="Arrow down" width={20} height={20} />  
                    <p className='ml-2 text-lg font-medium'>Lower than Average</p>
                </div>
            </div>
        </section>
    </div>
    );
};

export default History;