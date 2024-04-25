import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from 'next/link';
import {
  InstantSearch,
  HierarchicalMenu,
  Highlight,
  Hits,
  Menu,
  RangeInput,
  RefinementList,
  SearchBox,
  ToggleRefinement,
} from 'react-instantsearch';

import AppLayout from '@/layouts/app-layout';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <Link href={`/app/funds/${hit.objectID}`}>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
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
            <div className="mb-4">
              <SearchBox
                placeholder="Search"
                autoFocus
                classNames={{ root: 'w-full', input: 'border p-2 w-full' }}
              />
            </div>
            <div>
              <RefinementList
                attribute="brand"
                searchable={true}
                searchablePlaceholder="Search brand"
                showMore={true}
                classNames={{
                  root: 'mb-4',
                  list: 'space-y-2',
                  item: 'flex justify-between items-center',
                }}
              />
              <Menu
                attribute="categories"
                showMore={true}
                classNames={{
                  root: 'mb-4',
                  list: 'space-y-2',
                  item: 'flex justify-between items-center',
                }}
              />
              <HierarchicalMenu
                attributes={[
                  'hierarchicalCategories.lvl0',
                  'hierarchicalCategories.lvl1',
                  'hierarchicalCategories.lvl2',
                ]}
                showMore={true}
                classNames={{
                  root: 'mb-4',
                  list: 'space-y-2',
                  item: 'flex justify-between items-center',
                }}
              />
              <RangeInput
                attribute="price"
                precision={1}
                classNames={{ root: 'mb-4', input: 'border p-2' }}
              />
              <ToggleRefinement
                attribute="free_shipping"
                label="Free shipping"
                classNames={{ label: 'inline-flex items-center' }}
              />
            </div>
          </div>
          <div className="w-3/4 h-screen p-4 overflow-auto">
            <Hits
              hitComponent={Hit}
              classNames={{ list: 'space-y-4', item: 'border p-4' }}
            />
          </div>
        </div>
      </InstantSearch>
    </AppLayout>
  );
}
