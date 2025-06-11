import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/users";

export function useDeleteUserMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(String(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: () => {
      alert("Erro ao deletar usuário. Tente novamente.");
    },
  });
}