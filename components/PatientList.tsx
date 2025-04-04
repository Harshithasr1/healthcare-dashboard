import Image from "next/image";
import SearchIcon from "./icons/SearchIcon";
import MenuIcon from "./icons/MenuIcon";
import { patients } from "./utils/patientData";

const PatientList = () => {
  return (
    <div className="flex-1 bg-white shadow-lg rounded-xl m-4 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <SearchIcon />
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-12rem)] space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {patients.map((patient, index) => (
          <div
            key={index}
            className={
              patient?.isActive
                ? "flex justify-between gap-x-6 p-5 items-center bg-gray-200 rounded-lg"
                : "flex justify-between gap-x-6 p-5 items-center hover:bg-gray-50 rounded-lg"
            }
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-gray-50">
                <Image
                  className="rounded-full"
                  src={patient?.image || ''}
                  alt={patient?.name || ''}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {patient?.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {patient?.gender}, {patient?.age}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MenuIcon />
            </button>
          </div>
        ))}      
      </div>
    </div>
  );
};

export default PatientList;