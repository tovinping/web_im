export default function getLogger(module: string) {
  return {
    info(...args: any[]) {
      console.log(`[${module}] `, ...args)
    },
    warn(...args: any[]) {
      console.warn(`[${module}] `, ...args)
    },
    error(...args: any[]) {
      console.error(`[${module}] `, ...args)
    },
  }
}
window.getLogger = getLogger
const logger = getLogger('utils_logger')
window.onerror = e => {
  logger.error('window on error=', e)
}
