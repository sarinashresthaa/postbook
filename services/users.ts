import { IUserType } from "@/@types/user";
import { ENDPOINTS } from "@/constants/endpoints"
import { apiClient } from "@/lib/axios"

export const getUsers  = () => {
    return apiClient.get<IUserType[]>(ENDPOINTS.USERS);
}   