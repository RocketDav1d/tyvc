import React from 'react';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Define the types for your props (adjust based on actual data you have)
export interface GamificationProps {
  total: number;
  current: number;
  label: string;
  subLabel: string;
  achievement: string;
  imageSrc: string;
}

const Gamification: React.FC<GamificationProps> = ({
  total,
  current,
  label,
  subLabel,
  achievement,
  imageSrc,
}) => {
  // Calculate the progress percentage
  const progressPercent = (current / total) * 100;

  return (
    <Card
      style={{ minWidth: '30vh', maxWidth: '50vh' }}
      className="p-6 bg-white border rounded-lg shadow-md dark:bg-dark-accent dark:border-gray-700"
    >
      {/* Apply padding */}
      <div className="content-div">
        <div className="grid grid-cols-[auto,minmax(0,1fr)] gap-6 mb-7">
          <div
            className="flex justify-center items-center rounded-md"
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#ECFAF7',
            }}
          >
            <img
              src={imageSrc}
              alt="Gamification Icon"
              style={{
                color: '#13C296',
                width: '35%',
                height: '40%',
              }}
            />
          </div>
          <div className="flex items-center ">
            <div>
              <h2 style={{ color: '#13C296' }} className="text-xl">
                {label}
              </h2>
              <p style={{ color: '#637381' }} className="dark:text-gray-200">
                {subLabel}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          {/* Centering the content below the grid */}
          <div className="mb-6">
            <span
              style={{ color: 'rgba(19, 194, 150, 1)' }}
              className="text-3xl font-bold border-red-500"
            >
              {current}
            </span>
            <span style={{ color: 'rgba(19, 194, 150, 0.8)' }}>
              {' '}
              / {total} you will receive a{' '}
            </span>
            <span
              style={{ color: 'rgba(19, 194, 150, 0.8)' }}
              className="font-semibold"
            >
              {achievement}
            </span>
          </div>
          <div className="">
            <Progress value={progressPercent} />
            {/* Pass the calculated percentage to the Progress component */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Gamification;
