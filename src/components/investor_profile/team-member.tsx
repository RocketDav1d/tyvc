import { FC } from 'react';

import Image from 'next/image';

import { Card } from "@/components/ui/card"




interface TeamMemberData {
  name: string;
  stage: string;
  year: string;
  logo: string;
  alt: string;
  stars: number;
  number_reviews: number
}

export interface TeamMemberProps {
  investorData: TeamMemberData;
}


// The FC type from React is used to define a functional component with TypeScript
const TeamMember: FC<TeamMemberProps> = ({ investorData }) => {
  return (
    // <Card className="w-[220px] min-h-[310px] flex flex-col">
     <Card className="w-[15vw] min-h-[30vh] flex flex-col">
        {/* <div className="flex-1 w-full h-[80%] bg-tyvc-green border rounded-tl-md rounded-tr-md border-red-500 border-tyvc-green">
            <Image alt={investorData.alt} src={investorData.logo}></Image>
        </div> */}

        <div className="relative flex-1 w-full h-[80%] overflow-hidden rounded-tl-md rounded-tr-md">
          <div className="absolute inset-0">
            <Image layout="fill" objectFit="cover" alt={investorData.alt} src={investorData.logo}></Image>
          </div>
        </div>
      <div className='flex-none p-2'>
        <p className='font-semibold'>{investorData.name}</p>
        <p style={{ color: '#637381' }}>{investorData.stage}</p>
        <div className='flex items-center'>
        {Array.from({ length: 5 }).map((_, index) =>
            index < investorData.stars ? (
          <svg key={index} className="star-full" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.925 5.975L10.4 5.275L8.34996 0.975C8.19996 0.675 7.79996 0.675 7.64996 0.975L5.59996 5.3L1.09996 5.975C0.77496 6.025 0.64996 6.45 0.89996 6.675L4.17496 10.05L3.39996 14.775C3.34996 15.1 3.67496 15.375 3.97496 15.175L8.04996 12.95L12.1 15.175C12.375 15.325 12.725 15.075 12.65 14.775L11.875 10.05L15.15 6.675C15.35 6.45 15.25 6.025 14.925 5.975Z" fill="#F59E0B"/>
          </svg>
        ) : (
          <svg key={index} className="star-empty" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.0249 15.5502C3.7999 15.5502 3.5749 15.4752 3.3999 15.3502C3.0499 15.1002 2.8499 14.6502 2.9249 14.2252L3.5749 10.2002L0.774898 7.3252C0.474898 7.0252 0.374898 6.5752 0.499898 6.1502C0.624898 5.7502 0.974898 5.4502 1.3749 5.4002L5.2499 4.7752L6.9999 1.1002C7.1999 0.700195 7.5749 0.450195 7.9999 0.450195C8.4249 0.450195 8.8249 0.700195 8.9999 1.1002L10.7499 4.7502L14.5999 5.3502C14.9999 5.4252 15.3499 5.7002 15.4749 6.1002C15.6249 6.5252 15.4999 6.9752 15.1999 7.2752L12.4249 10.1752L13.0749 14.2252C13.1499 14.6752 12.9749 15.1002 12.5999 15.3502C12.2499 15.6002 11.8249 15.6252 11.4499 15.4252L7.9999 13.5502L4.5499 15.4252C4.3999 15.5252 4.1999 15.5502 4.0249 15.5502ZM1.5749 6.5002C1.5749 6.5002 1.5749 6.5252 1.5749 6.5502L4.4999 9.5502C4.6749 9.7252 4.7499 10.0002 4.7249 10.2502L4.0499 14.4252C4.0499 14.4252 4.0499 14.4252 4.0499 14.4502L7.6499 12.5002C7.8749 12.3752 8.1499 12.3752 8.3999 12.5002L11.9999 14.4502C11.9999 14.4502 11.9999 14.4502 11.9999 14.4252L11.3249 10.2252C11.2749 9.9752 11.3749 9.72519 11.5499 9.5252L14.4749 6.5252C14.4999 6.5002 14.4749 6.4752 14.4749 6.4752L10.4499 5.8502C10.1999 5.8002 9.9749 5.6502 9.8749 5.4002L7.9999 1.6002L6.1999 5.4252C6.0999 5.6502 5.8749 5.8252 5.6249 5.8752L1.5749 6.5002Z" fill="#F59E0B"/>
          </svg>
          )
          )}
          <span style={{ color: '#637381' }}>({investorData.number_reviews})</span>
        </div>

      </div>

      {/* </CardContent> */}
    </Card>
  );
};

export default TeamMember;
