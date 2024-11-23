export const onlyNumbers = (arr: (number | string)[]): number[] => {
  return arr.filter((item): item is number => typeof item === 'number');
};
