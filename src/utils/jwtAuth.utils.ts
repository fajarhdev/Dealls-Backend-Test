import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h'; // Token expiration time

/**
 * Generate a JWT token for authentication
 * @param payload - The data to be encoded in the token
 * @returns The signed JWT token
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// /**
//  * Verify a JWT token
//  * @param token - The token to be verified
//  * @returns The decoded payload if the token is valid
//  * @throws Error if the token is invalid or expired
//  */
// export const verifyToken = (token: string): string | JwtPayload => {
//   try {
//     return jwt.verify(token, JWT_SECRET);
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// };
