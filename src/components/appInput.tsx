import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  label?: string;
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder: string;
  error?: string;
}

export default function AppInput({
  label,
  name,
  type,
  onChange,
  value,
  placeholder,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        name={name}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
