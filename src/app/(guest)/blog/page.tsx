import type { BlogPost } from '@/types/blog';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HeadingSection from '@/components/common/heading-section';
import ResponsiveContainer from '@/components/common/responsive-container';

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
    <ResponsiveContainer variant="wide" paddingY="xl">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <HeadingSection
          title="Our Blog"
          subtitle="Stay up to date with the latest news and updates from Investly."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="rounded-2xl shadow-md overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${blog.thumbnailImage}`} 
                alt={blog.thumbnailImageAltDescription || blog.title}
                width={500}
                height={200}
                objectFit="cover"
                className="object-cover"
              />
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {blog.content?.substring(0, 150)}
                  {blog.content?.length > 150 ? '...' : ''}
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
