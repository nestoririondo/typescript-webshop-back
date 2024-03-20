import { STATUS_CODES } from '../domain/constants';

enum ERROR_DOMAINS {
  DATABASE = 'database',
}

export interface DetailedError extends Error {
  domain?: ERROR_DOMAINS;
  code?: number;
}

export const throwDetailedError = (
  message: string,
  code?: number,
  domain?: ERROR_DOMAINS,
) => {
  throw createDetailedError(message, code, domain);
};

export const createDetailedError = (
  message: string,
  code?: number,
  domain?: ERROR_DOMAINS,
) => {
  const error = new Error(message) as DetailedError;
  error.code = code;
  error.domain = domain;
  return error;
};

export const throwDatabaseError = (message: string) => {
  return throwDetailedError(
    message,
    STATUS_CODES.DEPENDENCY_FAILED,
    ERROR_DOMAINS.DATABASE,
  );
};
