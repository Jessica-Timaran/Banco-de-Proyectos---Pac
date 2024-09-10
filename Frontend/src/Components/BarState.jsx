import { Card, CategoryBar } from '@tremor/react';

export function BarState({ promedioFinal }) {
  const promedioRedondeado = Math.round(promedioFinal); // Redondea el promedio

  return (
    <>
      <Card className="mx-auto max-w-xl h-28">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>Nivel de aprobación</span>
          <span>{promedioRedondeado}%</span> {/* Muestra el promedio redondeado */}
        </p>
        <CategoryBar
          values={[30, 40, 30]}
          colors={['rose', 'yellow', 'emerald']}
          markerValue={promedioRedondeado}
          className="mt-3"
        />
      </Card>
    </>
  );
}