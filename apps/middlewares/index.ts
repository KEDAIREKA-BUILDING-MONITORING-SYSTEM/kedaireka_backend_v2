import { useAuthorization } from './access'
import { uploadMidleWare } from './upload-file'

export const middleware = { useAuthorization, uploadMidleWare }
