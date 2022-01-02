import { uploadCos } from 'src/utils/fetch'

export async function uploadFile(file: File) {
  uploadCos({ file })
}
