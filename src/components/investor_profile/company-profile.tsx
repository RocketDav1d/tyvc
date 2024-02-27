import { FC } from 'react';

import Image from 'next/image';

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"


interface CompanyProfileData {
  name: string;
  stage: string;
  year: string;
  logo: string;
  alt: string;
}

export interface CompanyProfileProps {
  investorData: CompanyProfileData;
}


// The FC type from React is used to define a functional component with TypeScript
const CompanyProfile: FC<CompanyProfileProps> = ({ investorData }) => {
  return (
    <Card className="w-[15vw] min-h-[30vh] flex flex-col">
        {/* <div className="flex-1 w-full h-[80%] bg-tyvc-green border rounded-tl-md rounded-tr-md relative">
            <Image layout="fill" objectFit="cover" alt={investorData.alt} src={investorData.logo}></Image>
        </div> */}

<div className="relative flex-1 w-full h-[80%] overflow-hidden rounded-tl-md rounded-tr-md">
    <div className="absolute inset-0">
        <Image layout="fill" objectFit="cover" alt={investorData.alt} src={investorData.logo}></Image>
    </div>
</div>
      <div className='flex-none p-2'>
        <p className='font-semibold'>{investorData.name}</p>
        <p style={{ color: '#637381' }}>{investorData.stage}</p>
        <Badge className="mr-2 font-normal text-gray-500 rounded" variant="secondary">{investorData.year}</Badge>
      </div>

      {/* </CardContent> */}
    </Card>
  );
};

export default CompanyProfile;
