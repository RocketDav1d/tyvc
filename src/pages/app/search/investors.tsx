
import { Fund, Employee, BusinessAngel } from '@prisma/client';
import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import 'instantsearch.css/themes/satellite.css';
import {
  InstantSearch,

  Hits,
  Menu,

  SearchBox,

  DynamicWidgets,
  Pagination,
} from 'react-instantsearch';

import AngelResultCard from '@/components/search/angel-result-card';
import FundResultCard from '@/components/search/fund-result-card';
import InvestorResultCard from '@/components/search/investor-result-card';
import AppLayout from '@/layouts/app-layout';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);

type HitProps = {
  hit: AlgoliaHit<
    | (Fund & { type: 'fund'; slug: string; verified: boolean })
    | (Employee & {
        type: 'investor';
        slug: string;
        name: string;
        verified: boolean;
      })
    | (BusinessAngel & {
        type: 'angel';
        slug: string;
        name: string;
        verified: boolean;
      })
  >;
};

function Hit({ hit }: HitProps) {
  console.log(hit);
  switch (hit.type) {
    case 'fund':
      return <FundResultCard hit={hit} />;
    case 'investor':
      return <InvestorResultCard hit={hit} />;
    case 'angel':
      return <AngelResultCard hit={hit} />;
  }
}

export default function InvestorsSearchPage() {
  return (
    <AppLayout>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
      >
        <div className="h-full flex">
          <div className="w-1/5 p-4 bg-gray-50 max-w-xs dark:bg-[#0A0A0A]">
            <div className="space-y-6">
              <DynamicWidgets fallbackComponent={Menu} />





















            </div>
          </div>
          <div className="flex-1 px-4 py-12 mx-auto max-w-6xl">
            <SearchBox
              placeholder="Type a Venture Capital Fund, General Partner or Business Angel"
              autoFocus
              classNames={{
                root: 'w-full',
                input:
                  'border dark:border-gray-700 p-2 w-full bg-white dark:bg-gray-700 dark:text-white',
              }}
            />
            <div className="h-[calc(100vh-250px)] mt-5 overflow-y-scroll">
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: 'space-y-4',
                  item: 'border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 dark:text-white',
                }}
              />
            </div>
            <div className="flex justify-center mt-5">
              <Pagination
                padding={2}
                totalPages={20} // This should be dynamically calculated based on the total number of hits and hitsPerPage
                classNames={{
                  root: 'flex list-none',
                  item: 'mx-1',
                  link: 'block py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white',
                  selectedItem:
                    'bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white',
                  disabledItem: 'opacity-50 cursor-not-allowed',
                }}
                showFirst={true}
                showLast={true}
              />
            </div>
          </div>
        </div>
      </InstantSearch>
    </AppLayout>
  );
}
