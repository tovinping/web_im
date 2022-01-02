export function getUniqueFileName(file: File) {
  return `${window.$state.global.account}_${Date.now()}_${file.name.split('.').pop()}`
}