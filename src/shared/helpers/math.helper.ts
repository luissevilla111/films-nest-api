export const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export const roundDownToOneDecimal = (value: number): number => {
  return Math.floor(value * 10) / 10;
};

export const calculateAverage = (value1: number, value2: number): number => {
  return (value1 + value2) / 2;
};

export const calculateAverageDownToOneDecimal = (
  value1: number,
  value2: number,
): number => {
  return Math.floor(((value1 + value2) / 2) * 10) / 10;
};

export const calculateAverageDownToTwoDecimals = (
  value1: number,
  value2: number,
): number => {
  return Math.round(((value1 + value2) / 2) * 100) / 100;
};
