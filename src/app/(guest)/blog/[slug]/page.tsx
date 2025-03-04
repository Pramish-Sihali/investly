import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { notFound } from 'next/navigation';

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

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await fetchBlogPost(slug);

  if (!blog) {
    notFound();
  }

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto xl:max-w-4xl">
          {/* Breadcrumb navigation */}
          <nav className="flex">
            <ol role="list" className="flex items-center space-x-0.5">
              <li>
                <div className="-m-1">
                  <a
                    href="/"
                    className="p-1 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                  >
                    Home
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <div className="-m-1">
                    <a
                      href="/blog"
                      className="p-1 ml-0.5 text-sm font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700"
                    >
                      Blog
                    </a>
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          {/* Blog header */}
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase font-pj mt-8">
            Blog
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-7 sm:text-4xl xl:text-5xl font-pj">
            {blog.title}
          </h1>
          <p className="text-sm font-normal text-gray-600 mt-7 font-pj">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Decorative line */}
          <div className="mt-10">
            <svg
              className="w-auto h-4 text-gray-300"
              width="172"
              height="16"
              viewBox="0 0 172 16"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ... SVG lines pattern ... */}
            </svg>
          </div>

          {/* Featured image with gradient border */}
          <div className="relative mt-10">
            <div className="absolute -inset-2">
              <div
                className="w-full h-full mx-auto opacity-30 blur-lg filter"
                style={{
                  background:
                    'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                }}
              />
            </div>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${blog.thumbnailImage}`}
              alt={blog.thumbnailImageAltDescription || blog.title}
              width={1200}
              height={400}
              className="relative rounded-xl w-full h-[400px] object-cover"
            />
          </div>

          {/* Blog content */}
          <div className="mt-10">
            <div
              className="prose prose-lg max-w-none text-base font-normal leading-7 text-gray-700 font-pj"
              dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
