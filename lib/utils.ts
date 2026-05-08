import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips <script> and <iframe> tags from HTML strings before rendering
 * via dangerouslySetInnerHTML to prevent React script tag warnings.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .trim()
}

/**
 * Extracts a direct image URL from imgbb embed HTML, BBCode, or returns
 * the value as-is if it is already a plain URL.
 */
export function extractImageUrl(value: string): string {
  if (!value) return ''
  const v = value.trim()
  const srcMatch = v.match(/src=["']?(https?:\/\/[^"'\s>]+)["']?/)
  if (srcMatch) return srcMatch[1]
  const bbMatch = v.match(/\[img\](https?:\/\/[^\[]+)\[\/img\]/i)
  if (bbMatch) return bbMatch[1]
  // Strip any HTML tags and return plain text (the URL)
  return v.replace(/<[^>]*>/g, '').trim()
}
