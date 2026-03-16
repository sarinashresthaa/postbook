import {  getAllPosts, getPostsById } from "@/services/posts"
import { useQuery } from "@tanstack/react-query"

export const useGetAllPosts = () => {
    return useQuery({
        queryKey:["posts"],
        queryFn: () => getAllPosts(),
        select: (res) => res.data
    })
}

export const useGetPostsById = (id:string) =>{
    return useQuery({
        queryKey: ["posts",id],
        queryFn: () => getPostsById(id) ,
        select: (res) => res.data 
    })
}