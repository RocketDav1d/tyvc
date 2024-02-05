import { Metadata } from 'next';

import AppLayout from '@/layouts/app-layout';

export const metadata: Metadata = {
  title: 'Founder',
  description: '',
};

export default function FounderPage() {
  return (
    <AppLayout>
      <div className="w-full flex flex-col justify-center mx-auto space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Founder</h1>
          <p className="text-sm text-muted-foreground">Founder details</p>
        </div>
      </div>
    </AppLayout>
  );
}
