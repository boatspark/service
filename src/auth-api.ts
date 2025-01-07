import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateUser, userById } from '@/db';

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate inputs
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  const userid = await authenticateUser(username, password);

  if (userid < 0) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  // Create JWT Token
  const assertions = { userid, username };
  const token = jwt.sign(assertions, JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );

  res.status(200).json({ message: 'Login successful', token });
};

export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
  const tokens = req.header('Authorization')?.split(' '); // Assuming "Bearer token"
  if (tokens?.length !== 2 || tokens[0]?.toLowerCase() !== "bearer") {
    res.status(403).send('Access denied.');
    return;
  }

  jwt.verify(tokens[1] as string, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Access denied.');
    req.user = user; // Attach decoded user info to the request object
    next();
  });
};
