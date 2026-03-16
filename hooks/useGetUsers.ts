import { getUsers } from "@/services/users"
import { useQuery } from "@tanstack/react-query"

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        select: (res) => res.data 
    })
}