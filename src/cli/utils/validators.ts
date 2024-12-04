export function validateAccessToken(token: string): boolean {
  return typeof token === 'string' && token.length > 0;
}

export function validatePublicToken(token: string): boolean {
  return typeof token === 'string' && token.length > 0;
}

export function validateDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export function validateInstitutionId(id: string): boolean {
  return typeof id === 'string' && id.length > 0;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
} 