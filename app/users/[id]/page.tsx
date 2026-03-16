"use client";

import { useGetPostsById } from "@/hooks/useGetPosts";
import { useParams } from "next/navigation";

const UserPostsPage = () => {
  const { id } = useParams();
  const { data } = useGetPostsById((id as string) ?? "");

  return (
    <div className="grid grid-cols-2 gap-4  max-w-5xl mx-auto p-6">
      {data?.map((post) => (
        <div key={post.id} className="bg-[#d8dce6] rounded-xl shadow-lg p-5 hover:shadow-2xl ">
          <div className="text-xl font-semibold text-gray-800 capitalize mb-3">
            {post.title}
          </div>
          <div className="text-gray-600 line-clamp-4">{post.body}</div>
        </div>
      ))}
    </div>
  );
};

export default UserPostsPage;
