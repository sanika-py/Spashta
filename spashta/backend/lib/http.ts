/** Thin response + error helpers so handlers stay declarative. */

export class ApiError extends Error {
  status: number
  code: string
  details?: unknown

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new ApiError(400, 'bad_request', message, details)

export const notFound = (message: string) => new ApiError(404, 'not_found', message)

const noStore = { 'Cache-Control': 'no-store' }

export function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return Response.json(data, { status, headers: { ...noStore, ...headers } })
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return json(
      { error: { code: error.code, message: error.message, details: error.details } },
      error.status,
    )
  }

  console.log('[v0] unhandled api error:', error)
  return json({ error: { code: 'internal_error', message: 'Something went wrong.' } }, 500)
}

/** Wraps a handler so thrown ApiErrors become well-shaped JSON responses. */
export function handle<Args extends unknown[]>(
  fn: (...args: Args) => Promise<Response> | Response,
) {
  return async (...args: Args): Promise<Response> => {
    try {
      return await fn(...args)
    } catch (error) {
      return errorResponse(error)
    }
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json()
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      throw badRequest('Request body must be a JSON object.')
    }
    return body as Record<string, unknown>
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw badRequest('Request body must be valid JSON.')
  }
}
