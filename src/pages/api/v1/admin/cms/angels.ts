import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importAngelHandler,
  removeAngelById,
} from '@/server/db/handlers/Angel';
import { withAPIKey } from '@/server/middleware/withProtect';
import { errorMessageJSON, HTTP_RESPONSE_CODE } from '@/server/utils';
import { logger } from '@/utils/logger';

type HandleBusinessAngelFunction = (data: any) => Promise<any>;

type MakeBusinessAngelProps = {
  handleCreateBusinessAngel: HandleBusinessAngelFunction;
  handleDeleteBusinessAngel: HandleBusinessAngelFunction;
};

//   default json - wenn Felder oder Arrays nicht befüllt werden
// {
//   SupabaseID: '65d79942549216a569cd0a8e',
//   name: 'dots automations',
//   HoldingVehicle: [ // if no HoldingVehicle the array is empty, all values inside are required
//     {
//       Name: 'BigBucksHolding',
//       register: '2424423424',
//       registerNumber: '24324234234',
//       id: '65d799428521a446a0aac6bd'
//     }
//   ],
//   email: 'me@davidkorn.de',
//   about: '',
//   logo: 'IMG_5319 2-7.jpeg',
//   image: 'IMG_5320 2-5.jpeg',
//   notableCoInvestors: [ { relationTo: 'BA', value: '65d52525b57b1b5a3c7651b9' } ],
//   boardPositions: [],
//   PortfolioCompany: [],
//   Media: [],
//   website: '',
//   diversity: 'poc_female',
//   ticket_size: '',
//   stages: [],
//   pro_rata_rights: true,
//   location: '',
//   founded_companies: [ // if no founded_companies the array is empty, all values inside are required
//      {
//        id: '65d780628bbdf330e212f57d',
//        status: 'exit',
//        company: 'David Korn'
//      }
//    ],
//   jobs: [ // if no jobs the array is empty, all values inside are required
//     {
//       id: '65d780628bbdf330e212f57e',
//       title: 'Growth ',
//       years: '2',
//       status: 'left',
//       company: 'David Korn'
//     }
//   ],
//   socials: {
//     linkedIn: '',
//     twitter: '',
//     medium: 'https://www.instagram.com/dav1d.korn/',
//     youTube: '',
//     instagram: '',
//     newsletter: ''
//   },
//   createdAt: '2024-02-22T18:58:10.857Z',
//   updatedAt: '2024-02-22T19:00:25.719Z'
// }

/**
 * /api/v1/admin/cms/angels
 * Available methods: POST, DELETE
 *
 * POST: Create a new business angel
 * DELETE: Delete a business angel
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeBusinessAngelHandler(makeProps: MakeBusinessAngelProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { handleCreateBusinessAngel, handleDeleteBusinessAngel } = makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          try {
            if (
              typeof req.body !== 'object' ||
              req.body === null ||
              Array.isArray(req.body)
            ) {
              return res
                .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
                .json(
                  errorMessageJSON('Invalid request body. Expected an object.')
                );
            }
            const data = req.body;
            logger.debug('POST data', data);
            const creationResult = await handleCreateBusinessAngel(data);
            return res.status(HTTP_RESPONSE_CODE.OK).json({
              message: 'BusinessAngel created successfully.',
              data: creationResult,
            });
          } catch (error: any) {
            logger.error(error);
            return res
              .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
              .json(
                errorMessageJSON(
                  `Error creating BusinessAngel: ${error.toString()}`
                )
              );
          }
        }
        case 'DELETE': {
          const { SupabaseID } = req.body;
          logger.debug('DELETE INVESTMENT SupabaseID', SupabaseID);
          if (!SupabaseID) {
            return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).json({
              message: 'Invalid request body. SupabaseID is required.',
            });
          }
          const deletionResult = await handleDeleteBusinessAngel(SupabaseID);
          return res.status(HTTP_RESPONSE_CODE.OK).json({
            message: 'BusinessAngel deleted successfully.',
            data: deletionResult,
          });
        }
        default:
          res.setHeader('Allow', ['POST', 'DELETE']);
          return res
            .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
            .json(errorMessageJSON('POST or DELETE method is required'));
      }
    } catch (error: any) {
      logger.error(error);
      return res
        .status(HTTP_RESPONSE_CODE.SERVER_ERROR)
        .json(errorMessageJSON(`Unhandled failure: ${error.toString()}`));
    }
  };
}

const businessAngelHandler = makeBusinessAngelHandler({
  handleCreateBusinessAngel: importAngelHandler,
  handleDeleteBusinessAngel: removeAngelById,
});

export default withAPIKey(businessAngelHandler);
