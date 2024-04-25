import { Employee } from '@prisma/client';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from 'next/link';
import { Highlight } from 'react-instantsearch';

import { Badge } from '@/components/ui/badge';
import { Assets, PayloadAsset } from '@/utils/assets';

type InvestorResultCardProps = {
  hit: AlgoliaHit<
    Employee & {
      type: 'investor';
      slug: string;
      name: string;
      verified: boolean;
    }
  >;
};

function InvestorResultCard({ hit }: InvestorResultCardProps) {
  return (
    <Link
      href={`/app/investors/${hit.id}`}
      className="w-full h-full flex flex-col justify-between rounded-lg"
    >
      <div className="flex justify-center items-start space-x-4">
        <img
          src={PayloadAsset.fromFilename(
            hit.profilePicture,
            Assets.InvestorLogoFallback
          )}
          alt={hit.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="w-full flex flex-col space-y-4">
          <div className="flex flex-row justify-between">
            <Highlight
              hit={hit}
              attribute="name"
              className="text-2xl font-medium text-gray-900 dark:text-gray-200"
            />
            {hit.verified ? (
              <Badge className="text-lg bg-green-300">Verified</Badge>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default InvestorResultCard;
