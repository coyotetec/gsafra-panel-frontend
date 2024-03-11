import { ZodError } from 'zod';
import { formErrorType } from '../../types/global';

export function formatZodError(errors: ZodError) {
  const transformedErrors: formErrorType = {};

  errors.issues.forEach((error) => {
    const key = error.path.join('.');
    const value = error.message;
    transformedErrors[key] = value;
  });

  return transformedErrors;
}
