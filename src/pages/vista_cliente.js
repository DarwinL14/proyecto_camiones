import React, { useState, useEffect } from 'react';
import TruckCard from './TruckCard';
import Sugerir from './Sugerir';

const ciudades = {
    "Bogotá": {
        "Medellín": 420,
        "Cali": 440,
        "Cartagena": 1040,
        "Barranquilla": 960,
    },
    "Medellín": {
        "Cali": 310,
        "Cartagena": 640,
        "Barranquilla": 570,
    },
    "Cali": {
        "Cartagena": 770,
        "Barranquilla": 670,
    },
    "Cartagena": {
        "Barranquilla": 130,
    },
    "Barranquilla": {}
};

const COSTO_POR_KM = 2000;
const PRECIO_MINIMO = 800000;
const PRECIO_MAXIMO = 3000000;

const TruckForm = () => {
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [formData, setFormData] = useState({
        puntoDePartida: '',
        destino: '',
        description: '',
        precio: '',
        carga: ''
    });
    const [ciudadesOptions, setCiudadesOptions] = useState([]);
    const [destinosOptions, setDestinosOptions] = useState([]);
    const [camionesDisponibles, setCamionesDisponibles] = useState(true);
    const [suggestedTrucks, setSuggestedTrucks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/trucks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTrucks(data);
                setCamionesDisponibles(data.length > 0);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching trucks:', error);
                setError('No se pudieron cargar los camiones.');
                setCamionesDisponibles(false);
                setLoading(false);
            });

        setCiudadesOptions(Object.keys(ciudades));
    }, []);

    useEffect(() => {
        if (selectedTruck) {
            fetch(`http://localhost:5000/trucks/${selectedTruck}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setFormData(prevState => ({
                        ...prevState,
                        precio: calculatePrice(prevState.puntoDePartida, prevState.destino)
                    }));
                })
                .catch(error => console.error('Error fetching truck details:', error));
        }
    }, [selectedTruck]);

    const calculatePrice = (puntoDePartida, destino) => {
        if (!puntoDePartida || !destino) return '';

        const distancia = ciudades[puntoDePartida]?.[destino];
        if (distancia) {
            const precio = distancia * COSTO_POR_KM;
            return Math.min(Math.max(precio, PRECIO_MINIMO), PRECIO_MAXIMO);
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const newFormData = { ...prevState, [name]: value };

            if (name === 'puntoDePartida') {
                setDestinosOptions(Object.keys(ciudades[value] || {}));
                newFormData.precio = calculatePrice(value, formData.destino);
            } else if (name === 'destino' || name === 'puntoDePartida') {
                newFormData.precio = calculatePrice(newFormData.puntoDePartida, newFormData.destino);
            }

            return newFormData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
    
        const cargaValue = parseFloat(formData.carga);
        const selectedTruckData = trucks.find(truck => truck.id === selectedTruck);
    
        if (!selectedTruckData) {
            setError('Selecciona un camión válido.');
            return;
        }
    
        if (isNaN(cargaValue) || cargaValue <= 0) {
            setError('Por favor, ingrese una carga válida.');
            return;
        }
    
        if (cargaValue > selectedTruckData.capacidad) {
            setError('La carga excede la capacidad del camión seleccionado.');
            return;
        }
    
        const updatedData = {
            ...selectedTruckData,
            estado: 'ocupado',
            carga: cargaValue,
            puntoDePartida: formData.puntoDePartida,
            destino: formData.destino,
            description: formData.description,
            precio: formData.precio
        };
    
        fetch(`http://localhost:5000/trucks/${selectedTruck}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Camión agendado correctamente');
            setFormData({
                puntoDePartida: '',
                destino: '',
                description: '',
                precio: '',
                carga: ''
            });
            setSelectedTruck(null);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un problema al agendar el camión');
        });
    };    

    const handleTruckSelect = (truckId) => {
        setSelectedTruck(truckId);
    };

    const handleSuggestedTrucks = (trucks) => {
        setSuggestedTrucks(trucks);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">Bienvenido a EmpresaTransporte</h1>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">En este sitio podrás agendar tus camiones</h1>

            {loading && <p className="text-gray-500 text-center">Cargando...</p>}

            <div className="space-y-8">
                <Sugerir onTruckSelect={handleTruckSelect} onSuggestedTrucks={handleSuggestedTrucks} />

                {!camionesDisponibles && !loading && (
                    <p className="text-red-500 text-center">No hay camiones disponibles en este momento.</p>
                )}

                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {suggestedTrucks.length > 0 ? (
                        suggestedTrucks.map(truck => (
                            <TruckCard key={truck.id} truck={truck} onSelect={handleTruckSelect} />
                        ))
                    ) : (
                        trucks.map(truck => (
                            <TruckCard key={truck.id} truck={truck} onSelect={handleTruckSelect} />
                        ))
                    )}
                </div>

                {selectedTruck && camionesDisponibles && (
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        <div>
                            <label htmlFor="puntoDePartida" className="block text-lg font-medium mb-2">Punto de Partida:</label>
                            <select
                                id="puntoDePartida"
                                name="puntoDePartida"
                                value={formData.puntoDePartida}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Selecciona un punto de partida</option>
                                {ciudadesOptions.map(ciudad => (
                                    <option key={ciudad} value={ciudad}>
                                        {ciudad}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="destino" className="block text-lg font-medium mb-2">Destino:</label>
                            <select
                                id="destino"
                                name="destino"
                                value={formData.destino}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Selecciona un destino</option>
                                {destinosOptions.map(ciudad => (
                                    <option key={ciudad} value={ciudad}>
                                        {ciudad}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-lg font-medium mb-2">Descripción:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="carga" className="block text-lg font-medium mb-2">Carga (kg):</label>
                            <input
                                type="number"
                                id="carga"
                                name="carga"
                                value={formData.carga}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="precio" className="block text-lg font-medium mb-2">Precio:</label>
                            <input
                                type="text"
                                id="precio"
                                name="precio"
                                value={formData.precio}
                                readOnly
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Agendar Camión
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TruckForm;
