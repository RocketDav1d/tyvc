import type { NextApiRequest, NextApiResponse } from 'next';

import {
    errorMessageJSON,
    HTTP_RESPONSE_CODE,
  } from '@/server/utils';


const board = async (
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
      message: 'Board deleted successfully.',
    });
  }

  if (req.method === 'POST') {
    const { userId } = req.query;
    const body = req.body;
    console.log(body)

// schema
  // {
  //   name: 'dots automations',
  //   year: '2021',
  //   title: 'fwwef',
  //   status: 'fwefw',
  //   boardSeatOn: [ { id: '65d781d7e41b80b434b8eb0c', portfoliocompany: [Array] } ],
  //   SupabaseID: 'a098671f-72c9-4245-bdfa-be86df444e89'
  // }


    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'Board created successfully.',
      body: body,
    });
  }
};

export default board
