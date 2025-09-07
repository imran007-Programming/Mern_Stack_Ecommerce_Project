import React from "react";
import { Link } from "react-router-dom";

export const blogs = [
  {
    id: 1,
    title: "5 Tips for Better Online Shopping",
    excerpt: "Discover how to save money and shop smarter online...",
    image: "https://www.thecreativesdesk.com/wp-content/uploads/e-commerce-blog-content-topic-ideas.jpg",
    content: `
      Online shopping can be tricky. Here are 5 tips:
      1. Compare prices before buying.
      2. Use coupon codes & cashback.
      3. Read customer reviews.
      4. Avoid unknown sellers.
      5. Track seasonal discounts.
    `,
  },
  {
    id: 2,
    title: "Top 10 Trending Gadgets in 2025",
    excerpt: "Check out the latest gadgets that are taking the market by storm...",
    image: "https://theunitedindian.com/images/gadgets-20-05-24-E-Hero.webp",
    content: `
      Gadgets in 2025 are smarter than ever! Some highlights:
      - AI-powered home assistants
      - Foldable smartphones
      - AR glasses
      - Smart health wearables
      - And more...
    `,
  },
  {
    id: 3,
    title: "How to Style Your Home on a Budget",
    excerpt: "Affordable tips to refresh your living space without overspending...",
    image: "https://assets.architecturaldigest.in/photos/62026064b5d9eefa7e4e2ddf/16:9/w_1615,h_908,c_limit/How%20to%20furnish%20your%20home%20on%20a%20budget.jpg",
    content: `
      Home styling doesn’t need to be expensive.
      - Try DIY décor
      - Repurpose old furniture
      - Use indoor plants
      - Shop second-hand markets
      - Add cozy lighting
    `,
  },
];


const Blogs = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Latest Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{blog.excerpt}</p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
