import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { userFields } from "@/types/api";
import { formatCEP, formatCPF } from "@/utils/formatFields";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { UserSchema } from "@/utils/userSchema";

type UserFormFieldsProps = {
  register: UseFormRegister<UserSchema>;
  setValue: UseFormSetValue<UserSchema>;
  errors: FieldErrors<UserSchema>;
  mode: "create" | "edit";
  isCepLoading: boolean;
};

export const UserFormFields = ({
  register,
  setValue,
  errors,
  mode,
  isCepLoading,
}: UserFormFieldsProps) => {
  return (
    <div className="grid gap-4">
      {userFields.map(({ label, id, name }) => {
        const isAddressField = ["logradouro", "bairro", "cidade", "estado"].includes(name);
        const isCepField = name === "cep";

        return (
          <div key={id} className="grid gap-3 relative">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
              <Input
                id={id}
                {...register(name as keyof UserSchema)}
                className="bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed pr-10"
                disabled={(isAddressField && isCepLoading) || (mode === "edit" && name === "cpf")}
                onChange={(e) => {
                  let value = e.target.value;
                  if (name === "cep") value = formatCEP(value);
                  if (name === "cpf") value = formatCPF(value);
                  setValue(name as keyof UserSchema, value);
                }}
              />
              {isCepField && isCepLoading && (
                <Loader2 className="absolute right-2 top-2 h-4 w-4 animate-spin text-gray-300" />
              )}
            </div>
            {errors[name as keyof UserSchema] && (
              <span className="text-red-400 text-xs">
                {errors[name as keyof UserSchema]?.message as string}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
