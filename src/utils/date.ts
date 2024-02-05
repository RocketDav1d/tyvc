export const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export const formatDateString = (dateRaw: string): string => {
  const date = dateRaw ? new Date(dateRaw) : Date.now();
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

export const formatDateToSlug = (dateRaw: string): string => {
  const date = dateRaw ? new Date(dateRaw) : Date.now();
  const dateTimeFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [{ value: day }, , { value: month }, , { value: year }, ,] =
    dateTimeFormat.formatToParts(date);
  return `${day}-${month}-${year}`;
};

export const formatMillis = (millis: number): string => {
  const date = new Date(millis);
  const dateTimeFormat = new Intl.DateTimeFormat('de', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const [{ value: hour }, , { value: minute }, , { value: second }, ,] =
    dateTimeFormat.formatToParts(date);
  return `${parseInt(hour) - 1}:${minute}:${second}`;
};

export const validateDateParam = (date: string, callback: () => void) => {
  // Check if date str matches regex
  const re = /\d\d\-\d\d\-\d\d\d\d/i;
  if (!date.match(re)) {
    callback();
  }
  return;
};

export const parseDate = (dateStr: string): Date | null => {
  if (dateStr && dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
    const _dateParts = dateStr.split('-');
    const _date = new Date(
      `${_dateParts[2]}-${_dateParts[1]}-${_dateParts[0]}`
    );
    _date.setHours(12, 0, 0, 0);

    return _date;
  }

  return null;
};
