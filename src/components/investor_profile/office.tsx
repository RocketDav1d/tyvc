import { FC } from 'react';


import { Card } from "@/components/ui/card"
import './office.css';

interface OfficeData {
    city: string,
    country: string,
    address: string,
    eployees: string[],
    bgImage: string
}

export interface OfficeProps {
  officeData: OfficeData;
}


// The FC type from React is used to define a functional component with TypeScript
const Office: FC<OfficeProps> = ({ officeData }) => {
    const { eployees } = officeData;
    // const employeeImages = eployees.slice(0, 2);
    const employeeImages = eployees.slice(0, Math.min(3, eployees.length));

    const remainingEmployees = eployees.length > 3 ? eployees.length - 2 : 0;

  return (
    <Card
        className="cardWithBlur2 relative w-[1/4] h-[400px]"
        style={{ width: "50vh", height: "30vh"}}
    >
        <div className='relative h-full'>
            <div className='flex justify-end pt-2 pr-2'>
                {employeeImages.map((employee, index) => (
                    <div key={index} className={`employee${index + 1} w-12 h-12 border-2 rounded-full border-white ${index !== 0 ? '-ml-3' : ''}`}>
                        {/* <Image layout="fill" src={employee} alt={`Employee ${index + 1}`} objectFit="contain"/> */}
                        <img className="fill rounded-full" src={employee} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                    </div>
                ))}
                {remainingEmployees > 0 && (
                    <div className="employee3 w-12 h-12 flex justify-center items-center -ml-3 font-semibold text-white bg-gray-200 border-2 rounded-full border-white">
                        +{remainingEmployees-1}
                    </div>
                )}
            </div>


            <div className="absolute bottom-0 w-full text">
                <div className="pl-2 text-4xl font-semibold text-white">
                    {officeData.city}
                </div>

                <div className="w-full flex justify-between">
                    <div className="pl-2 text-base text-white">
                    {officeData.country}
                    </div>

                    <div className="pr-2 text-base text-white">
                    {officeData.address}
                    </div>
                </div>
            </div>
        </div>

    </Card>
  );
};

export default Office;
