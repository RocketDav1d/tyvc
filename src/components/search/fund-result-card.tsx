import { Fund } from '@prisma/client';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from 'next/link';
import { Highlight } from 'react-instantsearch';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Assets, PayloadAsset } from '@/utils/assets';

type FundResultCardProps = {
  hit: AlgoliaHit<Fund & { type: 'fund' }>;
};

function FundResultCard({ hit }: FundResultCardProps) {
  return (
    <Link
      href={`/app/funds/${hit.slug}`}
      className="w-full h-full flex flex-col justify-between rounded-lg"
    >
      <div className="flex items-start space-x-4">
        <img
          src={PayloadAsset.fromFilename(hit.logo, Assets.FundLogoFallback)}
          alt={hit.name}
          className="w-20 h-20 object-contain rounded-md"
        />
        <div className="w-full flex flex-col space-y-4">
          <div className="flex flex-row justify-between">
            <Highlight
              hit={hit}
              attribute="name"
              className="text-2xl font-medium text-gray-900 dark:text-white"
            />
            <Badge className="text-lg bg-green-300">Verified</Badge>
          </div>
          {hit.description && hit.description != '' && (
            <p className="text-sm text-gray-900 dark:text-gray-200">
              {hit.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Stage</p>
              <div className="mt-1 space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                  Seed
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
                  Series A
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                Review Score
              </p>
              <div className="flex items-center mt-1">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`w-5 h-5 ${
                      rating < 5 ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                Awards
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-400">
                Best Seed Fund 2022
              </p>
            </div>
            <div>
              {hit.ticketSize ? (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    Ticket Size
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-400">
                    {hit.ticketSize}
                  </p>
                </>
              ) : null}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                General Partners
              </p>
              <div className="flex mt-2 -space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FundResultCard;
