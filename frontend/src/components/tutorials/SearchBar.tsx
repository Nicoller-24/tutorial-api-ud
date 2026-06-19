import { Input } from "../ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-md">
      <Input
        label="Buscar por título"
        placeholder="Ej: FastAPI, Python..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
