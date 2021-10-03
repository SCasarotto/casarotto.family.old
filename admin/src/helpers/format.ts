import { format } from 'date-fns';

export const convertToDateTimeString = (
  epoch: number | Date | undefined | null,
) => {
  if (!epoch) {
    return ' -- ';
  }

  return format(epoch, 'E, MMM d, yyyy, h:mm a');
};
export const convertToDateString = (
  epoch: number | Date | undefined | null,
) => {
  if (!epoch) {
    return ' -- ';
  }

  return format(epoch, 'E, MMM d, yyyy');
};
export const convertToDateTimeShort = (
  epoch: number | Date | undefined | null,
) => {
  if (!epoch) {
    return ' -- ';
  }

  return format(epoch, 'M/d/yyyy, h:mm a');
};
export const convertToDateShort = (epoch: number | Date | undefined | null) => {
  if (!epoch) {
    return ' -- ';
  }

  return format(epoch, 'M/d/yyyy');
};
export const convertToTime = (epoch: number | Date | undefined | null) => {
  if (!epoch) {
    return ' -- ';
  }

  return format(epoch, 'h:mm a');
};

export const objectOfBoolsToArray = (object?: { [key: string]: boolean }) => {
  if (!object) {
    return [];
  }
  const arrayToReturn = [];
  for (const key in object) {
    if (object[key]) {
      arrayToReturn.push(key);
    }
  }
  return arrayToReturn;
};
