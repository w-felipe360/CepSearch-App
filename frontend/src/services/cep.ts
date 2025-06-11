import type { CepType } from "@/types/api";
import api from "./api";

export const getCep = async (cep: string): Promise<CepType> => {
  const response = await api.get<CepType>(`cep/${cep}`);
  return response.data;
};
