import algoliasearch from 'algoliasearch';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withAPIKey } from '@/server/middleware/withProtect';

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_ADMIN_API_KEY as string
);
const index = algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME as string);

const syncAlgolia = async (record: any) => {
  // Format record for Algolia
  const algoliaRecord = {
    objectID: record.SupabaseID,
    type: 'investor',
    ...record,
  };

  // Push data to Algolia
  await index.saveObject(algoliaRecord);
};

const deleteFromAlgolia = async (objectID: string) => {
  await index.deleteObject(objectID);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'POST': {
        if (!req.body || Object.keys(req.body).length === 0) {
          return res
            .status(400)
            .json({ message: 'Employee data is required.' });
        }
        const record = req.body;

        // Sync with Algolia
        await syncAlgolia(record);

        res.status(200).json({
          message: 'Employee synced with Algolia successfully',
          data: record,
        });
        break;
      }
      case 'DELETE': {
        const { SupabaseID } = req.body;
        if (!SupabaseID) {
          return res.status(400).json({ message: 'SupabaseID is required.' });
        }

        // Delete from Algolia
        await deleteFromAlgolia(SupabaseID);

        res.status(200).json({
          message: 'Employee deleted from Algolia successfully',
        });
        break;
      }
      default:
        res.setHeader('Allow', ['POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error syncing data with Algolia', error });
  }
};

export default withAPIKey(handler);
