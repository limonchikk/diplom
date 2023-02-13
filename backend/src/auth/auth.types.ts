export type JwtPayload = {
  id: string
}

export type AuthTokens = {
  accessToken: string
}

export type JwtToken = {
  id: string
  iat: number
  exp: number
}
