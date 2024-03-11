import type { NextApiRequest, NextApiResponse } from 'next';

import {
    errorMessageJSON,
    HTTP_RESPONSE_CODE,
  } from '@/server/utils';


const portfolioCompany = async (
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
      message: 'PortfolioCompany deleted successfully.',
    });
  }

  if (req.method === 'POST') {
    const { userId } = req.query;
    const body = req.body;
    console.log(body)
    // Extract the necessary fields from the body as per your requirement
    // const { id, name, ... } = body;

    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'PortfolioCompany created successfully.',
      body: body,
    });
  }
};

export default portfolioCompany
