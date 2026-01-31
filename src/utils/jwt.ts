import jwt from 'jsonwebtoken';

export const signToken = (payload: { id: string; role: string }): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): { id: string; role: string } => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.verify(token, secret) as { id: string; role: string };
};