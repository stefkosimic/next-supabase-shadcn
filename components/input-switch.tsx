import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function InputSwitch({ checked, onChange, label }: any) {
  return (
    <div className="flex items-center space-x-2 py-4">
      <Switch checked={checked} onCheckedChange={onChange} id="airplane-mode" />
      <Label htmlFor="airplane-mode">{label}</Label>
    </div>
  );
}
