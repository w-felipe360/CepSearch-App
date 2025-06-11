export const formatCPF = (cpf: string) => {
  const digitsOnly = cpf.replace(/\D/g, "").slice(0, 11);
  return digitsOnly
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};
export const unmaskCPF = (cpf?: string) => (cpf ?? "").replace(/\D/g, "");

export const formatCEP = (cep: string) => {
  const digitsOnly = cep.replace(/\D/g, "").slice(0, 8);
  return digitsOnly.replace(/^(\d{5})(\d)/, "$1-$2");
};

export const unmaskCEP = (cep?: string) => (cep ?? "").replace(/\D/g, "");

