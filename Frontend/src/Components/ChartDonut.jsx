import { DonutChart } from '@tremor/react';


const datahero = [
  { name: 'Proyectos recibidos', value: 980 },
  { name: 'Proyectos rechazados', value: 4567 },
  { name: 'Proyectos aceptados', value: 3908 },
  { name: 'Proyectos devueltos', value: 2400 },
  { name: 'Proyectos por revisar', value: 2174 },
];

const dataFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number)}`;

export const ChartDonut = () => {
  return (
    <div className="mx-auto space-y-12">
      {/* Donut Chart */}
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Donut Variant
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(value) => console.log(value)}
            colors={["yellow", "red" , "indigo" , "blue" , "green"]}
          />
        </div>
      </div>
      {/* Pie Chart */}

    </div>
  );
};