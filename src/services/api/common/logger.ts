type LogData = Record<string, unknown> | string | number | null | undefined

export const logInfo = (message: string, data?: LogData): void => {
  console.info(`[INFO] ${message}`, data ?? '')
}

export const logError = (message: string, error?: LogData): void => {
  console.error(`[ERROR] ${message}`, error ?? '')
}

export const logDebug = (message: string, debugInfo?: LogData): void => {
  console.debug(`[DEBUG] ${message}`, debugInfo ?? '')
}
