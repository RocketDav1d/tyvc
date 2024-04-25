import { BusinessAngel } from '@prisma/client';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from 'next/link';
import { Highlight } from 'react-instantsearch';

import { Badge } from '@/components/ui/badge';
import { Assets, PayloadAsset } from '@/utils/assets';

type AngelResultCardProps = {
  hit: AlgoliaHit<
    BusinessAngel & { type: 'angel'; slug: string; name: string }
  >;
};

function AngelResultCard({ hit }: AngelResultCardProps) {
  return (
    <Link
      href={`/app/angels/${hit.slug}`}
      className="w-full h-full flex flex-col justify-between rounded-lg"
    >
      <div className="flex items-start space-x-4">
        <img
          src={PayloadAsset.fromFilename(
            hit.profilePicture,
            Assets.FundLogoFallback
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
            <Badge className="text-lg bg-green-300">Verified</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AngelResultCard;
