export interface JwtPayload {
  userId: number;
  username: string;
  role: number;
  iat?: number;
  exp?: number;
}
