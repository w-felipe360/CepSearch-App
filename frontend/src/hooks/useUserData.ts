import { getUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";


export function useUserData() {
  const query = useQuery({
    queryFn: getUser,
    queryKey: ["userData"],
  });
  return {
    ...query,
    data: query.data
  }
}
