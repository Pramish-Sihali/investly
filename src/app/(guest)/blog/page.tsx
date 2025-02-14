import type { BlogPost } from "@/types/blog"; // Import the BlogPost type

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveContainer from "@/components/common/responsive-container";

const fetchBlogs = async (): Promise<BlogPost[]> => {
  const query = `
    query MyQuery {
      allPosts {
        id
        title
        slug
        created_at
        thumbnail_image
        content
        thumbnail_image_alt_description
      }
    }
  `;

  try {
    const response = await fetch("http://139.59.26.218/api/blog/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error response body:", errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json.data.allPosts as BlogPost[]; 
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

const BlogPage = async () => {
  const blogs: BlogPost[] = await fetchBlogs();

  return (
    <ResponsiveContainer variant="wide" paddingY="xl">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="rounded-2xl shadow-md overflow-hidden">
              <img 
                src={blog.thumbnail_image} 
                alt={blog.thumbnail_image_alt_description || blog.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {blog.content?.substring(0, 150)}
                  {blog.content?.length > 150 ? "..." : ""}
                </p>
                <Link href={`/blog/${blog.slug}`} passHref>
                  <Button variant="link" className="text-primary px-0">
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