"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const AddBlog = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const router = useRouter();

  const postBlog = async ({ title, description }) => {
    let response = await fetch("http://localhost:3000/api/blog", {
      method: "Post",
      body: JSON.stringify({ title, description }),
    });
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request", { id: 1 });
      await postBlog({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      });
      toast.success("Blog Added Successfully", { id: 1 });
      router.push("/");
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-full my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 p-3 font-bold">
            Add A New Blog 🚀
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full px-4 py-2 rounded-md mt-4 mb-2"
              ref={titleRef}
            />
            <textarea
              placeholder="Enter description"
              className="w-full px-4 py-2 rounded-md my-2"
              rows="5"
              ref={descriptionRef}
            />
            <div className="flex justify-between">
              <Link
                href="/"
                className="bg-slate-200 px-4 py-2 rounded-md font-semibold shadow-xl hover:bg-slate-100"
              >
                Go to Home Page
              </Link>
              <button className="bg-slate-200 px-4 py-2 rounded-md font-semibold shadow-xl hover:bg-slate-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlog;
