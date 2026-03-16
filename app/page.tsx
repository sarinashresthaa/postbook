"use client";

import PostForm from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllPosts } from "@/hooks/useGetPosts";
import { usePostStore } from "@/store/usePosts";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetAllPosts();

  const { posts, setPosts } = usePostStore();

  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    if (data) {
      const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

      const mergedPosts = [ ...savedPosts,...data];

      setPosts(mergedPosts);
    }
  }, [data, setPosts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="size-8 text-blue-500" />
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const start = (page - 1) * postsPerPage;
  const currentPosts = posts.slice(start, start + postsPerPage);
  console.log(currentPosts,start,totalPages,posts,"ad")

  return (
    <div className="max-w-5xl mx-auto p-6 overflow-hidden">
      <div className="text-end mb-2">
        <Button onClick={() => setOpen(true)}>Add Post</Button>
      </div>

      <PostForm open={open} setOpen={setOpen} />

      {/* Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-[#d8dce6]"
          >
            <h2 className="font-semibold text-lg mb-2">{post.title}</h2>

            <p className="text-gray-600 text-sm">{post.body}</p>

            <div className="mt-3 text-xs text-gray-500">
              User ID: {post.userId}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 border rounded ${
              page === index + 1 ? "bg-black text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
