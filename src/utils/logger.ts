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
