import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { userTableColumns, type CreateUserType, type UserType } from "@/types/api";
import { TablePagination } from "./TablePagination";
import { Pencil } from "lucide-react";
import { UserFormDialog } from "../forms/UserFormDialog";
import { useUpdateUserMutate } from "@/hooks/updateUserMutate";
import { UserCard } from "../card/UserCard";

interface UserTableProps {
  users: UserType[];
  itemsPerPage?: number;
  onEdit?: (user: UserType) => void;
  onDelete?: (user: UserType) => void;
}

export const UserTable = ({
  users,
  itemsPerPage = 15,
  onEdit,
}: UserTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate } = useUpdateUserMutate();

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);
  return (
    <>
      <div className="hidden md:block flex-col flex-grow w-full min-h-full">
        <Card className="bg-gray-700 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-center">Usuários</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-300 space-y-1 min-h-[500px] flex flex-col justify-between">

            <Table>
              <TableHeader>
                <TableRow>
                  {userTableColumns.map((col) => (
                    <TableHead key={col.field}>{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user, idx) => (
                  <TableRow key={idx}>
                    {userTableColumns.map((col) => (
                      <TableCell key={col.field}>
                        {col.field === "name" ? (
                          <div className="flex items-center gap-2 w-full">
                            <div className="flex items-center gap-1 shrink-0">
                              <Pencil
                                className="w-4 h-4 cursor-pointer text-blue-400 hover:text-blue-600"
                                onClick={() => {
                                  setEditingUser(user);
                                  setDialogOpen(true);
                                }}
                              />
                            </div>
                            <span
                              className="truncate max-w-[200px] overflow-hidden whitespace-nowrap"
                              title={String(user[col.field])}
                            >
                              {user[col.field]}
                            </span>
                          </div>
                        ) : (
                          <div
                            className="truncate max-w-[180px] overflow-hidden whitespace-nowrap"
                            title={String(user[col.field])}
                          >
                            {user[col.field]}
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards mobile */}
      <div className="md:hidden w-full min-h-[80vh] flex flex-col justify-between">
        <div className="flex-grow flex flex-col">
          {currentUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u) => {
                setEditingUser(u);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>
        <div className="mt-4">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {editingUser && (
        <UserFormDialog
          mode="edit"
          user={editingUser}
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditingUser(null);
          }}
          onSubmit={(updatedUser) => {
            onEdit?.(updatedUser as UserType);
            setDialogOpen(false);
            setEditingUser(null);
            if (updatedUser.id !== undefined) {
              const { id, ...userData } = updatedUser;
              mutate({ id, data: userData as CreateUserType });
            }
            setDialogOpen(false);
          }}
        />
      )}
    </>
  );
};