export const normalizeCase = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('es-MX')
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase('es-MX') + word.slice(1))
    .join(' ');
};
