import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Nome precisa ter pelo menos 2 caracteres"),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "CPF deve ter 11 dígitos",
    }),
  cep: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 8, {
      message: "CEP deve ter 8 dígitos",
    }),
  logradouro: z.string().min(1, "Logradouro obrigatório"),
  bairro: z.string().min(1, "Bairro obrigatório"),
  cidade: z.string().min(1, "Cidade obrigatória"),
  estado: z.string().min(2, "Estado obrigatório"),
});

export type UserSchema = z.infer<typeof userSchema>;