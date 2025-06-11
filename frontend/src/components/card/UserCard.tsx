import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import type { UserType } from "@/types/api";

interface UserCardProps {
  user: UserType;
  onEdit?: (user: UserType) => void;
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

export const UserCard = ({ user, onEdit }: UserCardProps) => (
  <Card className="mb-4 bg-gray-700 text-white border-gray-700 w-full max-w-md">
    <CardHeader className="flex flex-row items-center justify-between gap-2">
      <CardTitle className="text-lg truncate max-w-[220px] flex-1 min-w-0">
        {truncate(user.name, 30)}
      </CardTitle>
      <Pencil
        className="w-4 h-4 cursor-pointer text-blue-400 hover:text-blue-600 flex-shrink-0"
        onClick={() => onEdit?.(user)}
      />
    </CardHeader>
    <CardContent className="text-sm text-gray-300 space-y-1">
      <div><b>CPF:</b> {user.cpf}</div>
      <div><b>CEP:</b> {user.cep}</div>
      <div><b>Logradouro:</b> {user.logradouro}</div>
      <div><b>Bairro:</b> {user.bairro}</div>
      <div><b>Cidade:</b> {user.cidade}</div>
      <div><b>Estado:</b> {user.estado}</div>
    </CardContent>
  </Card>
);