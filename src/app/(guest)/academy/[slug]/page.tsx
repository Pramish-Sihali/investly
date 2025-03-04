import type { Key, ReactNode, ReactPortal, ReactElement, JSXElementConstructor } from 'react';

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

const fetchArticles = async (slug: string) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetArticles($slug: String!) {
          articles(academy_Slug: $slug) {
            results {
              id
              title
              file
              description
              createdAt
              updatedAt
              videoLink
              slug
            }
          }
        }
      `,
      variables: { slug },
      fetchPolicy: 'no-cache',
    });
    return data.articles.results;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

type AcademyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AcademyDetailPage({ params }: AcademyDetailPageProps) {
  const { slug } = await params;
  const articles = await fetchArticles(slug);

  if (!articles || articles.length === 0) {
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
            <BreadcrumbLink href="/academy">Academy</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12">
        {articles.map(
          (article: {
            id: Key | null | undefined;
            title:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
            createdAt: string | number | Date;
            videoLink: string | undefined;
            description: any;
            file: string | undefined;
          }) => (
            <Card key={article.id} className="rounded-2xl shadow-md overflow-hidden mt-6">
              <CardContent className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
                <p className="text-sm text-gray-500 mb-6">
                  {new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <div
                  className="prose prose-lg max-w-none text-justify"
                  dangerouslySetInnerHTML={{ __html: article.description || '' }}
                />
                {article.file && (
                  <div className="mt-4">
                    <a
                      href={article.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download File
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        )}
      </div>
    </ResponsiveContainer>
  );
}
