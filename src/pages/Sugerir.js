import React, { useState, useEffect } from 'react';

const Sugerir = ({ onTruckSelect, onSuggestedTrucks }) => {
    const [trucks, setTrucks] = useState([]);
    const [weight, setWeight] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/trucks')
            .then(response => response.json())
            .then(data => setTrucks(data))
            .catch(error => console.error('Error fetching trucks:', error));
    }, []);

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleWeightSubmit = (e) => {
        e.preventDefault();
        const weightValue = parseFloat(weight);

        if (isNaN(weightValue) || weightValue <= 0) {
            alert('Por favor, ingrese un peso válido.');
            return;
        }

        // Filtrar camiones que tienen capacidad suficiente y están activos
        const availableTrucks = trucks.filter(truck => truck.capacidad >= weightValue && truck.estado === 'disponible');

        if (availableTrucks.length > 0) {
            onSuggestedTrucks(availableTrucks);
            setAlertMessage('');
        } else {
            onSuggestedTrucks([]);
            setAlertMessage('Lo sentimos, no hay camiones disponibles para esta carga.');
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Sugerir Camión Según Peso</h2>
            <form onSubmit={handleWeightSubmit} className="space-y-4">
                <div>
                    <label htmlFor="weight" className="block text-lg font-medium mb-2">Ingrese el peso (kg):</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={handleWeightChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Buscar Camiones
                </button>
            </form>

            {alertMessage && (
                <p className="text-red-500 mt-4">{alertMessage}</p>
            )}
        </div>
    );
};

export default Sugerir;
