import { Label } from '@/components/ui/label';
import { Badge } from '../ui/badge';

export default function MultiInput({
  label,
  error,
  placeholder,
  value,
  onChange,
}: Readonly<{
  label: string;
  error?: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
}>) {
  const handleAddValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      e.currentTarget.value &&
      e.currentTarget.value.trim() !== '' &&
      !value.includes(e.currentTarget.value)
    ) {
      onChange([...value, e.currentTarget.value.trim()]);
      e.currentTarget.value = '';
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'ArrowRight') {
      handleAddValue(e);
    }
    if (e.key === 'Backspace' && value.length !== 0 && !e.currentTarget.value) {
      e.preventDefault();
      handleRemoveValue(value[value.length - 1]);
    }
  };

  const handleRemoveValue = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div>
      <Label>{label}</Label>
      <div
        className="flex flex-row gap-2 border-[1px] border-[rgb(107 114 128)] rounded-xl 
       p-2 px-2.5 bg-black flex-wrap focus-within:border-[1px]
        focus-within:border-white focus-within:border-solid"
      >
        {value.map((item, index) => (
          <Badge
            key={`${item}-${index}`}
            className="cursor-pointer bg-slate-500 text-white rounded-full px-2 py-1"
            onClick={() => handleRemoveValue(item)}
          >
            {item}
          </Badge>
        ))}
        <input
          className="border-0 outline-none bg-black focus:outline-none text-sm flex-1 text-white placeholder:text-muted-foreground placeholder:opacity-30"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
