import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../Blogs/Blogs";


const Blogsdetails = () => {
  const { blogid } = useParams();


  const blog = blogs.find((b) => b.id === parseInt(blogid));

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Blog Not Found</h2>
        <Link to="/blogs" className="text-blue-600 hover:underline mt-4 block">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mt-6">{blog.title}</h1>
        <p className="text-gray-500 mt-2">{blog.excerpt}</p>
        <div className="mt-6 text-gray-700 whitespace-pre-line leading-relaxed">
          {blog.content}
        </div>
        <Link
          to="/blogs"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Blogs
        </Link>
      </div>
    </section>
  );
};

export default Blogsdetails;