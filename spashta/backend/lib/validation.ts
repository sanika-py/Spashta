import { badRequest } from '@backend/lib/http'

/** Minimal dependency-free validators. Swap for zod if the API surface grows. */

export function requireString(
  body: Record<string, unknown>,
  key: string,
  { maxLength = 200 }: { maxLength?: number } = {},
): string {
  const value = body[key]
  if (typeof value !== 'string' || value.trim() === '') {
    throw badRequest(`"${key}" is required and must be a non-empty string.`)
  }
  if (value.length > maxLength) {
    throw badRequest(`"${key}" must be at most ${maxLength} characters.`)
  }
  return value.trim()
}

export function optionalString(
  body: Record<string, unknown>,
  key: string,
  fallback: string,
): string {
  return body[key] === undefined ? fallback : requireString(body, key)
}

export function requireEnum<T extends string>(
  body: Record<string, unknown>,
  key: string,
  allowed: readonly T[],
): T {
  const value = requireString(body, key)
  if (!allowed.includes(value as T)) {
    throw badRequest(`"${key}" must be one of: ${allowed.join(', ')}.`)
  }
  return value as T
}

export function requireNumberInRange(
  body: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
): number {
  const value = body[key]
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw badRequest(`"${key}" is required and must be a number.`)
  }
  if (value < min || value > max) {
    throw badRequest(`"${key}" must be between ${min} and ${max}.`)
  }
  return value
}

export function requireArray(
  body: Record<string, unknown>,
  key: string,
  { min = 1, max = 50 }: { min?: number; max?: number } = {},
): unknown[] {
  const value = body[key]
  if (!Array.isArray(value)) {
    throw badRequest(`"${key}" is required and must be an array.`)
  }
  if (value.length < min || value.length > max) {
    throw badRequest(`"${key}" must contain between ${min} and ${max} items.`)
  }
  return value
}

/** Clamps a query-string integer, e.g. `?limit=20`. */
export function parseLimit(raw: string | null, fallback: number, max: number): number {
  if (!raw) return fallback
  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed) || parsed < 1) {
    throw badRequest('"limit" must be a positive integer.')
  }
  return Math.min(parsed, max)
}
