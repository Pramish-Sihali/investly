import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Button } from '@/components/ui/button';
import HeadingSection from '@/components/common/heading-section';
import { StartupCard } from '@/components/startupDir/starup-card';

const FETCH_STARTUPS = gql`
  query FetchStartups {
    companies(role: STARTUP) {
      results {
        organizationName
        organizationLogo
        organizationDescription
        websiteLink
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

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <HeadingSection
          title="Startup Directory"
          subtitle="Explore different types of startups to understand the ecosystem better"
        />

        {/* Display all startups in a grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup: any) => (
            <StartupCard
              key={startup.organizationName}
              name={startup.organizationName}
              country={startup.contactCountry || 'N/A'} // Fallback if contactCountry is not available
              description={startup.organizationDescription || 'No description available'} // Fallback if description is empty
              logo={startup.organizationLogo}
              progress={50} // You might want to add this field to your GraphQL query
              daysLeft={30}
              raised={startup.amountRaising || 'N/A'} // Fallback if amountRaising is not available
              featured={startup.featured || false} // Fallback if featured is not available
              websiteLink={startup.websiteLink} // Pass websiteLink to the card
            />
          ))}
        </div>

        {/* Optional: Button to view more */}
        <div className="flex justify-center pt-4">
          <Link href="/startup-directory">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              View all open rounds
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
