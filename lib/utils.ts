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
 * the value as-is if it is already a plain URL. Also strips all HTML tags
 * including script tags to prevent XSS vulnerabilities.
 */
export function extractImageUrl(value: string): string {
  if (!value) return ''
  let v = value.trim()
  
  // First, remove all script and iframe tags completely
  v = v.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  v = v.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  
  // Try to extract src attribute from img or other tags
  const srcMatch = v.match(/src=["']?(https?:\/\/[^"'\s>]+)["']?/)
  if (srcMatch) return srcMatch[1]
  
  // Try BBCode format
  const bbMatch = v.match(/\[img\](https?:\/\/[^\[]+)\[\/img\]/i)
  if (bbMatch) return bbMatch[1]
  
  // Extract any http/https URL from the string
  const urlMatch = v.match(/(https?:\/\/[^\s<>"]*)/i)
  if (urlMatch) return urlMatch[1]
  
  // Strip any remaining HTML tags
  v = v.replace(/<[^>]*>/g, '').trim()
  
  return v
}
