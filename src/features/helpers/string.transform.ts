import { normalizeCase, normalizeText } from 'src/shared/helpers/text.helpers';

export const normalizeArrayFormValue = (value: any) => {
  if (typeof value === 'string') {
    return [normalizeCase(value)];
  }
  return value.map((keyword: string) => normalizeCase(keyword));
};

export const normalizeKeyWords = (value: any) => {
  if (typeof value === 'string') {
    return [normalizeCase(value).toLowerCase()];
  }
  return value.map((keyword: string) => normalizeCase(keyword).toLowerCase());
};


export const normalizeArrayLowerCase = (value: any) => {
  if (typeof value === 'string') {
    return [normalizeText(value)];
  }
  return value.map((keyword: string) => normalizeText(keyword));
};