import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Güvenli bir anahtar kullanın
const TOKEN_EXPIRATION = '1h'; // Token süresi (ör. 1 saat)

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};
