import { IPost } from "@/@types/posts";
import { ENDPOINTS } from "@/constants/endpoints"
import { apiClient } from "@/lib/axios"

export const getAllPosts = () => {
    return apiClient.get<IPost[]>(ENDPOINTS.POSTS);
}

export const getPostsById = (id:string) => {
    return apiClient.get<IPost[]>(`${ENDPOINTS.POSTS}?userId=${id}`);
}
