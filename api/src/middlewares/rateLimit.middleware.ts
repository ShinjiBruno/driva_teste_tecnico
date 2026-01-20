import { Request, Response, NextFunction } from 'express';


export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const CHANCE_DE_ERRO = 0.1; //10%

  if (Math.random() < CHANCE_DE_ERRO) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: "Simulação de limite de taxa atingido. Tente novamente." 
    });
  }

  next();
};