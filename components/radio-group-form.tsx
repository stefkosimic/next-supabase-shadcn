import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  label?: string;
  infoText?: string;
  name: string;
  selected: string;
  customClassName?: string;
  options: any[];
  showPrice?: boolean;
  displayFreeText?: boolean;
  onChange: any;
}

export function RadioGroupForm({
  label,
  name,
  selected,
  infoText,
  customClassName,
  onChange,
  options,
}: Props) {
  return (
    <div className="flex flex-col pt-4">
      {label && <Label className="pb-3 font-bold">{label}</Label>}
      {infoText && <p className="text-muted-foreground text-sm">{infoText}</p>}
      <RadioGroup
        name={name}
        onValueChange={onChange}
        className={
          customClassName ||
          "grid grid-cols-2 place-items-start gap-4 md:grid-cols-3"
        }
        value={selected}
      >
        {options.map((option: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`r${option.value}`} />
            <Label htmlFor={`r${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
