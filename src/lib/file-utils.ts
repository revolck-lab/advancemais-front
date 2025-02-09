/**
 * Format a file size in bytes into a human-readable string.
 *
 * @param bytes - The file size in bytes.
 * @returns A formatted string representing the file size.
 */
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 MB'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / Math.pow(1024, i)
  return `${Math.round(value)} ${sizes[i]}`
}
