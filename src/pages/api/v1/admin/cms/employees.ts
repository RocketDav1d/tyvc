import type { NextApiRequest, NextApiResponse } from 'next';

import {
  importEmployeeHandler,
  removeEmployeeById,
} from '@/server/db/handlers/Employee';
import { withAPIKey } from '@/server/middleware/withProtect';
import {
  errorMessageJSON,
  HTTP_RESPONSE,
  HTTP_RESPONSE_CODE,
} from '@/server/utils';
import { logger } from '@/utils/logger';

type CreateEmployeeFunction = (employeeData: any) => Promise<any>;
type RemoveEmployeeFunction = (employeeId: string) => Promise<any>;

type MakeEmployeeProps = {
  createEmployeeFunction: CreateEmployeeFunction;
  removeEmployeeFunction: RemoveEmployeeFunction;
};

//schema
// {
//   "SupabaseID": "",
//   "name": 'David Korn',
//   "email": 'me@davidkorn.de',
//   "about": 'trs',
//   "position": 'Growth',
//   "location": 'berlin',
//   "diversity": 'white_female',
//   "phoneNumber": 1798077151,
//   "investments": [ '65d52060efe864df55a3a702' ],
//   "startingYear": 1231,
//   "boardPositions": [ '65d60bd13f3ee3983b7e21d4' ]
// }

/**
 * /api/v1/admin/cms/employees
 * Available methods: POST, DELETE
 *
 * POST: Create a new employee
 * DELETE: Delete an employee
 *
 * @param req The next api request
 * @param res A response handler
 * @returns message
 */

export function makeEmployeeHandler(makeProps: MakeEmployeeProps) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      createEmployeeFunction: importEmployeeFunction,
      removeEmployeeFunction,
    } = makeProps;

    try {
      switch (req.method) {
        case 'POST': {
          if (!req.body || Object.keys(req.body).length === 0) {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON('Employee data is required.'));
          }
          const employeeData = req.body;
          const newEmployee = await importEmployeeFunction(employeeData);
          return res.status(HTTP_RESPONSE_CODE.CREATED).json(newEmployee);
        }

        case 'DELETE': {
          const { SupabaseID } = req.query;
          if (typeof SupabaseID !== 'string') {
            return res
              .status(HTTP_RESPONSE_CODE.BAD_REQUEST)
              .json(errorMessageJSON(HTTP_RESPONSE.BAD_REQUEST));
          }
          await removeEmployeeFunction(SupabaseID);
          return res
            .status(HTTP_RESPONSE_CODE.OK)
            .json({ message: 'Employee deleted successfully.' });
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

const employeeHandler = makeEmployeeHandler({
  createEmployeeFunction: importEmployeeHandler,
  removeEmployeeFunction: removeEmployeeById,
});

export default withAPIKey(employeeHandler);
