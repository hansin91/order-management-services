import { IncomingHttpHeaders } from 'http'

export { AuthService } from './auth.service'
export const MOBILE_URL = process.env.MOBILE_URL + '/api'

export const setupHeaders = (token?: string) => {
  let headers = {'Content-Type': 'application/json'} as IncomingHttpHeaders
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return headers
}