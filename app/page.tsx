import PatientList from "@/components/PatientList";
import History from "@/components/History";
import DiagnosticList from "@/components/DiagnosticList";
import PatientDetails from "@/components/PatientDetails";
import LabResults from "@/components/LabResults";
import { fetchPatientData } from "@/services/api";
import type { DiagnosisHistory, Diagnostic, Patient, PatientProfile } from "@/services/types";

function getPatientData<T extends Record<string, any>>(patient: T): Partial<T> {
  const profile: Partial<T> = {};

  Object.keys(patient).forEach((key) => {
    const value = patient[key];
    if (value && !Array.isArray(value) && typeof value !== 'object') {
      (profile as any)[key] = value;
    }
  });
  return profile;
}

export default async function Home() {
  const patientData = await fetchPatientData();
  
  let patient: Patient | undefined;
  
  if (Array.isArray(patientData)) {
    patient = patientData.find((p) => p.name?.includes("Jessica Taylor"));
  } else if (patientData && typeof patientData === 'object' && patientData.name?.includes("Jessica Taylor")) {
    patient = patientData as Patient;
  }

  let profile: PatientProfile = {} as PatientProfile;
  let diagnosisHistory: DiagnosisHistory[] = [];
  let diagnosticList: Diagnostic[] = [];
  let labResults: string[] = [];

  if (patient) {
    profile = getPatientData(patient) as PatientProfile;

    if (Array.isArray(patient.diagnosis_history)) {
      diagnosisHistory = patient.diagnosis_history;
    }

    if (Array.isArray(patient.diagnostic_list)) {
      diagnosticList = patient.diagnostic_list;
    } else {
      console.warn("diagnostic_list is not an array:", patient.diagnostic_list);
    }

    if (Array.isArray(patient.lab_results)) {
      labResults = patient.lab_results;
    }
  } else {
    console.warn("Patient 'Jessica Taylor' not found");
  }
  
  return (
    <main className="flex flex-wrap justify-between lg:grid lg:grid-cols-4 lg:gap-8 min-h-screen mx-2 mr-6">
      <section className="mb-8 col-span-1">
        <PatientList />
      </section>
      
      <section className="mb-8 col-span-2 -ml-4">
        <div className="grid grid-cols-1 gap-4">
          <History diagnosisHistory={diagnosisHistory} />
          <DiagnosticList diagnostics={diagnosticList} />
        </div>
      </section>

      <section className="mb-8 col-span-1">
        <div className="grid grid-cols-1 gap-8">
          <PatientDetails patient={profile} />
          <LabResults labResults={labResults} />
        </div>
      </section>
    </main>
  );
}