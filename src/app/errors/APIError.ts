export class APIError extends Error {
  constructor(message: string) {
    super(message);
    super.name = 'APIError';
  }
}
