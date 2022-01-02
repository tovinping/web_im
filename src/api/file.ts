import { uploadCos } from 'src/utils/fetch'

export function uploadFile(file: File) {
  return new Promise(resolve => {
    uploadCos({ file, callback: resolve })
  })
}
