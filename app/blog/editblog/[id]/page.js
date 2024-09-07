"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const EditBlog = ({ params }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const router = useRouter();

  const getBlogById = async (id) => {
    let response = await fetch(`http://localhost:3000/api/blog/${id}`);
    let data = await response.json();
    return data.post;
  };

  useEffect(() => {
    toast.loading("Fetching Blog Details", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Complete", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, []);

  const updateBlog = async ({ title, description, id }) => {
    let response = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "Put",
      body: JSON.stringify({ title, description }),
    });
    return response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request", { id: 2 });
      await updateBlog({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        id: params.id,
      });
      toast.success("Blog Updated Successfully", { id: 2 });
      router.push("/");
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-full my-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl text-slate-200 p-3 font-bold">
            Edit A Blog 🚀
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;
