/**
 * Generate a random alphanumeric short code
 * @param length - Length of the short code (default: 6)
 * @returns A random alphanumeric string
 */
export function generateShortCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Check if a short code is valid (alphanumeric, correct length)
 * @param code - The code to validate
 * @param length - Expected length (default: 6)
 * @returns True if valid
 */
export function isValidShortCode(code: string, length: number = 6): boolean {
  const regex = new RegExp(`^[A-Z0-9]{${length}}$`)
  return regex.test(code)
}