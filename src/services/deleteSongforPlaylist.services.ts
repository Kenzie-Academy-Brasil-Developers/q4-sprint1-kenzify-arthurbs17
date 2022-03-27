import { Request, Response } from 'express';
import { User } from '../models';
import { StatusCodes } from 'http-status-codes';

const deleteSongForPlaylist = (req: Request, res: Response) => {
  const { artist, song } = req.query;

  if (!req.user) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'wrong token' });
  }

  const user: User = req.user;

  if (user.playlist) {
    const playlistInDB = user.playlist[String(artist)];
    const songInDB = playlistInDB.find(
      (songDB) => songDB.title.toLowerCase() === String(song).toLowerCase()
    );

    if (songInDB) {
      const indexSong = playlistInDB.indexOf(songInDB);
      playlistInDB.splice(indexSong, 1);
      return { message: 'deleted' };
    }

    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'music not found' });
  }
};

export default deleteSongForPlaylist;
