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
    
    const angelInvestors = [
      {
        id: 13,
        name: 'Mr. Surendra Kumar Golchha',
        profilePicture: '/angelInvestors/MrSurendraKumarGolchha.jpeg',
        role: 'Director, Golchha Organisation (Hulas Food)',
      },
      {
        id: 14,
        name: 'Mr. Suyesh Pyakurel',
        profilePicture: '/angelInvestors/MrSuyeshPyakurel.jpeg',
        role: 'Managing Director, MM Group of Companies',
      },
      {
        id: 6,
        name: 'Mr. Rakesh Surana',
        profilePicture: '/angelInvestors/MrRakeshSurana.jpeg',
        role: ' Managing Director, Reliance Thermopoly',
      },
      {
        id: 11,
        name: 'Mr. Siddharth Kabra',
        profilePicture: '/angelInvestors/MrSiddhartKabra.jpeg',
        role: 'Director, Kabra Group',
      },
      {
        id: 1,
        name: 'CA Manoj Adhikari',
        profilePicture: '/angelInvestors/CAManojAdhikari.jpeg',
        role: 'Managing Director, Adhikari and Associates',
      },
      {
        id: 2,
        name: 'Mr. Bholeshwor Dulal',
        profilePicture: '/angelInvestors/MrBholeshworDulal.jpeg',
        role: 'Managing Director, Purbanchal Lube Oil Pvt Ltd',
      },
      {
        id: 3,
        name: 'Mr. Bipin Kabra',
        profilePicture: '/angelInvestors/MrBipinKabra.jpeg',
        role: 'Director, Kabra G Group of Companies',
      },
      {
        id: 4,
        name: 'Mr. Birendra Rathi',
        profilePicture: '/angelInvestors/MrBirendraRathi.jpeg',
        role: 'Managing Director, Pashupati Poli Propylene Pvt. Ltd.',
      },
      {
        id: 5,
        name: 'Mr. Pratik Raut',
        profilePicture: '/angelInvestors/MrPratikRaut.jpeg',
        role: 'Managing Director, Shivam Organisation',
      },
      {
        id: 7,
        name: 'Mr. Raj Kumar Golchha',
        profilePicture: '/angelInvestors/MrRaj KumarGolchha.jpeg',
        role: 'Managing Director, RKG Group',
      },
      {
        id: 8,
        name: 'Mr. Roman Kattel',
        profilePicture: '/angelInvestors/MrRomanKattel.png',
        role: 'Director, Pranam Group',
      },
      {
        id: 9,
        name: 'Mr. Santosh Kumar Bhagat',
        profilePicture: '/angelInvestors/MrSantosh KumarBhagat.jpeg',
        role: 'Director, New ACC Itta Udgyog Pvt. Ltd',
      },
      {
        id: 10,
        name: 'Mr. Saurav Sharda',
        profilePicture: '/angelInvestors/MrSauravSharda.jpeg',
        role: 'Director, Sharda Group',
      },
      {
        id: 12,
        name: 'Mr. Sujit Jha',
        profilePicture: '/angelInvestors/MrSujitJha.jpeg',
        role: 'Managing Director, Techfinity Solutions &amp; Research Center Pvt Ltd',
      },
      {
        id: 15,
        name: 'Mr. Anuj Poddar',
        profilePicture: '/angelInvestors/Anuj_Poddar,Director, Jayshree Polymers Pvt. Ltd.jpg',
        role: 'Managing Director , Jayshree Polymers Pvt. Ltd',
      },
      {
        id: 16,
        name: 'Mr. Binod Poudel',
        profilePicture: '/angelInvestors/Binod Poudel, Director, JSRRMC Ind. Pvt Ltd..png',
        role: 'Managing Director, Nirman Sakti Payble',
      },
      {
        id: 17,
        name: 'Mr. Pradip Sharda',
        profilePicture: '/angelInvestors/Pradeep Sharda, Director, Nutri Foods Pvt. Ltd.jpg',
        role: 'Managing Director, Nutri Foods Pvt. Ltd.jpg',
      },
      {
        id: 18,
        name: 'Mr. Deepak Kumar Agarwal',
        profilePicture: '/angelInvestors/Mr. Deepak Agarwal.jpg',
        role: 'Director, Bagmati Oil Industries',
      },
      {
        id: 19,
        name: 'Mr. Jayendra Sharma',
        profilePicture: '/angelInvestors/Mr. Jayendra Sharma.jpg',
        role: 'Director, Rabindra Hosiery& Garment Embroidery Industires',
      },
      {
        id: 20,
        name: 'Mrs. Kiran Byas',
        profilePicture: '/angelInvestors/Mr. Kiran Byas.jpg',
        role: 'Director, Kiran Cake Parlor',
      },
      {
        id: 21,
        name: 'Mr. Paras Golchha',
        profilePicture: '/angelInvestors/Mr. Paras Golchha.jpg',
        role: 'Director, Hulas Wire Industries Pvt Ltd ',
      },
      {
        id: 22,
        name: 'Mr. Paras Luniya',
        profilePicture: '/angelInvestors/Mr. Paras Luniya.jpg',
        role: 'Executive Director, Arihant Group of Industries',
      },
      {
        id: 23,
        name: 'Mr. Srijan Pyakurel',
        profilePicture: '/angelInvestors/Mr. Srijan Pyakurel.jpg',
        role: 'Director, MM Plastic Udhyog Pvt Ltd',
      },
      {
        id: 24,
        name: 'Mr. Subodh Koirala',
        profilePicture: '/angelInvestors/Mr. Subodh Pyakurel.jpg',
        role: 'Director, Fujima Oil Compan Pvt Ltd ',
      },
      {
        id: 25,
        name: 'Mr. Ukesh Agarwal',
        profilePicture: '/angelInvestors/Mr. Ukesh Agarwal.jpg',
        role: 'Proprietor, Jaya Shree Electrixal Udhyog ',
      },
      // {
      //   id: 26,
      //   name: 'Mr. Chudamani Bhattarai',
      //   profilePicture: '/angelInvestors/Mr. Ukesh Agarwal.jpg',
      //   role: 'Proprietor, Jaya Shree Electrixal Udhyog ',
      // },
    ];


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
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfDirectors;
