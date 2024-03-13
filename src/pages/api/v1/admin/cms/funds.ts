import type { NextApiRequest, NextApiResponse } from 'next';

import { importFundHandler, removeFundById } from '@/server/db/handlers/Fund';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { logger } from '@/utils/logger';

type CreateFundFunction = (fundData: any) => Promise<any>;
type DeleteFundFunction = (fundId: string) => Promise<any>;

type MakeFundProps = {
  createFundFunction: CreateFundFunction;
  deleteFundFunction: DeleteFundFunction;
};


//schema
// {
//   name: 'David Korn',
//   deck: [ '65d783764b223a9db51a643f' ],
//   about: 'r4errw',
//   email: 'me@davidkorn.de',
//   color: 'green',
//   media: [ '65d5f2dfb03b10ec0fcf8f7b' ],
//   offices: [ '65d783944b223a9db51a6446' ],
//   phoneNumber: 1798077151,
//   portfolioCompanies: [ '65d52060efe864df55a3a702' ],
//   notableCoInvestors: [ { relationTo: 'BA', value: '65d5221e614fd09d7d61c523' } ],
//   referenceCallVideos: [ '65d783694b223a9db51a643a' ],
//   fundGenerations: [
//     {
//       id: '65d783d3f96dd842daef3cec',
//       name: 'test',
//       year: 12421,
//       volume: 234234
//     }
//   ],
//   socialMediaLinks: [
//     {
//       id: '65d783dff96dd842daef3ced',
//       url: 'https://payloadcms.com/docs/hooks/overview',
//       name: 'linkedin'
//     },
//     {
//       id: '65d783ebf96dd842daef3cee',
//       url: 'https://payloadcms.com/docs/hooks/overview',
//       name: 'ewfwe'
//     }
//   ],
//   investmentTeamMembers: [ '65d782bf4b223a9db51a63fb' ],
//   investmentCriteria: { stages: [ 'seed' ], ticketSize: 'big' },
//   SupabaseID: 'a99ee758-3d54-4c9f-b6f6-409df3e18403'
// }

/**
 * /api/v1/admin/cms/funds
 * Available methods: POST, DELETE
 *
 * POST: Create a new fund
 * DELETE: Delete a fund
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeFundHandler(makeProps: MakeFundProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { createFundFunction, deleteFundFunction } = makeProps;
    try {
      switch (req.method) {
        case 'POST': {
          if (!req.body || Object.keys(req.body).length === 0) {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('Fund data is required.'));
          }
          const fundData = req.body;
          logger.debug('Fund Data', fundData);
          const newFund = await createFundFunction(fundData);
          return res.status(HTTP_RESPONSE_CODE.CREATED).json({
            message: 'Fund created successfully.',
            data: newFund,
          });
        }
        case 'DELETE': {
          if (!req.body || !req.body.SupabaseID) {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('SupabaseID is required.'));
          }
          const { SupabaseID } = req.body;
          await deleteFundFunction(SupabaseID);
          return res
            .status(HTTP_RESPONSE_CODE.OK)
            .json({ message: 'Fund deleted successfully.' });
        }
        default:
          res.setHeader('Allow', ['POST', 'DELETE']);
          return res
            .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
            .json(errorMessageJSON(`${req.method} is unavailable`));
      }
    } catch (error: any) {
      logger.error(error);
      return res
        .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
        .json(
          errorMessageJSON(
            `${HTTP_RESPONSE.UNHANDLED_FAILURE}: ${error.toString()}`
          )
        );
    }
  };
}

const fundHandler = makeFundHandler({
  createFundFunction: importFundHandler,
  deleteFundFunction: removeFundById,
});

export default withAPIKey(fundHandler);
