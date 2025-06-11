import { useQuery } from "@tanstack/react-query";
import { getCep } from "@/services/cep";

type UseCepDataOptions = {
  enabled?: boolean;
};

export function useCepData(cep: string, options?: UseCepDataOptions) {
  const query = useQuery({
    queryKey: ["cepData", cep],
    queryFn: () => getCep(cep),
    enabled: options?.enabled ?? cep.length === 8,
  });

  return {
    ...query,
    data: query.data,
  };
}
