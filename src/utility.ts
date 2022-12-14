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

/**
 * Calc remote time
 * @param dt open weather date time
 * @param timezone remote timezone
 * @returns time for remote timezone
 */
export const timeForRemote = function (dt: number, timezone: number): Date {
  const localTimezoneOffset = new Date().getTimezoneOffset() * 60000;
  const utcTime = dt * 1000 + localTimezoneOffset;

  return new Date(utcTime + timezone * 1000);
};
