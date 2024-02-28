import jwt from 'jsonwebtoken'
import { CONFIG } from '../configs'

export interface JwtPayloadTypes {
  userId: string
  userRole: 'admin' | 'superAdmin'
}

export const generateAccessToken = (userId: JwtPayloadTypes): any => {
  return jwt.sign(userId, CONFIG.secret.token ?? '', { expiresIn: '3600s' })
}

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, CONFIG.secret.token ?? '')
  } catch {
    return false
  }
}
