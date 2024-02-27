import { FC } from 'react';

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface InvestorData {
  about: string;
  stages: string[];
  sectors: string[];
  ticketSizes: string[];
}

export interface AboutProps {
  investorData: InvestorData;
}


// The FC type from React is used to define a functional component with TypeScript
const About: FC<AboutProps> = ({ investorData }) => {
  return (
    <Card className="w-[693px]"> {/* Adjust width as needed */}
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>
          {investorData.about}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <CardTitle>Investment Criteria</CardTitle>
          <div className="grid grid-cols-[auto,minmax(0,1fr)] gap-4">
            <div className="flex items-center">
              <label htmlFor="stage" className="mb-0">Stage</label>
            </div>

              <div className="flex items-center">
              {investorData.stages.map((stage, index) => (
                <Badge className="mr-2 font-normal text-gray-500 rounded" key={index} variant="secondary">{stage}</Badge>
                ))}
              </div>

            <div className="flex items-center">
              <label htmlFor="sectors" className="mb-0">Sectors</label>
            </div>


              <div className="flex items-center">
              {investorData.sectors.map((sector, index) => (
                <Badge className="mr-2 font-normal text-gray-500 rounded" key={index} variant="secondary">{sector}</Badge>
                ))}
              </div>

            <div className="flex items-center">
              <label htmlFor="ticketSize" className="mb-0">Ticket Size</label>
            </div>

              <div  className="flex items-center">
              {investorData.ticketSizes.map((ticketSize, index) => (
                <Badge className="mr-2 font-normal text-gray-500 rounded" key={index} variant="secondary">{ticketSize}</Badge>
                ))}
              </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
