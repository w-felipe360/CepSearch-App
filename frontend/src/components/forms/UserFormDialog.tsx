import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserSchema } from "@/utils/userSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  initialFormData,
  type CreateUserType,
  type UserType,
  type UpdateUserType,
} from "@/types/api";
import {
  formatCEP,
  formatCPF,
  unmaskCEP,
  unmaskCPF,
} from "@/utils/formatFields";
import { useDeleteUserMutate } from "@/hooks/useDeleteUserMutate";
import { useCepData } from "@/hooks/useCepData";
import { UserFormFields } from "./UserFormFields";
import { DeleteDialog } from "./DeleteDialog";

type UserFormDialogProps = {
  mode: "create" | "edit";
  user?: UserType;
  onSubmit: (data: CreateUserType | UpdateUserType) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const UserFormDialog = ({
  mode,
  user,
  onSubmit,
  open,
  onOpenChange,
}: UserFormDialogProps) => {
  const { mutate: deleteUser } = useDeleteUserMutate();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: initialFormData,
  });

  const rawCep = unmaskCEP(watch("cep"));
  const { data: cepData, isLoading: isCepLoading } = useCepData(rawCep, {
    enabled: rawCep.length === 8,
  });

  useEffect(() => {
    if (cepData && rawCep.length === 8) {
      setValue("logradouro", cepData.logradouro || "");
      setValue("bairro", cepData.bairro || "");
      setValue("cidade", cepData.localidade || "");
      setValue("estado", cepData.uf || "");
    }
  }, [cepData, rawCep, setValue]);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && user) {
        reset({
          ...user,
          cep: formatCEP(user.cep),
          cpf: formatCPF(user.cpf),
        });
      } else {
        reset(initialFormData);
      }
    }
  }, [open, mode, user, reset]);

  const handleFormSubmit = (data: UserSchema) => {
    const formatedData = {
      ...data,
      cpf: unmaskCPF(data.cpf),
      cep: unmaskCEP(data.cep),
    };
    if (mode === "edit" && user) {
      onSubmit({ ...formatedData, id: user.id });
    } else {
      onSubmit(formatedData);
    }
    onOpenChange?.(false);
  };

  const handleDelete = () => {
    if (user) {
      deleteUser(user.id);
      setConfirmDeleteOpen(false);
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Editar Usuário" : "Cadastrar Usuário"}
            </DialogTitle>
            <DialogDescription className="mb-6">
              {mode === "edit"
                ? "Altere os dados do usuário."
                : "Preencha os dados para cadastrar um novo usuário."}
            </DialogDescription>
          </DialogHeader>
          <UserFormFields
            register={register}
            setValue={setValue}
            errors={errors}
            mode={mode}
            isCepLoading={isCepLoading}
          />
          <DialogFooter className="mt-6 flex gap-2 justify-end">
            {mode === "edit" && (
              <Button
                type="button"
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                Excluir
              </Button>
            )}
            <DialogClose asChild>
              <Button
                className="bg-gray-600 text-white hover:bg-gray-500"
                type="button"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              className="bg-green-600 text-white hover:bg-green-500"
              type="submit"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <DeleteDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        onConfirm={handleDelete}
      />
    </Dialog>
  );
};
