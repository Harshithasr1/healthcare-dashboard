import React from 'react';

const DiagnosticList = () => {
    const diagnosticData = [
        {
            problem: "Hypertension",
            description: "Chronic high blood pressure",
            status: "Under Observation"
        },
        {
            problem: "Type 2 Diabetes",
            description: "Insulin resistance and elevated blood sugar",
            status: "Cured"
        },
        {
            problem: "Asthma",
            description: "Recurrent episodes of bronchial constriction",
            status: "Inactive"
        },
        {
            problem: "Osteoarthritis",
            description: "Degenerative joint disease",
            status: "Untreated"
        },
        {
            problem: "Allergic Rhinitis",
            description: "Seasonal allergies causing nasal congestion",
            status: "Active"
        }
    ];

    return (
        <div className="flex flex-col w-200 bg-white shadow-md rounded-lg mx-4 my-4 p-4">
            <h3 className="text-2xl font-bold mb-6">Diagnostic List</h3>
            
            <div className="flex">
                <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '250px' }}>
                <table className="w-full">
                        <thead>
                            <tr>
                                <th className="bg-gray-100 rounded-l-full py-3 px-4 text-left font-semibold text-lg">Problem/Diagnosis</th>
                                <th className="bg-gray-100 py-3 px-4 text-left font-semibold text-lg">Description</th>
                                <th className="bg-gray-100 rounded-r-full py-3 px-4 text-left font-semibold text-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diagnosticData.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-4 text-md">{item.problem}</td>
                                    <td className="py-3 px-4 text-md">{item.description}</td>
                                    <td className={`py-3 px-4 text-${getStatusColor(item.status)} font-medium`}>
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-2 bg-gray-200 rounded-full">
                    <div className="w-2 h-24 bg-gray-400 rounded-full cursor-pointer hover:bg-gray-500 transition-colors"></div>
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (status: string): string => {
    switch (status) {
        case "Under Observation":
            return "yellow-600";
        case "Cured":
            return "green-600";
        case "Inactive":
            return "blue-600";
        case "Untreated":
            return "red-600";
        case "Active":
            return "purple-600";
        default:
            return "gray-600";
    }
};

export default DiagnosticList;
