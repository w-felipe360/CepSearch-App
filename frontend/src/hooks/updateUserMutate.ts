import { putUser } from "@/services/users";
import type { CreateUserType } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useUpdateUserMutate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CreateUserType }) =>
            putUser(String(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userData"] });
        },
        onError: () => {
            alert("Erro ao atualizar usuário. Verifique os dados ou tente novamente.");
        },
    });
}