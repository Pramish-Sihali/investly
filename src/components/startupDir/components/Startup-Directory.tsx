import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Button } from '@/components/ui/button';
import { StartupCard } from '@/components/starup-card';
import HeadingSection from '@/components/common/heading-section';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';

const FETCH_STARTUPS = gql`
  query FetchStartups {
    companies(user_Role: STARTUP) {
      results {
        id
        logo
        companyName
        contactCountry
        companyDescription
        amountRaising
        featured
      }
    }
  }
`;

async function fetchStartups() {
  try {
    const { data } = await client.query({
      query: FETCH_STARTUPS,
      fetchPolicy: 'no-cache',
    });
    return data.companies.results;
  } catch (error) {
    console.error('Error fetching startups:', error);
    return [];
  }
}

export default async function StartupDirectoryPage() {
  const startups = await fetchStartups();

  const featuredStartups = startups.filter((startup: any) => startup.featured);
  const otherStartups = startups.filter((startup: any) => !startup.featured);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <HeadingSection
          title="Startup Directory"
          subtitle="Explore different types of startups to understand the ecosystem better"
        />

        {/* Featured Startups */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredStartups.map((startup: any) => (
            <StartupCard
              key={startup.id}
              name={startup.companyName}
              country={startup.contactCountry}
              description={startup.companyDescription}
              logo={startup.logo}
              progress={50} // You might want to add this field to your GraphQL query
              daysLeft={30}
              raised={startup.amountRaising}
              featured={startup.featured}
            />
          ))}
        </div>

        {/* Other Startups in Table */}
        <h2 className="text-2xl font-semibold">Other Startups</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Amount Raising</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {otherStartups.map((startup: any) => (
              <TableRow key={startup.id}>
                <TableCell>{startup.companyName}</TableCell>
                <TableCell>{startup.contactCountry}</TableCell>
                <TableCell>{startup.amountRaising}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center pt-4">
          <Link href="/startup-directory">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-b px-8">
              View all open rounds
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
