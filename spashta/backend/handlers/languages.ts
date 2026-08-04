import { badRequest, handle, json } from '@backend/lib/http'
import { listLanguages, resolveLanguage } from '@backend/services/language-service'
import type { Language } from '@backend/domain/types'

const STATUSES = ['live', 'pilot'] as const

/** GET /api/languages — supported languages plus the best match for this request. */
export const listLanguagesHandler = handle((request: Request) => {
  const raw = new URL(request.url).searchParams.get('status')

  if (raw !== null && !STATUSES.includes(raw as Language['status'])) {
    throw badRequest(`"status" must be one of: ${STATUSES.join(', ')}.`)
  }

  const data = listLanguages((raw as Language['status'] | null) ?? undefined)

  return json({
    data,
    count: data.length,
    preferred: resolveLanguage(request.headers.get('accept-language')),
  })
})
