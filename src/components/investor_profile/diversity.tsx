import { FC } from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { Badge } from '@radix-ui/themes';

// import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ONLY_WHITE_FEMALE_FOUNDERS
// ONLY_POC_MALE_FOUNDERS
// ONLY_POC_FEMALE_FOUNDERS


interface DiversityCompanyData {
    OnlyWhiteMaleFounders: number,
    Min1Woman: number,
    Min1POC: number,
    Min1WomanPOC: number,
}

export interface DiversityProps {
    Companies: DiversityCompanyData;
}


// The FC type from React is used to define a functional component with TypeScript
const Diversity: FC<DiversityProps> = ({ Companies }) => {

    const calculatePercentage = (value: number) => {
        const total = Companies.OnlyWhiteMaleFounders + Companies.Min1Woman + Companies.Min1POC + Companies.Min1WomanPOC;
        return (value / total) * 100;
      };

    const numberCompanies = (value: number) => {
        const total = Companies.OnlyWhiteMaleFounders + Companies.Min1Woman + Companies.Min1POC + Companies.Min1WomanPOC;
        return total
    }

    const color_OnlyWhiteMaleFounders = "#2563EB"
    const color_Min1Woman = "#F97316"
    const color_Min1POC = "#22C55E"
    const color_Min1WomanPOC = "#5B21B6"


  return (
    <Card className="w-3/4 h-300px">
      <CardContent>

        <div className='header flex justify-between py-3'>
            <div className='header'>
                <h2 className='font-semibold'>Founder Diversity in Portfolio</h2>
            </div>
            <div className=' '>
            <Badge className="px-8 py-1 text-white bg-tyvc-green border rounded-md border-tyvc-green" size="2" color="indigo">
                Exclusive
                </Badge>
            </div>
        </div>

        <Separator/>

        <div className='flex'>

            <div className="pie w-full pt-3">
            <PieChart
                colors={[color_OnlyWhiteMaleFounders, color_Min1Woman, color_Min1POC, color_Min1WomanPOC]} // Updated colors
                series={[
                    {
                    data: [
                        { id: 0, value: 60},
                        { id: 1, value: 20},
                        { id: 2, value: 20},
                        { id: 3, value: 20},
                    ],
                    innerRadius: 50,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -182,
                    endAngle: 180,
                    cx: 190,
                    cy: 100,
                    },
                ]}
                // width={250}
                // height={200}
                />
            </div>

            <div className='w-full m-5'>
                <div className="grid grid-cols-5 p-2 overflow-auto">
                    <div className="col-span-3">Diversity Category</div>
                    <div className="flex col-span-1 justify-end">Companies</div>
                    <div className="flex col-span-1 justify-end">%</div>
                </div>
                <Separator/>

                <div className="grid grid-cols-5 p-2 overflow-auto">
                    <div className="flex col-span-3 items-center gap-1">
                        <div style={{backgroundColor: color_OnlyWhiteMaleFounders, borderColor: color_OnlyWhiteMaleFounders}} className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        Only White Male Founders
                    </div>
                    <div className="flex col-span-1 justify-end">{Companies.OnlyWhiteMaleFounders}</div>
                    <div className="flex col-span-1 justify-end">{calculatePercentage(Companies.OnlyWhiteMaleFounders).toFixed(2)}%</div>
                </div>

                <div className="grid grid-cols-5 p-2 overflow-auto">
                    <div className="flex col-span-3 items-center gap-1">
                        <div style={{backgroundColor: color_Min1Woman, borderColor: color_Min1Woman}} className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        Min. 1 Woman
                    </div>
                    <div className="flex col-span-1 justify-end">{Companies.Min1Woman}</div>
                    <div className="flex col-span-1 justify-end">{calculatePercentage(Companies.Min1Woman).toFixed(2)}%</div>
                </div>

                <div className="grid grid-cols-5 p-2 overflow-auto">
                    <div className="flex col-span-3 items-center gap-1">
                        <div style={{backgroundColor: color_Min1POC, borderColor: color_Min1POC}} className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        Min. 1 Person of Color
                    </div>
                    <div className="flex col-span-1 justify-end">{Companies.Min1POC}</div>
                    <div className="flex col-span-1 justify-end">{calculatePercentage(Companies.Min1POC).toFixed(2)}%</div>
                </div>

                <div className="grid grid-cols-5 p-2 overflow-auto">
                    <div className="flex col-span-3 items-center gap-1">
                        <div style={{backgroundColor: color_Min1WomanPOC, borderColor: color_Min1WomanPOC}} className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        Min. 1 Woman & Min. 1 POC
                    </div>
                    <div className="flex col-span-1 justify-end">{Companies.Min1WomanPOC}</div>
                    <div className="flex col-span-1 justify-end">{calculatePercentage(Companies.Min1WomanPOC).toFixed(2)}%</div>
                </div>

            </div>

        </div>


      </CardContent>
    </Card>
  );
};

export default Diversity;
