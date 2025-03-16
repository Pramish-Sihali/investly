import Link from 'next/link';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Card, CardContent } from '@/components/ui/card';
import HeadingSection from '@/components/common/heading-section';
import ResponsiveContainer from '@/components/common/responsive-container';

interface ReadingList {
  id: string;
  slug: string;
  title: string;
  articles: number;
  logo: string;
  totalArticles: number;
}

const fetchReadingLists = async (): Promise<ReadingList[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query MyQuery {
          academy {
            id
            title
            logo
            totalArticles
            slug
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.academy || [];
  } catch (error) {
    console.error('Error fetching reading lists:', error);
    return [];
  }
};

export default async function AcademyPage() {
  const readingLists = await fetchReadingLists();

  return (
    <ResponsiveContainer>
      <section className="py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <HeadingSection
              title="Reading Lists"
              subtitle="There are different types of reading lists that will help people to understand about the startup ecosystem"
            />
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {readingLists.map((item, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg border-gray-200"
              >
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-24 rounded-full flex items-center justify-center mb-6">
                    {item.logo && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.logo}`}
                        alt="logo"
                        width={500}
                        height={200}
                        objectFit="cover"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">{item.title}</h2>
                  <Link
                    href={`/academy/${item.slug}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-2"
                  >
                    Read {item.totalArticles} articles
                    <span className="text-lg">→</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </ResponsiveContainer>
  );
}
