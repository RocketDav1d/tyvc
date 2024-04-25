
import * as deepl from 'deepl-node';

import { logger } from '@/utils/logger';

export const translate = async (text: string): Promise<string> => {
    const authKey = process.env.DEEPL_API_KEY;

    if (!authKey) {
      logger.debug('DEEPL_API_KEY is not defined');
      throw new Error('DEEPL_API_KEY is not defined');
    }

    const translator = new deepl.Translator(authKey);
    const result = await (async () => {
      const translation = await translator.translateText(text, null, 'en-US');
      logger.debug('translation:', translation.text);
      return translation.text;
    })();

    return result;
  }
