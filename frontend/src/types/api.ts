export interface UserType {
    id: number;
    name: string;
    cpf: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    creationTimeStamp: string;
    updateTimeStamp: string;
}
export interface CreateUserType {
  id?: number;
  name: string;
  cpf: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}
export interface UpdateUserType extends CreateUserType {
  id: number;
}
export interface CepType {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}
export const userFields = [
    { label: "Nome", id: "name", name: "name" },
    { label: "CPF", id: "cpf", name: "cpf" },
    { label: "CEP", id: "cep", name: "cep" },
    { label: "Logradouro", id: "logradouro", name: "logradouro" },
    { label: "Bairro", id: "bairro", name: "bairro" },
    { label: "Cidade", id: "cidade", name: "cidade" },
    { label: "Estado", id: "estado", name: "estado" },
]
export const initialFormData: CreateUserType = {
    name: "",
    cpf: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
}

export const userTableColumns: { label: string; field: keyof UserType }[] = [
    { label: "Nome", field: "name" },
    { label: "CPF", field: "cpf" },
    { label: "CEP", field: "cep" },
    { label: "Logradouro", field: "logradouro" },
    { label: "Cidade", field: "cidade" },
    { label: "Estado", field: "estado" },
    { label: "Bairro", field: "bairro" },
];

export interface UserDataResponse {
    data: UserType[];
}