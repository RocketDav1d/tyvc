import type { NextApiRequest, NextApiResponse } from 'next';

import {
    errorMessageJSON,
    HTTP_RESPONSE_CODE,
  } from '@/server/utils';


const fund = async (
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
      message: 'Fund deleted successfully.',
    });
  }

  if (req.method === 'POST') {
    const { userId } = req.query;
    const body = req.body;
    console.log(body)

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


    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'Fund created successfully.',
      body: body,
    });
  }
};

export default fund
