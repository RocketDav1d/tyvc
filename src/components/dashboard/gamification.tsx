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
  svg: string
}

const Gamification: React.FC<GamificationProps> = ({ total, current, label, subLabel, achievement, svg }) => {
  // Calculate the progress percentage
  const progressPercent = (current / total) * 100;

  return (
    <Card style={{ minWidth: '30vh', maxWidth: '50vh' }} className="p-6"> {/* Apply padding */}
      <div className="borderborder-red-500 content-div">
      <div className="grid grid-cols-[auto,minmax(0,1fr)] gap-6 mb-7">
      <div className="flex justify-center items-center rounded-md" style={{ width: '100px', height: '100px', backgroundColor: '#ECFAF7' }}>
          <svg color="#13C296" width="35%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={svg} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            {/* <path d="M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2087L12.3769 20.8789C12.9753 21.0247 13.5988 21.0389 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7855 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4135 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2092C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1418C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7952 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.04 6 13.7599 5.89101 13.546C5.79513 13.3579 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13H3.6C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3579 2.10899 13.546C2 13.7599 2 14.04 2 14.6ZM17.1914 3.59227C16.5946 2.34341 15.2186 1.6818 13.8804 2.32039C12.5423 2.95898 11.9722 4.4734 12.5325 5.80284C12.8787 6.62448 13.8707 8.22002 14.5781 9.31905C14.8394 9.72513 14.9701 9.92817 15.161 10.0469C15.3247 10.1488 15.5297 10.2037 15.7224 10.1974C15.9471 10.1899 16.1618 10.0794 16.5911 9.85845C17.7532 9.26033 19.4101 8.37457 20.1208 7.83614C21.2707 6.96494 21.5556 5.36359 20.6947 4.14626C19.8337 2.92892 18.3327 2.80914 17.1914 3.59227Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> */}
          </svg>
        </div>
            <div className="flex items-center ">
                <div>
                    <h2 style={{color: '#13C296'}} className='text-xl'>{label}</h2>
                    <p style={{color: '#637381'}} >{subLabel}</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col "> {/* Centering the content below the grid */}
          <div className="mb-6">
            <span style={{color: 'rgba(19, 194, 150, 1)'}} className="text-3xl font-bold border-red-500">{current}</span>
            <span style={{color: 'rgba(19, 194, 150, 0.8)'}}> / {total} you will receive a </span>
            {/* <div className='rounded-md bg-tyvc-green border border-tyvc-green'>
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 20V4M7 4L3 8M7 4L11 8M17 20V9M17 9L13 13M17 9L21 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div> */}
            <span style={{color: 'rgba(19, 194, 150, 0.8)'}} className='font-semibold'>{achievement}</span>
          </div>
          <div className=''>
            <Progress value={progressPercent} /> {/* Pass the calculated percentage to the Progress component */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Gamification;
