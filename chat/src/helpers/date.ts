import { format, OptionsWithTZ, utcToZonedTime } from 'date-fns-tz';

import { TimeZone } from 'config/localData';

const defaultFormats = {
  datetime: 'E, MMM d, yyyy, h:mm a',
  datetimeShort: 'M/d/yyyy, h:mm a',
  date: 'E, MMM d, yyyy',
  dateShort: 'M/d/yyyy',
  time: 'h:mm a',
};
export type DefaultDateFormat = keyof typeof defaultFormats;
export type FormatDateData = {
  date?: string | number | Date | null;
  formatString?: string;
  defaultFormat?: DefaultDateFormat;
  options?: OptionsWithTZ;
  shiftTimezone?: TimeZone;
};
export const formatDate = (data: FormatDateData) => {
  const { date, formatString, defaultFormat, options, shiftTimezone } = data;
  let defaultFormatString = defaultFormat
    ? defaultFormats[defaultFormat]
    : undefined;
  if (options?.timeZone && defaultFormatString) {
    defaultFormatString += ' zzz';
  }
  const formatStringToUse = formatString ?? defaultFormatString;

  if (!(date || date === 0) || date < 0 || !formatStringToUse) {
    return '';
  }

  const dateToUse = shiftTimezone ? utcToZonedTime(date, shiftTimezone) : date;

  return format(dateToUse, formatStringToUse, options);
};
