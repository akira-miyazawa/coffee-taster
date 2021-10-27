/**
 * 平均値を返す
 * @param values 
 * @returns 
 */
export const average = (values: number[]): number => {
  const length = values.length;
  const sum = values.reduce((acc, cur) => acc + cur);
  return sum / length;
};

/**
 * 最大値を返す
 * @param values 
 * @returns 
 */
export const max = (values: number[]): number => {
  return values.reduce((acc, cur) => Math.max(acc, cur))
}