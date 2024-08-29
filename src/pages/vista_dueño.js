import React, { useEffect, useState } from "react";

// URL de la imagen por defecto para los camiones
const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMwDDTPLpAyN_fFBikf6bf80Y_qb7p50A9cA&s";

function VistaD() {
    const [trucks, setTrucks] = useState([]);
    const [selectedTruckId, setSelectedTruckId] = useState(null);
    const [loadValue, setLoadValue] = useState("");
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [newTruck, setNewTruck] = useState({
        matricula: "",
        capacidad: "",
        consumo: "",
        estado: "disponible", // Valor predeterminado para el estado
        imagen: defaultImageUrl, // Imagen por defecto
        carga: 0
    });

    useEffect(() => {
        fetch("http://localhost:5000/trucks")
            .then(response => response.json())
            .then(data => {
                console.log("Trucks fetched:", data);
                setTrucks(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleLoadChange = (e) => {
        setLoadValue(e.target.value);
    };

    const handleLoad = (truckId) => {
        const load = parseFloat(loadValue) || 0;
        if (load <= 0) {
            alert('Ingrese una cantidad válida de carga.');
            return;
        }
        const truck = trucks.find(t => t.id === truckId);
        if (truck) {
            truck.CargaActual = (parseFloat(truck.CargaActual) || 0) + load;
            fetch(`http://localhost:5000/trucks/${truckId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(truck),
            })
            .then(response => response.json())
            .then(data => {
                setTrucks(trucks.map(t => t.id === truckId ? data : t));
                setLoadValue("");
            })
            .catch(error => console.error("Error updating data:", error));
        }
    };

    const handleUnload = (truckId) => {
        const unload = parseFloat(loadValue) || 0;
        if (unload <= 0) {
            alert('Ingrese una cantidad válida para descargar.');
            return;
        }
        const truck = trucks.find(t => t.id === truckId);
        if (truck) {
            if ((parseFloat(truck.CargaActual) || 0) - unload < 0) {
                alert('No se puede descargar más de lo que hay en el camión.');
                return;
            }
            truck.CargaActual = (parseFloat(truck.CargaActual) || 0) - unload;
            fetch(`http://localhost:5000/trucks/${truckId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(truck),
            })
            .then(response => response.json())
            .then(data => {
                setTrucks(trucks.map(t => t.id === truckId ? data : t));
                setLoadValue("");
            })
            .catch(error => console.error("Error updating data:", error));
        }
    };

    const handleNewTruckChange = (e) => {
        setNewTruck({
            ...newTruck,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterTruck = (e) => {
        e.preventDefault();
        if (!newTruck.matricula || !newTruck.capacidad || !newTruck.consumo) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        fetch("http://localhost:5000/trucks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTruck),
        })
        .then(response => response.json())
        .then(data => {
            setTrucks([...trucks, data]);
            setNewTruck({
                matricula: "",
                capacidad: "",
                consumo: "",
                estado: "disponible", // Restablecer estado a "disponible"
                imagen: defaultImageUrl // Restablecer imagen por defecto
            });
            setShowRegisterForm(false);
        })
        .catch(error => console.error("Error registering truck:", error));
    };

    const handleDeleteTruck = (truckId) => {
        if (window.confirm('¿Está seguro de que desea eliminar este camión?')) {
            fetch(`http://localhost:5000/trucks/${truckId}`, {
                method: 'DELETE',
            })
            .then(() => {
                setTrucks(trucks.filter(t => t.id !== truckId));
            })
            .catch(error => console.error("Error deleting truck:", error));
        }
    };

    const handleToggleDetails = (truckId) => {
        setSelectedTruckId(selectedTruckId === truckId ? null : truckId);
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Camiones</h1>
            {trucks.length === 0 ? (
                <p className="text-gray-700">No hay camiones disponibles.</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {trucks.map((truck) => (
                        <div key={truck.id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                            <img src={truck.imagen || defaultImageUrl} alt="Camión" className="w-full h-32 object-cover rounded-t-lg mb-3" />
                            <div className="p-3">
                                <h5 className="text-lg font-bold text-gray-800">Camión {truck.matricula}</h5>
                                {selectedTruckId === truck.id && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">Capacidad: {truck.capacidad} Kg</p>
                                        <p className="text-sm text-gray-600">Consumo: {truck.consumo}</p>
                                        <p className="text-sm text-gray-600">Estado: {truck.estado}</p>
                                        <p className="text-sm text-gray-600">Carga Actual: {truck.CargaActual || "0"} Kg</p>
                                    </div>
                                )}
                                <div className="flex justify-center space-x-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleDetails(truck.id)}
                                        className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-xs px-4 py-2 text-center"
                                    >
                                        {selectedTruckId === truck.id ? 'Ocultar Detalles' : 'Detalles'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteTruck(truck.id)}
                                        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-xs px-4 py-2 text-center"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button
                type="button"
                onClick={() => setShowRegisterForm(true)}
                className="text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-4"
            >
                Registrar más camiones
            </button>
            {showRegisterForm && (
                <form onSubmit={handleRegisterTruck} className="max-w-md bg-white border border-gray-300 rounded-lg shadow-md p-6">
                    <h5 className="mb-4 text-xl font-bold text-gray-800">Registrar Nuevo Camión</h5>
                    <label htmlFor="matricula" className="block mb-2 text-sm text-gray-700">Matricula</label>
                    <input
                        type="text"
                        id="matricula"
                        name="matricula"
                        value={newTruck.matricula}
                        onChange={handleNewTruckChange}
                        required
                        className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <label htmlFor="capacidad" className="block mb-2 text-sm text-gray-700">Capacidad (Kg)</label>
                    <input
                        type="number"
                        id="capacidad"
                        name="capacidad"
                        value={newTruck.capacidad}
                        onChange={handleNewTruckChange}
                        required
                        className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                                        <label htmlFor="consumo" className="block mb-2 text-sm text-gray-700">Consumo</label>
                    <input
                        type="text"
                        id="consumo"
                        name="consumo"
                        value={newTruck.consumo}
                        onChange={handleNewTruckChange}
                        required
                        className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Registrar Camión
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowRegisterForm(false)}
                        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                    >
                        Cancelar
                    </button>
                </form>
            )}
        </div>
    );
}

export default VistaD;

