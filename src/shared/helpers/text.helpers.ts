export const normalizeCase = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('es-MX')
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase('es-MX') + word.slice(1))
    .join(' ');
};

export const removeSpaces = (text: string): string => {
  return text.replace(/\s+/g, '');
};

export const replaceSpecialCharacters = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9]/g, '-');
};

export const normalizeFilmName = (text: string): string => {
  return removeSpaces(replaceSpecialCharacters(text.toLowerCase()));
};

export const normalizeText = (text: string): string => {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase();
};

