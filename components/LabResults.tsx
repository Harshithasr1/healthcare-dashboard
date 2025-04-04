'use client'
import { Download } from 'lucide-react'
import { fetchPatientData } from '@/services/api'
import { useState, useEffect } from 'react'

interface LabResultsProps {
  labResults?: string[] 
}

const LabResults = ({ labResults: initialLabResults = [] }: LabResultsProps) => {
    const [labResults, setLabResults] = useState<string[]>(initialLabResults)
    const [isLoading, setIsLoading] = useState(initialLabResults.length === 0)

    useEffect(() => {
        if (initialLabResults.length === 0) {
            const loadData = async () => {
                try {
                    const patientData = await fetchPatientData()
                    console.log('Fetched lab results:', patientData.lab_results)
                    setLabResults(patientData.lab_results || [])
                } catch (err) {
                    console.error('Failed to load lab results:', err)
                } finally {
                    setIsLoading(false)
                }
            }
            loadData()
        }
    }, [initialLabResults])

    // Make sure we have a valid array to work with
    const validLabResults = Array.isArray(labResults) ? labResults : []
    
    const results = validLabResults.map((result, index) => ({
        result,
        isActive: (index === 1) ? true : false
    }))

    return (
        <div className="flex flex-col bg-white rounded-xl shadow-sm">
            <div className="px-5 py-4">
                <h2 className="text-2xl font-bold">Lab Results</h2>
            </div>
            
            <div className="space-y-2 p-4">
                {isLoading ? (
                    <p>Loading lab results...</p>
                ) : results.length > 0 ? (
                    results.map((result, index) => (
                        <div 
                            key={index}
                            className={`flex items-center justify-between p-4 rounded-md
                                ${result.isActive 
                                    ? 'bg-gray-200 hover:bg-gray-300' 
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center">
                                <h3 className="font-medium">{result.result}</h3>
                            </div>
                            <div className="flex items-center">
                                <Download className="w-5 h-5 text-gray-600 cursor-pointer" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No lab results available</p>
                )}
            </div>
        </div>
    )
}

export default LabResults
