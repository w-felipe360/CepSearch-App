import { postUser } from "@/services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
    onError: () => {
      alert("Erro ao cadastrar usuário. Verifique os dados ou tente novamente.");
    },
  })
  return mutate;
}