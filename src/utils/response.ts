/**
 * Determines if an HTTP status code falls in the 4xx or 5xx error ranges.
 *
 * @param {number} statusCode - HTTP status code
 * @return {boolean}
 */
export const isErrorStatusCode = (statusCode: number) => {
  return statusCode >= 400 && statusCode < 600;
};
