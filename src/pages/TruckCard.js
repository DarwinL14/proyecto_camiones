import React from 'react';

const TruckCard = ({ truck, onSelect }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
            <img src={truck.imagen} alt={truck.nombre} className="w-full object-cover rounded-md mb-4" />
            <h2 className="text-xl font-bold mb-2">{truck.nombre}</h2>
            <p><strong>Matrícula:</strong> {truck.matricula}</p>
            <p><strong>Capacidad:</strong> {truck.capacidad} kg</p>
            <p><strong>Carga Actual:</strong> {truck.carga} kg</p>
            <p><strong>Estado:</strong> {truck.estado}</p>
            <button
                onClick={() => onSelect(truck.id)}
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
                Seleccionar
            </button>
        </div>
    );
};

export default TruckCard;
