import { useState } from "react";
import { UserFormDialog } from "@/components/forms/UserFormDialog";
import { UserTable } from "@/components/table/UserTable";
import { useUserData } from "@/hooks/useUserData";
import { useUserMutate } from "@/hooks/useUserMutate";
import { Button } from "@/components/ui/button";
import { useResponsiveItemsPerPage } from "@/hooks/itemsPerPage";

export const Home = () => {
  const { data } = useUserData();
  const { mutate } = useUserMutate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const itemsPerPage = useResponsiveItemsPerPage(3, 8);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md flex flex-col items-center w-full max-w-7xl mx-auto md:min-h-[800px]">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Lista de usuários cadastrados
        </h2>
        <UserTable
          users={Array.isArray(data) ? data : []}
          itemsPerPage={itemsPerPage}
        />
        <Button
          className="mt-6 bg-gray-700 text-white hover:bg-gray-600"
          onClick={() => setDialogOpen(true)}
        >
          Cadastrar Usuário
        </Button>
        <UserFormDialog
          mode="create"
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={(data) => {
            mutate(data);
            setDialogOpen(false);
          }}
        />
      </div>
    </div>
  );
};
