import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface CompanyData {
  about: string;
  foundedYear: number;
  teamSize: string;
  headquarters: string;
}

export interface AboutProps {
  companyData: CompanyData;
}

const About: FC<AboutProps> = ({ companyData }) => {
  return (
    <Card className="w-full h-auto">
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>{companyData.about}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <CardTitle>Company Details</CardTitle>
          <div className="grid grid-cols-[auto,minmax(0,1fr)] gap-4">
            <div className="flex items-center">
              <label htmlFor="foundedYear" className="mb-0">
                Founded Year
              </label>
            </div>
            <div className="flex items-center">
              <Badge
                className="mr-2 font-normal text-gray-500 rounded"
                variant="secondary"
              >
                {companyData.foundedYear}
              </Badge>
            </div>

            <div className="flex items-center">
              <label htmlFor="teamSize" className="mb-0">
                Team Size
              </label>
            </div>
            <div className="flex items-center">
              <Badge
                className="mr-2 font-normal text-gray-500 rounded"
                variant="secondary"
              >
                {companyData.teamSize}
              </Badge>
            </div>

            <div className="flex items-center">
              <label htmlFor="headquarters" className="mb-0">
                Headquarters
              </label>
            </div>
            <div className="flex items-center">
              <Badge
                className="mr-2 font-normal text-gray-500 rounded"
                variant="secondary"
              >
                {companyData.headquarters}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
