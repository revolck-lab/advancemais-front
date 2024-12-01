export const logInfo = (message: string, data?: any) => {
  console.info(`[INFO] ${message}`, data || '')
}

export const logError = (message: string, error?: any) => {
  console.error(`[ERROR] ${message}`, error || '')
}
