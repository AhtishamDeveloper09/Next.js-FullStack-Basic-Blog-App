async function fetchBlogs() {
  const response = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 10,
    },
  });
  const data = await response.json();
  return data.posts;
}

import Link from "next/link";
import DeleteBlog from "./component/DeleteBlog";

export default async function Home() {
  const blogs = await fetchBlogs();

  return (
    <main className="w-full h-full">
      {/* Title of app */}
      <div className="text-center p-4 bg-slate-800 rounded-lg m-auto my-5 drop-shadow-xl sm:w-3/4 md:w-2/4">
        <h1 className="text-slate-200 text-2xl font-bold font-[verdana]">
          Full-stack Blog App with Next.js
        </h1>
      </div>

      {/* Link to add blog */}
      <div className="m-auto my-5 text-center rounded-md bg-slate-200 p-2 sm:w-2/4 md:w-1/6">
        <Link href={"/blog/addblog"} className="font-semibold">
          Add New Blog 🚀
        </Link>
      </div>

      {/* All blogs */}
      <div className="w-full flex flex-col justify-center items-center">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col w-3/4 bg-slate-200 mx-3 p-4 my-2 rounded-md"
          >
            {/* Title and Action */}
            <div className="flex items-center justify-between mt-2 mb-1">
              <h1 className="font-semibold text-2xl">{blog.title}</h1>
              <div className="flex gap-3">
                <Link
                  href={`/blog/editblog/${blog.id}`}
                  className="bg-slate-800 text-xl text-slate-200 px-4 py-1 rounded-lg font-semibold"
                >
                  Edit
                </Link>
                <div className="bg-red-600 text-xl text-slate-200 px-4 py-1 rounded-lg font-semibold cursor-pointer">
                  <DeleteBlog id={blog.id} />
                </div>
              </div>
            </div>

            {/* Date and Description */}
            <div className="mr-auto">
              <blockquote className="font-bold text-xs text-slate-700">
                {new Date(blog.date).toDateString()}
              </blockquote>
            </div>
            <div className="mr-auto my-4">
              <h2>{blog.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
