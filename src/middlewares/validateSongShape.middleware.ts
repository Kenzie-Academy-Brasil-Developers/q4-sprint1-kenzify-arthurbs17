import { Request, Response, NextFunction } from 'express';
import { songShape } from '../shapes';

const validateSongShape = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [artist] = Object.keys(req.body);

  if (!!artist) {
    const [song] = req.body[artist];

    try {
      const verifySong = await songShape.validate(song);
      if (verifySong) {
        req.validateSong = req.body[artist];
        req.artist = artist;
      }
      return next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  }
  return next();
};

export default validateSongShape;
