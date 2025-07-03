import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import HeadingSection from '@/components/common/heading-section';
import { StartupCard } from '@/components/startupDir/starup-card';

const FETCH_STARTUPS = gql`
  query MyQuery {
    companies(organizationRole: STARTUP) {
      results {
        organizationLogo
        organizationName
        organizationRole
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

export default async function StartupDirectoryPageAll() {
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
              key={`${startup.organizationName}-${startup.websiteLink}`}
              name={startup.organizationName}
              country={startup.contactCountry || 'N/A'}
              description={startup.organizationDescription || 'No description available'}
              logo={startup.organizationLogo || '/path/to/default/logo.png'}
              progress={50}
              daysLeft={30}
              raised={startup.amountRaising || 'N/A'}
              featured={startup.featured || false}
              websiteLink={startup.websiteLink}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
