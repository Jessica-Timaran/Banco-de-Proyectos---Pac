import { Select, SelectItem } from '@tremor/react';

export function Evaluar({ onChange }) {
  // Manejador de cambios para el Select
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mx-auto max-w-xs">
      <Select defaultValue="0" onValueChange={handleChange}>
        <SelectItem value="1">Aprobado</SelectItem>
        <SelectItem value="2">No aceptado</SelectItem>
      </Select>
    </div>
  );
}