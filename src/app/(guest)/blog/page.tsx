import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResponsiveContainer from "@/components/common/responsive-container";
import Link from "next/link";

const BlogPage = () => {
  const blogs = [
    {
      id: 1,
      slug: "elizabeth-kleinveld-startup-matchmaker",
      image: "/images/blog1.jpg",
      date: "04/02/2025",
      title: "Elizabeth Kleinveld: Startup Matchmaker & Ecosystem Builder",
      description:
        "Elizabeth Kleinveld is the host of Breaking Banks Europe, the world’s #1 FinTech podcast and radio show...",
    },
    {
      id: 2,
      slug: "10-tips-for-first-time-founders",
      image: "/images/blog2.jpg",
      date: "01/25/2025",
      title: "10 Tips for First-Time Founders to Succeed in the Startup World",
      description:
        "Starting a company can be overwhelming. From securing funding to building a team, the challenges can be daunting...",
    },
    {
      id: 3,
      slug: "future-of-fintech-trends-2025",
      image: "/images/blog3.jpg",
      date: "12/15/2024",
      title: "The Future of FinTech: Trends to Watch in 2025",
      description:
        "As we head into 2025, FinTech continues to revolutionize how we manage money...",
    },
  ];

  return (
    <ResponsiveContainer variant="wide" paddingY="xl">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="rounded-2xl shadow-md overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {blog.description}
                </p>
                <Link href={`/blog/${blog.slug}`} passHref>
                  <Button variant="link" className="text-orange-500 px-0">
                    Read more
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default BlogPage;