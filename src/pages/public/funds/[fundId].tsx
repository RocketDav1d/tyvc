import { Metadata } from 'next';

import AppLayout from '@/layouts/app-layout';
// import { logger } from '@/utils/logger';

export const metadata: Metadata = {
  title: 'Fund',
  description: '',
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { fundId } = context.params as { fundId?: string };
//   if (!fundId) {
//     // Handle the case where fundId is not provided
//     throw new Error('fundId is required');
//   }

//   logger.debug('Fetching data for fundId: ', fundId);

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/funds/${fundId}`
//     );

//     const json = await res.json();
//     let fund = json.data ? json.data : null;

//     logger.debug('Fetched fund data: ', fund);

//     return {
//       props: { fund },
//     };
//   } catch (error) {
//     logger.debug('Error fetching fund data:', error);
//     return {
//       props: { fund: null },
//     };
//   }
// };

export default function PublicFundPage() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col justify-center mx-auto space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Fund</h1>
          <p className="text-sm text-muted-foreground">Fund details</p>
        </div>
      </div>
    </AppLayout>
  );
}
