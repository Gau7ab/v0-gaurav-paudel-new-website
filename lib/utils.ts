import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Strips harmful tags from HTML strings before rendering
 * via dangerouslySetInnerHTML to prevent React tag warnings.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  const pattern1 = /<[a-z]+\b[^<]*(?:(?!<\/[a-z]+>)<[^<]*)*<\/[a-z]+>/gi
  return html
    .replace(pattern1, '')
    .trim()
}

/**
 * Extracts a direct image URL from imgbb embed HTML, BBCode, or returns
 * the value as-is if it is already a plain URL. Also strips all HTML tags
 * including dangerous tags to prevent XSS vulnerabilities.
 */
export function extractImageUrl(value: string): string {
  if (!value) return ''
  let v = value.trim()
  
  // First, remove all HTML tags completely
  v = v.replace(/<[^>]*>/g, '')
  
  // Try to extract src attribute from remaining content
  const srcMatch = v.match(/src=["']?(https?:\/\/[^"'\s>]+)["']?/)
  if (srcMatch) return srcMatch[1]
  
  // Try BBCode format
  const bbMatch = v.match(/\[img\](https?:\/\/[^\[]+)\[\/img\]/i)
  if (bbMatch) return bbMatch[1]
  
  // Extract any http/https URL from the string
  const urlMatch = v.match(/(https?:\/\/[^\s<>"]*)/i)
  if (urlMatch) return urlMatch[1]
  
  // Return cleaned text
  return v.trim()
}
