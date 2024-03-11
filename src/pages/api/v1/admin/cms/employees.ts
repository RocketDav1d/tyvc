import type { NextApiRequest, NextApiResponse } from 'next';

import {
    errorMessageJSON,
    HTTP_RESPONSE_CODE,
  } from '@/server/utils';


const employee = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.setHeader('Allow', ['POST', 'DELETE']);
    return res
      .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
      .json(errorMessageJSON('POST or DELETE method is required'));
  }

  if (req.method === 'DELETE') {
    const { SupabaseID } = req.body;
    console.log("delete board", SupabaseID)
    // Handle delete request here
    // You can use the SupabaseID or any other parameter to delete the board
    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'Employee deleted successfully.',
    });
  }

  if (req.method === 'POST') {
    const { userId } = req.query;
    const body = req.body;
    console.log(body)

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

    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'Employee created successfully.',
      body: body,
    });
  }
};

export default employee
