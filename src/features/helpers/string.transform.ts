import { normalizeCase } from 'src/shared/helpers/text.helpers';

export const normalizeArrayFormValue = (value: any) => {
  if (typeof value === 'string') {
    return normalizeCase(value);
  }
  return value.map((keyword: string) => normalizeCase(keyword));
};
