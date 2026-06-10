import type { AppTimestamp } from './types'

export function formatDate(value: AppTimestamp) {
  if (!value) {
    return ''
  }

  const date = value instanceof Date ? value : value.toDate()
  return new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

export function toInputDate(value: Date) {
  return value.toISOString().slice(0, 16)
}
