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
  const error: DetailedError = new Error(message);
  error.code = code;
  error.domain = domain;
  throw error;
};

export const throwDatabaseError = (message: string) => {
  return throwDetailedError(
    message,
    STATUS_CODES.DEPENDENCY_FAILED,
    ERROR_DOMAINS.DATABASE,
  );
};
