import { normalizeCase } from 'src/shared/helpers/text.helpers';

export const normalizeArrayFormValue = (value: any) => {
  if (typeof value === 'string') {
    return [normalizeCase(value).toLowerCase()];
  }
  return value.map((keyword: string) => normalizeCase(keyword));
};

export const normalizeKeyWords = (value: any) => {
  if (typeof value === 'string') {
    return [normalizeCase(value).toLowerCase()];
  }
  return value.map((keyword: string) => normalizeCase(keyword).toLowerCase());
};
