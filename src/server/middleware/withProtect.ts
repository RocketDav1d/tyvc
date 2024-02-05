import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type HandlerFunction = {
  (req: NextApiRequest, res: NextApiResponse, payload: any): any;
};

export const withProtect = (handler: HandlerFunction) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.headers['x-api-key']) {
      // Check for api key
      const apiKey = req.headers['x-api-key'];

      if (apiKey !== process.env.TEST_API_KEY) {
        return res.status(404).end();
      }

      return handler(req, res, { email: process.env.TEST_EMAIL });
    }

    const token = await getToken({ req });

    if (!token) {
      return res.status(404).end();
    }
    return handler(req, res, { email: token.email });
  };
};

export const withAPIKey = (handler: HandlerFunction) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const apiKey = req.headers['api_key'] as string;

    if (apiKey !== process.env.API_KEY) {
      return res.status(404).end();
    }
    return handler(req, res, {});
  };
};
