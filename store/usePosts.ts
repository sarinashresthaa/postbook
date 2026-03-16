import { IPost } from "@/@types/posts";
import { create } from "zustand";

type PostStoreType = {
    posts: IPost[];
    setPosts : (p:IPost[]) => void;
    addPost: (post: IPost) => void;
}

export const usePostStore = create<PostStoreType>((set)=> (
    {
        posts: [], 
        setPosts : (data) => set({posts:data}),

        addPost: (post) => 
            set((state)=> {
                const updatedPosts = [post,...state.posts];
                const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
                localStorage.setItem("posts", JSON.stringify([post,...savedPosts]));
                return { posts: updatedPosts};
            }),
    }
));