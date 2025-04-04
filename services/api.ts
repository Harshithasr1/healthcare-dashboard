const API_BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev'

const getAuthHeaders = () => {
    const username = process.env.NEXT_PUBLIC_API_USERNAME
    const password = process.env.NEXT_PUBLIC_API_PASSWORD
    
    if (!username || !password) {
        throw new Error('API credentials not found in environment variables')
    }
    
    const base64Credentials = btoa(`${username}:${password}`)

    return {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const fetchPatientData = async () => {
    const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: getAuthHeaders()
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const jessicaData = data.find((patient: any) => patient.name === "Jessica Taylor")

    if (!jessicaData) {
        throw new Error('Jessica Taylor\'s data not found')
    }

    return jessicaData
}
