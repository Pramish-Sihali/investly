import type { TeamMember } from '@/types/company';

import React from 'react';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import HeadingSection from '@/components/common/heading-section';

// const angelInvestors = async (): Promise<TeamMember[]> => {

  

//   try {
//     const { data } = await client.query({
//       query: gql`
//         query MyQuery {
//           allTeamMembers {
//             results {
//               id
//               name
//               role
//               profilePicture
//               profilePictureAltDescription
//             }
//           }
//         }
//       `,
//       fetchPolicy: 'no-cache',
//     });
//     return data.allTeamMembers.results;
//   } catch (error) {
//     console.error('Error fetching board members:', error);
//     return [];
//   }
// };

const BoardOfDirectors = async () => {

      const angelInvestors= [
        {
            id:1,
            name:"CA Manoj Adhikari",
            profilePicture:'/angelInvestors/CAManojAdhikari.jpeg',
        },
        {
            id:2,
            name:"Mr. Bholeshwor Dulal",
            profilePicture:'/angelInvestors/MrBholeshworDulal.jpeg',
        },
        {
            id:3,
            name:"Mr. Bipin Kabra",
            profilePicture:'/angelInvestors/MrBipinKabra.jpeg',
        },
        {
            id:4,
            name:"Mr. Birendra Rathi",
            profilePicture:'/angelInvestors/MrBirendraRathi.jpeg',
        },
        {
            id:5,
            name:"Mr. Pratik Raut",
            profilePicture:'/angelInvestors/MrPratikRaut.jpeg',
        },
        {
            id:6,
            name:"Mr. Rakesh Surana",
            profilePicture:'/angelInvestors/MrRakeshSurana.jpeg',
        },
        {
            id:7,
            name:"Mr. Raj Kumar Golchha",
            profilePicture:'/angelInvestors/MrRaj KumarGolchha.jpeg',
        },
        {
            id:8,
            name:"Mr. Roman Kattel",
            profilePicture:'/angelInvestors/MrRomanKattel.png',
        },
        {
            id:9,
            name:"Mr. Santosh Kumar Bhagat",
            profilePicture:'/angelInvestors/MrSantosh KumarBhagat.jpeg',
        },
        {
            id:10,
            name:"Mr. Saurav Sharda",
            profilePicture:'/angelInvestors/MrSauravSharda.jpeg',
        },
        {
            id:11,
            name:"Mr. Siddhart Kabra",
            profilePicture:'/angelInvestors/MrSiddhartKabra.jpeg',
        },
        {
            id:12,
            name:"Mr. Sujit Jha",
            profilePicture:'/angelInvestors/MrSujitJha.jpeg',
        },
        {
            id:13,
            name:"Mr. Surendra Kumar Golchha",
            profilePicture:'/angelInvestors/MrSurendraKumarGolchha.jpeg',
        },
        {
            id:14,
            name:"Mr. Suyesh Pyakurel",
            profilePicture:'/angelInvestors/MrSuyeshPyakurel.jpeg',
        },
        
        
    ]


  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <HeadingSection
          title="Angel Investors"
          subtitle="Meet our visionary angel investors who fuel BAIN’s innovation and growth."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {angelInvestors.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center border border-gray-100"
            >
              <div className="mb-6">
                <div className="relative inline-block">
                  <img
                    src={member.profilePicture}
                    alt={member.name || member.name}
                    className="w-32 h-36  rounded-full mx-auto shadow-md ring-4 ring-white ring-offset-2 ring-offset-gray-50 group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                  {member.name}
                </h3>
                {/* <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                  {member.role}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
