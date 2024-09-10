'use client';

import { Tab, TabGroup, TabList, Card } from '@tremor/react';
import React, { useState } from 'react';

export const TabState = ({ Text1, Text2 }) => {
  const [selectedView, setSelectedView] = useState(0);

  return (
    <div className="max-w-sm mt-5">
      <TabGroup defaultIndex={selectedView}>
        <TabList 
          variant="line" 
          handleSelect={(value) => setSelectedView(value)} 
          defaultValue={selectedView} 
          className='mt-6'
        >
          <Tab value={0}>{Text1}</Tab>
          <Tab value={1}>{Text2}</Tab>
        </TabList>
      </TabGroup>

      {/* {selectedView === 0 ? (
        <Card>
          <div className='h-28 bg-emerald-300' />
        </Card>
      ) : (
        <Card>
          <div className='h-28 bg-blue-700' />
        </Card>
      )} */}
    </div>
  );
};