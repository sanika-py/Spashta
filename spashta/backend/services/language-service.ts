import { DEFAULT_LANGUAGE, LANGUAGE_CODES, languages } from '@backend/config/languages'
import type { Language, LanguageCode } from '@backend/domain/types'
import { badRequest } from '@backend/lib/http'

export function listLanguages(status?: Language['status']): Language[] {
  return status ? languages.filter((language) => language.status === status) : languages
}

export function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === 'string' && (LANGUAGE_CODES as readonly string[]).includes(value)
}

export function getLanguage(code: string): Language {
  const language = languages.find((entry) => entry.code === code)
  if (!language) {
    throw badRequest(`Unsupported language "${code}".`, { supported: LANGUAGE_CODES })
  }
  return language
}

/**
 * Picks the best supported language from an Accept-Language header,
 * falling back to English.
 */
export function resolveLanguage(acceptLanguage: string | null): LanguageCode {
  if (!acceptLanguage) return DEFAULT_LANGUAGE

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.split('-')[0].toLowerCase(), quality: q ? Number.parseFloat(q) : 1 }
    })
    .filter((entry) => Number.isFinite(entry.quality))
    .sort((a, b) => b.quality - a.quality)

  return ranked.find((entry) => isLanguageCode(entry.tag))?.tag as LanguageCode ?? DEFAULT_LANGUAGE
}
