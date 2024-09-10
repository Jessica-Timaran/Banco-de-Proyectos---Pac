'use client';
import React, { useState } from 'react';
import { Tab, TabGroup, TabList } from '@tremor/react';

export function Evaluar({ onChange }) {
  const [selectedTab, setSelectedTab] = useState(null); // Estado para la pestaña seleccionada

  // Manejador de cambios para las pestañas
  const handleTabClick = (value) => {
    setSelectedTab(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-12">
      <TabGroup>
        <TabList variant="line">
          <Tab
            value="1"
            onClick={() => handleTabClick("1")}
            className={selectedTab === "1" ? "bg-green-500 text-white rounded-md" : ""}
          >
            Aprobado
          </Tab>
          <Tab
            value="2"
            onClick={() => handleTabClick("2")}
            className={selectedTab === "2" ? "bg-red-500 text-white rounded-md" : ""}
          >
            No aceptado
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  );
}