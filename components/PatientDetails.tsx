'use client'
import CalendarTodayIcon from "./icons/CalendarIcon";
import FemaleIcon from "./icons/FemaleIcon";
import InsuranceIcon from "./icons/InsuranceIcon";
import PhoneIcon from "./icons/PhoneIcon";
import { formatDate } from "./utils/formatDate";
import type { PatientProfile } from "@/services/types";

interface PatientDetailsProps {
  patient: PatientProfile;
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const formattedDate = patient.date_of_birth ? formatDate(new Date(patient.date_of_birth)) : 'Not available';
  
  return (        
    <section role="list" className="flex flex-col p-5 bg-white rounded-xl shadow-sm divide-y divide-gray-100">
        <div className="grid grid-cols-1 justify-items-center gap-6 pb-4">
              <img className="pt-4 w-1/3" src={patient.profile_picture} alt="" />
              <h2 className="text-2xl font-medium" >{patient.name}</h2>
              <div className="w-full grid grid-cols-6 gap-8 grid-rows-1" >
                  <div className="col-span-1 text-center m-auto bg-gray-100 p-4 rounded-full">
                      <CalendarTodayIcon />
                  </div>
                  <div className="col-span-5" >
                      <h3 className=" font-light" >Date Of Birth</h3>
                      <p className=" font-semibold">{formattedDate}</p>
                  </div>
                  <div className="col-span-1 text-center m-auto bg-gray-100 p-0.5 rounded-full">
                      <FemaleIcon />
                  </div>
                  <div className="col-span-5" >
                      <h3 className=" font-light" >Gender</h3>
                      <p className=" font-semibold">{patient.gender}</p>
                  </div>
                  <div className="col-span-1 text-center m-auto bg-gray-100 p-0.5 rounded-full">
                      <PhoneIcon />
                  </div>
                  <div className="col-span-5" >
                      <h3 className=" font-light" >Contact Info.</h3>
                      <p className=" font-semibold">{patient.phone_number}</p>
                  </div>
                  <div className="col-span-1 text-center m-auto bg-gray-100 p-0.5 rounded-full">
                      <PhoneIcon />
                  </div>
                  <div className="col-span-5" >
                      <h3 className=" font-light" >Emergency Contacts</h3>
                      <p className=" font-semibold">{patient.emergency_contact}</p>
                  </div>
                  <div className="col-span-1 text-center m-auto bg-gray-100 p-0.5 rounded-full">
                      <InsuranceIcon />
                  </div>
                  <div className="col-span-5" >
                      <h3 className=" font-light" >Insurance Provider</h3>
                      <p className=" font-semibold">{patient.insurance_type}</p>
                  </div>
              </div>
              <button className="mt-8 justify-self-center bg-teal-300 hover:bg-teal-500 text-black font-semibold px-12 py-4 rounded-full">
                  Show All Information
              </button>
          </div> 
      </section>
  );
}
export default PatientDetails;