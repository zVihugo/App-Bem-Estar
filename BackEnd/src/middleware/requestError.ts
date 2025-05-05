import { Request, Response, NextFunction } from 'express';

export const requestError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error: ', err });
  next();
};
