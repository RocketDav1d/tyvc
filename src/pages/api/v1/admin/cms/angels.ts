import type { NextApiRequest, NextApiResponse } from 'next';

import {
    errorMessageJSON,
    HTTP_RESPONSE_CODE,
  } from '@/server/utils';


const businessAngel = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.setHeader('Allow', ['POST', 'DELETE']);
    return res
      .status(HTTP_RESPONSE_CODE.METHOD_NOT_ALLOWED)
      .json(errorMessageJSON('POST method is required'));
  }

  if (req.method === 'DELETE') {
    const { SupabaseID } = req.body;
    console.log("delete businessangel", SupabaseID)
    // Handle delete request here
    // You can use the userId or any other parameter to delete the user
    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'BusinessAngel deleted successfully.',
    });
  }


  if (req.method === 'POST') {
    const { userId } = req.query;
    const body = req.body;
    console.log(body)
    const {
      id,
      name,
      HoldingVehicle,
      email,
      about,
      logo,
      image,
      notableCoInvestors,
      boardPositions,
      PortfolioCompany,
      Media,
      website,
      diversity,
      ticket_size,
      stages,
      pro_rata_rights,
      location,
      founded_companies,
      jobs,
      socials,
      createdAt,
      updatedAt
    } = body;

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


    return res.status(HTTP_RESPONSE_CODE.OK).json({
      message: 'BusinessAngel created successfully.',
      body: body,
    });
  }
};

export default businessAngel
