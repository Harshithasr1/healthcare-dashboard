"use client"
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ExpandMoreIcon from './icons/ExpandMore'
import ArrowUpIcon from './icons/ArrowUp'
import ArrowDownIcon from './icons/ArrowDown'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

import { historyCards } from "./utils/diagnosisData"
import type { DiagnosisHistory } from '@/services/types'
import { fetchPatientData } from '@/services/api'

const chartStyles = {
    systolic: {
        backgroundColor: 'rgba(230, 111, 210, 0.8)',
        borderColor: 'rgb(230, 111, 210)',
        borderWidth: 1,
    },
    diastolic: {
        backgroundColor: 'rgba(140, 111, 230, 0.8)',
        borderColor: 'rgb(140, 111, 230)',
        borderWidth: 1,
    }
}

// Updated chart options for bar chart
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
}

interface VitalSignCardProps {
    title: string
    value: number
    src: string
    width: number
    height: number
    alt: string
    levels: string
    bgColor: string
}

const VitalSignCard = ({ 
    title, 
    value, 
    src, 
    width, 
    height, 
    alt, 
    levels, 
    bgColor 
}: VitalSignCardProps) => {
    const getUnit = (title: string) => {
        switch(title) {
            case "Heart Rate":
            case "Respiratory Rate":
                return "bpm"
            case "Temperature":
                return "°F"
            default:
                return ""
        }
    }

    return (
        <div className={`p-4 rounded-xl flex-1 ${bgColor}`}>
            <div className="flex flex-col items-center">
                <div className="mb-3">
                    <img 
                        src={src} 
                        alt={alt}
                        width={width}
                        height={height}
                    />
                </div>
                <h4 className="text-gray-600 text-center font-medium">{title}</h4>
                <div className="text-2xl font-bold text-center mt-2">
                    {value} {getUnit(title)}
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                    {title === "Heart Rate" && <ArrowDownIcon />}
                    <span className="ml-1">{levels}</span>
                </div>
            </div>
        </div>
    )
}

interface HistoryProps {
    diagnosisHistory: DiagnosisHistory[]
}

const History = ({ diagnosisHistory: initialDiagnosisHistory }: HistoryProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [diagnosisHistory, setDiagnosisHistory] = useState(initialDiagnosisHistory)

    useEffect(() => {
        const loadData = async () => {
            try {
                const patientData = await fetchPatientData()
                setDiagnosisHistory(patientData.diagnosis_history)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load patient data')
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white shadow-md rounded-xl mx-4 my-4">
                <div className="animate-pulse text-gray-600">Loading patient data...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64 bg-white shadow-md rounded-xl mx-4 my-4">
                <div className="text-red-500">{error}</div>
            </div>
        )
    }

    if (!diagnosisHistory.length) {
        return (
            <div className="flex flex-col w-full bg-white shadow-md rounded-xl mx-4 my-4 p-4">
                <h2 className="text-2xl font-bold mb-6">Diagnosis History</h2>
                <div className="flex justify-center items-center h-48">
                    <div className="text-gray-600">No diagnosis history available</div>
                </div>
            </div>
        )
    }
    
    const getAverageValue = (values: number[]) => {
        if (!values.length) return 0
        return Math.floor(values.reduce((acc, val) => acc + val, 0) / values.length)
    }
    
    const diastolics = diagnosisHistory.map(h => h.blood_pressure.diastolic.value).reverse()
    const systolics = diagnosisHistory.map(h => h.blood_pressure.systolic.value).reverse()
    const respiratoryRates = diagnosisHistory.map(h => h.respiratory_rate.value).reverse()
    const heartRates = diagnosisHistory.map(h => h.heart_rate.value).reverse()
    const temperatureRates = diagnosisHistory.map(h => h.temperature.value).reverse()

    const averages = {
        systolic: getAverageValue(systolics),
        diastolic: getAverageValue(diastolics),
        respiratory: getAverageValue(respiratoryRates),
        heart: getAverageValue(heartRates),
        temperature: getAverageValue(temperatureRates)
    }

    const labels = diagnosisHistory.map(h => `${h.month.slice(0,3)}, ${h.year}`).reverse()
    
    interface ChartDataset {
        data: number[]
        label: string
        barPercentage: number
        categoryPercentage: number
        backgroundColor: string
        borderColor: string
        borderWidth: number
    }

    const chartData = {
        labels,
        datasets: [
            {
                ...chartStyles.diastolic,
                data: diastolics,
                label: 'Diastolic',
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            } as ChartDataset,
            {
                ...chartStyles.systolic,
                data: systolics,
                label: 'Systolic',
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            } as ChartDataset
        ]
    }

    const vitalSignsData = historyCards.map(card => {
        let currentValue = 0
        switch(card.title) {
            case "Respiratory Rate":
                currentValue = averages.respiratory
                break
            case "Temperature":
                currentValue = averages.temperature
                break
            case "Heart Rate":
                currentValue = averages.heart
                break
        }
        return {...card, value: currentValue}
    })

    return (
        <div className="flex flex-col w-full bg-white shadow-md rounded-xl mx-4 my-4 p-4">
            <h2 className="text-2xl font-bold mb-6">Diagnosis History</h2>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Blood Pressure</h3>
                    <button className="flex items-center text-sm">
                        Last 6 Months <ExpandMoreIcon />
                    </button>
                </div>
                <div className="flex">
                    <div className="w-3/4">
                        <Bar options={options} data={chartData} />
                    </div>
                    <div className="w-1/4 flex flex-col justify-center gap-6 pl-4">
                        <div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-pink-400 mr-2"></div>
                                <span>Systolic: {averages.systolic}</span>
                            </div>
                            <div className="flex items-center text-green-500 text-sm mt-1">
                                <ArrowUpIcon /> Higher than average
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                                <span>Diastolic: {averages.diastolic}</span>
                            </div>
                            <div className="flex items-center text-red-500 text-sm mt-1">
                                <ArrowDownIcon /> Lower than average
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                {vitalSignsData.map((card, index) => (
                    <VitalSignCard 
                        key={index}
                        {...card}
                    />
                ))}
            </div>
        </div>
    )
}

export default History