import { Title, Text, TabList, Tab, } from '@tremor/react';
import React, { useState } from 'react';
import { CardBase } from './CardBase';
import ChartDonut from './ChartDonut';
import { TableProject } from './TableProject';

const DashboardBase = () => {
  const [selectedView, setSelectedView] = useState(0);

  return (
    <main className="bg-slate-200 p-6 sm:p-10">
      <Title>Dashboard</Title>
      <Text>Ejemplo de Dashboard con Tremor y React</Text>
      

      <TabList 
        defaultIndex={selectedView} 
        onValueChange={value => setSelectedView(value)} 
        className="mt-6"
      >
        <Tab>Principal</Tab>
        <Tab>Detalles</Tab>
      </TabList>

      {selectedView === 0 ? (
        <>
          <CardBase />
          <div className="mt-6">
            <ChartDonut />
          </div>
        </>
      ) : (
        <>
          <div className="mt-6">
            <TableProject />
          </div>
        </>
      )}
    </main>
  );
};

export default DashboardBase;