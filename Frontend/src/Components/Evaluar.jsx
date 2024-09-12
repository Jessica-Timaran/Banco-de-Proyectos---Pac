'use client';
import React, { useState, useEffect } from 'react';
import { Tab, TabGroup, TabList } from '@tremor/react';

export function Evaluar({ onChange, initialValue }) {
  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    if (initialValue) {
      setSelectedTab(initialValue);
    }
  }, [initialValue]);

  const handleTabClick = (value) => {
    setSelectedTab(value);
    onChange(value);
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