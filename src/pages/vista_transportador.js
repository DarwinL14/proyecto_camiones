import React, { useState, useEffect } from 'react';

const TransportadorDashboard = () => {
    const [trucks, setTrucks] = useState([]);
    const [error, setError] = useState('');
    const [selectedTruck, setSelectedTruck] = useState(null); // Estado para camión seleccionado

    useEffect(() => {
        fetch('http://localhost:5000/trucks')  // Cambia esta URL a la que se ajuste a tu API
            .then(response => response.json())
            .then(data => setTrucks(data))
            .catch(error => {
                console.error('Error fetching trucks:', error);
                setError('Error al cargar los camiones.');
            });
    }, []);

    const handleStartTrip = (truckId) => {
        fetch(`http://localhost:5000/trucks/${truckId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'ocupado' }),
        })
        .then(response => response.json())
        .then(() => {
            setTrucks(trucks.map(truck =>
                truck.id === truckId ? { ...truck, estado: 'ocupado' } : truck
            ));
            setSelectedTruck(trucks.find(truck => truck.id === truckId)); // Establecer camión seleccionado
        })
        .catch(error => {
            console.error('Error starting trip:', error);
            setError('Error al iniciar el viaje.');
        });
    };

    const handleEndTrip = (truckId) => {
        fetch(`http://localhost:5000/trucks/${truckId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                estado: 'disponible', 
                carga: 0 
            }), // Cambiar estado a "activo" y carga a 0
        })
        .then(response => response.json())
        .then(() => {
            setTrucks(trucks.map(truck =>
                truck.id === truckId ? { ...truck, estado: 'disponible', carga: 0 } : truck
            ));
            setSelectedTruck(null); // Limpiar camión seleccionado
        })
        .catch(error => {
            console.error('Error ending trip:', error);
            setError('Error al finalizar el viaje.');
        });
    };

    if (selectedTruck) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Detalles del Viaje</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-2">Camión: {selectedTruck.matricula}</h2>
                    <p><span className="font-bold">Capacidad:</span> {selectedTruck.capacidad} kg</p>
                    <p><span className="font-bold">Punto de Partida:</span> {selectedTruck.puntoDePartida}</p>
                    <p><span className="font-bold">Destino:</span> {selectedTruck.destino}</p>
                    <p><span className="font-bold">Descripción:</span> {selectedTruck.description}</p>
                    <p><span className="font-bold">Carga:</span> {selectedTruck.carga} kg</p>
                    <p><span className="font-bold">Precio:</span> {selectedTruck.precio} COP</p>

                    <button
                        onClick={() => handleEndTrip(selectedTruck.id)}
                        className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Finalizar Viaje
                    </button>
                </div>

                {/* Estadísticas de Carga */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Estadísticas de Carga</h3>
                    <p><span className="font-bold">Carga Actual:</span> {selectedTruck.carga} kg</p>
                    <p><span className="font-bold">Capacidad Total:</span> {selectedTruck.capacidad} kg</p>
                    <p><span className="font-bold">Porcentaje de Carga:</span> {((parseFloat(selectedTruck.carga) / parseFloat(selectedTruck.capacidad)) * 100).toFixed(2)}%</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Dashboard del Transportador</h1>
            
            {error && (
                <p className="text-red-500 text-center">{error}</p>
            )}

            <div className="space-y-6">
                {trucks.length === 0 ? (
                    <p className="text-center">No hay camiones disponibles.</p>
                ) : (
                    <ul className="space-y-4">
                        {trucks.filter(truck => truck.estado === 'ocupado').map(truck => (
                            <li key={truck.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Camión: {truck.matricula}</h2>
                                <p><span className="font-bold">Capacidad:</span> {truck.capacidad} kg</p>
                                <p><span className="font-bold">Punto de Partida:</span> {truck.puntoDePartida}</p>
                                <p><span className="font-bold">Destino:</span> {truck.destino}</p>
                                <p><span className="font-bold">Descripción:</span> {truck.description}</p>
                                <p><span className="font-bold">Carga:</span> {truck.carga} kg</p>
                                <p><span className="font-bold">Precio:</span> {truck.precio} COP</p>
                                
                                <button
                                    onClick={() => handleStartTrip(truck.id)}
                                    className="mt-2 w-full py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Iniciar Viaje
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TransportadorDashboard;
