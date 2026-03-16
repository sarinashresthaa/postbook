import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostFormData, postSchema } from "@/schema/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { usePostStore } from "@/store/usePosts";

type PostFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const PostForm = ({ open, setOpen }: PostFormProps) => {
  const { addPost } = usePostStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });
  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    const newPost = {
      id: Date.now(), // unique ID
      userId: 1,
      ...data,
    };

    addPost(newPost);
    setOpen(false);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="bg-white/5 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-100 ">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Post</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <input
            type="text"
            placeholder="Add a title"
            {...register("title")}
            className=" border-3 focus:border-black p-2 w-full rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
          <div className="flex flex-col w-full">
            <h1 className="font-medium text-gray-800 text-sm lg:text-base mb-1 w-full">
              Body:
            </h1>
            <textarea
              {...register("body")}
              className="border-3 p-2 rounded w-full  focus:border-black
              "
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>
          <DialogFooter className="flex md:gap-4">
            <DialogClose asChild>
              <Button variant="outline" className="border-black">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;
