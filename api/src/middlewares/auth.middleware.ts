import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const API_KEY = process.env.API_KEY; 

  if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Não autorizado. API Key inválida ou ausente.' }); 
  }

  next();
};