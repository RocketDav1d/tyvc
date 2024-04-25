import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import 'instantsearch.css/themes/satellite.css';
import Link from 'next/link';
import {
  InstantSearch,

  Highlight,
  Hits,
  Menu,

  RefinementList,
  SearchBox,
  ToggleRefinement,
  DynamicWidgets,
} from 'react-instantsearch';

import AppLayout from '@/layouts/app-layout';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    slug: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <Link href={`/app/funds/${hit.slug}`}>
      <Highlight hit={hit} attribute="name" className="hit-label" />
    </Link>
  );
}

export default function InvestorsSearchPage() {
  return (
    <AppLayout>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
      >
        <div className="flex">
          <div className="w-1/4 p-4 bg-gray-50">
            <div className="space-y-6">
              <DynamicWidgets fallbackComponent={Menu}>
                <ToggleRefinement
                  attribute="PEorVC"
                  label="Venture Capital Funds"
                />
                <RefinementList attribute="ticketSize" />

                <RefinementList
                  attribute="sector"
                  operator="or"
                  limit={8}
                  showMore={true}
                />

                <RefinementList
                  attribute="stages"
                  operator="or"
                  limit={8}
                  showMore={true}
                />
              </DynamicWidgets>
            </div>
          </div>
          <div className="w-3/4 h-screen p-4 overflow-auto">
            <SearchBox
              placeholder="Search"
              autoFocus
              classNames={{ root: 'w-full', input: 'border p-2 w-full' }}
            />
            <div className="mt-5">
              <Hits
                hitComponent={Hit}
                classNames={{ list: 'space-y-4', item: 'border p-4' }}
              />
            </div>
          </div>
        </div>
      </InstantSearch>
    </AppLayout>
  );
}
