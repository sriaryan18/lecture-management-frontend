import { ComponentPropsWithoutRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BaseInput extends ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  error?: string | null;
}

export const BaseInput = ({ label, ...props }: BaseInput) => (
  <div className="space-y-1">
    {label && <Label className="ml-1 ">{label}</Label>}
    <Input {...props} />
    {props.error && <p className="text-red-500 text-xs mt-1">{props.error}</p>}
  </div>
);
