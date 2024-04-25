export const logger = {
  info: (...args: any[]) => {
    console.info(...args);
  },
  debug: (...args: any[]) => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      console.info(...args);
    }
  },
  error: (...args: any[]) => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test'
    ) {
      console.error(...args);
    }
  },
};
