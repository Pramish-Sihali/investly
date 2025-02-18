import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import ResponsiveContainer from '@/components/common/responsive-container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const revalidate = 60;
export const dynamicParams = true;

const fetchBlogPost = async (slug: string) => {
  try {
    const { data } = await client.query({
      query: gql`
        query BlogPostQuery($slug: String!) {
          allPosts(slug: $slug) {
            results {
              id
              title
              updatedAt
              slug
              thumbnailImage
              thumbnailImageAltDescription
              createdAt
              content
            }
          }
        }
      `,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });
    return data.allPosts.results[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export default async function BlogDetailPage() {
  const blog = await fetchBlogPost('');

  if (!blog) {
    notFound();
  }

  return (
    <ResponsiveContainer variant="wide" paddingY="xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
        <Card className="rounded-2xl shadow-md overflow-hidden mt-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${blog.thumbnailImage}`}
            alt={blog.thumbnailImageAltDescription || blog.title}
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
          />
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <div
              className="prose prose-lg max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            />
          </CardContent>
        </Card>
      </div>
    </ResponsiveContainer>
  );
}
