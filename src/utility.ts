/**
 * Debounce function
 * @param func initial function
 * @param ms duration
 * @returns debounced function
 */
export const debounce = function (func: any, ms: number) {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    // eslint-disable-next-line
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
};
