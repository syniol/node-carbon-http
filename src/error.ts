export interface CarbonError extends Error {
  code?: number
}

export function NewCarbonError(
  msg: string,
  name?: string,
  stack?: string,
  code?: number,
): Readonly<CarbonError> {
  const err: CarbonError = {
    name: name || 'CarbonHttpException',
    message: msg,
  }

  if (stack) {
    err.stack = stack
  }

  if (code) {
    err.code = code
  }

  return err
}
