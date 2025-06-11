import api from "./api";
import type { CreateUserType, UserDataResponse } from "@/types/api";

export const getUser = async (): Promise<UserDataResponse> => {
  const response = await api.get<UserDataResponse>("user");
  return response.data;
};

export const postUser = async (data: CreateUserType) => {
  return await api.post("user", data);
}

export const putUser = async (id: string, data: CreateUserType) => {
   await api.put(`user/${id}`, data);
};
export const deleteUser = async (id: string) => {
  const response = await api.delete(`user/${id}`);
  return response.data;
};