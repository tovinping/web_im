export function getUniqueFileName(file: File) {
  return `${window.$state.global.account}_${Date.now()}.${file.name.split('.').pop()}`
}