import { FC } from 'react';

import { BarChart } from '@mui/x-charts/BarChart';

import { Card } from "@/components/ui/card"



interface FundGenerationsData {
    [year: number]: number;
  }

export interface FundGenerationsProps {
  fundGenerations: FundGenerationsData;
}


// The FC type from React is used to define a functional component with TypeScript
const FundGenerations: FC<FundGenerationsProps> = ({ fundGenerations }) => {

  const years = Object.keys(fundGenerations).map(Number);
  const data = Object.values(fundGenerations);

  return (
    <Card style={{ width: "50vh", height: "30vh"}}>
        <div className="pt-3 pb-3 pl-3 text-2xl font-semibold">
        Fund Generations
        </div>
        <div>
            <BarChart
        series={[
            { data: data,
              color: "#69E07C"
            },
        ]}
        height={290}
        xAxis={[{ data: years, scaleType: 'band', }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
        </div>

    </Card>
  );
};

export default FundGenerations;
