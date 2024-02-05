import algoliasearch from 'algoliasearch';
import type { NextApiRequest, NextApiResponse } from 'next';

import { reviewsHandler } from '@/server/db/handlers/Reviews';
import { withAPIKey } from '@/server/middleware/withProtect';

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_ADMIN_API_KEY as string
);
const index = algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME as string);

const syncAlgolia = async (records: any[]) => {
  // Format records for Algolia
  const algoliaRecords = records.map((record) => ({
    objectID: record.id,
    ...record,
  }));

  // Push data to Algolia
  await index.saveObjects(algoliaRecords, {
    autoGenerateObjectIDIfNotExist: true,
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Fetch data from PostgreSQL using Prisma handler
      const records = await reviewsHandler();

      // Sync with Algolia
      await syncAlgolia(records);

      res
        .status(200)
        .json({ message: 'Data synced with Algolia successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error syncing data with Algolia', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAPIKey(handler);
