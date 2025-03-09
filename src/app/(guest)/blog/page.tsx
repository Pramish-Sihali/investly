import type { BlogPost } from '@/types/blog';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          allPosts {
            results {
              id
              title
              updatedAt
              slug
              createdAt
              thumbnailImage
              thumbnailImageAltDescription
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.allPosts.results;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const BlogPage = async () => {
  const blogs: BlogPost[] = await fetchBlogs();

  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Latest from blog
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Stay up to date with the latest news and updates from BAIN.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link href={`/blog/${blog.slug}`} className="block aspect-w-4 aspect-h-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${blog.thumbnailImage}`}
                  alt={blog.thumbnailImageAltDescription || blog.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full rounded-lg"
                />
              </Link>

              <span className="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-primary bg-primary/10 mt-9">
                Technology
              </span>

              <p className="mt-6 text-xl font-semibold">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-black hover:text-primary transition-colors line-clamp-2"
                >
                  {blog.title}
                </Link>
              </p>

              <p className="mt-4 text-gray-600">
                {blog.content?.substring(0, 150)}
                {blog.content?.length > 150 ? '...' : ''}
              </p>

              <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed" />

              <span className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
