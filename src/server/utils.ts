const HTTP_RESPONSE = {
  UNEXPECTED_ERROR: 'Unexpected Error',
  NOT_AUTHENTICATED: 'Not Authenticated',
  UNHANDLED_FAILURE: 'Unhandled Exception',
  RESOURCE_NOT_FOUND: 'Resource not found',
  DATABASE_ERROR: 'Database returned Error',
  BAD_REQUEST: 'Bad Request',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  METHOD_NOT_ALLOWED: 'Method Not Allowed',
};

enum HTTP_RESPONSE_CODE {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  SERVER_ERROR = 500,
}

export { HTTP_RESPONSE, HTTP_RESPONSE_CODE };

function errorMessageJSON(msg: string): any {
  return { message: msg, error: true };
}

function dataJSON(data: any): any {
  return { data };
}

const formatDate = (date: Date): string => {
  const dateTimeFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });
  const [
    { value: weekday },
    ,
    { value: day },
    ,
    { value: month },
    ,
    { value: year },
    ,
  ] = dateTimeFormat.formatToParts(date);
  return `${weekday} ${day}.${month}.${year}`;
};

/**
 * Generates a URL-friendly "slug" from a given string.
 * @param {string} text - The string to convert to a slug.
 * @returns {string} The generated slug.
 */
const generateSlug = (text: string): string => {
  const randomId = Math.floor(Math.random() * 90000) + 10000; // Generates a random number between 10000 and 99999
  return (
    text
      .toString()
      .normalize('NFD') // Normalize to NFD Unicode form
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') + // Replace multiple - with single -
    '-' +
    randomId.toString()
  ); // Append the random ID
};

export { errorMessageJSON, dataJSON, formatDate, generateSlug };
