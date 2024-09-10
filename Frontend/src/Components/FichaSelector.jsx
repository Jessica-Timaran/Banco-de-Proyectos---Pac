import React from 'react';

const FichaSelector = ({ fichas, selectedFicha, onChange, displayField }) => {
    return (
        <div className="mb-8 max-w-md mx-auto">
            <select
                className="w-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                value={selectedFicha}
                onChange={onChange}
            >
                <option value="">Seleccione una ficha</option>
                {fichas.map(ficha => (
                    <option key={ficha.idficha} value={ficha.idficha}>
                        {ficha[displayField]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FichaSelector;