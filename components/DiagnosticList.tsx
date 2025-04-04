'use client'

import React, { useState, useEffect } from 'react';
import { Diagnostic } from '@/services/types';
import { fetchPatientData } from '@/services/api';

const DiagnosticList: React.FC<{ diagnostics?: Diagnostic[] }> = ({ diagnostics: propDiagnostics }) => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // If diagnostics are provided as props, use them
        if (propDiagnostics && propDiagnostics.length > 0) {
          setDiagnostics(propDiagnostics);
        } else {
          // Otherwise fetch from API
          const patientData = await fetchPatientData();
          setDiagnostics(patientData.diagnostics);
        }
      } catch (err) {
        console.error('Failed to load diagnostics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [propDiagnostics]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full bg-white shadow-md rounded-xl mx-4 my-4 p-4">
        <h3 className="text-2xl font-bold mb-6">Diagnostic List</h3>
        <p className="text-gray-500">Loading diagnostics...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white shadow-md rounded-xl mx-4 my-4 p-4">
      <h3 className="text-2xl font-bold mb-6">Diagnostic List</h3>
      <div className="flex">
        <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '250px' }}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-gray-200 rounded-l-full py-3 px-4 text-left font-semibold text-lg">Problem/Diagnosis</th>
                <th className="bg-gray-200 py-3 px-4 text-left font-semibold text-lg">Description</th>
                <th className="bg-gray-200 rounded-r-full py-3 px-4 text-left font-semibold text-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {(diagnostics || []).length > 0 ? (
                diagnostics.map((item: Diagnostic, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-md">{item.name || 'Unnamed Test'}</td>
                    <td className="py-3 px-4 text-md">{item.description || 'No description'}</td>
                    <td className="py-3 px-4 text-md">{item.status || 'Unknown'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-3 px-4 text-center text-gray-500">
                    No diagnostic tests available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticList;
