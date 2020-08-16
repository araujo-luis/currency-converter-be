import { Request, Response } from 'express';

export const findByName = async (req: Request, res: Response) => {
  res.send('Hello world')
}
