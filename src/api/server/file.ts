import { uploadCos } from 'src/utils/fetch'

export function uploadFile(file: File) {
  return new Promise<IResBase<string>>(resolve => {
    uploadCos({
      file,
      callback: resolve,
    })
  })
}
