import * as dayjs from 'dayjs';

export const stringToDateDDMMYYYY = (date: string): Date => {
  return dayjs(date, 'DD/MM/YYYY').toDate();
};
