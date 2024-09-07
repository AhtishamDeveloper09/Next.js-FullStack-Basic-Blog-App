"use client";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

function DeleteBlog({ id }) {
  const router = useRouter();

  const deleteBlog = async () => {
    toast.loading("Deleting Blog", { id: 1 });
    await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "Delete",
    });
    toast.success("Blog Deleted Successfully", { id: 1 });
    router.push("/");
  };
  return (
    <>
      <Toaster />
      <button onClick={deleteBlog}>Delete</button>
    </>
  );
}

export default DeleteBlog;
