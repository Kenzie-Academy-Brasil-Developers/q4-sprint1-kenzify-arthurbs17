import { Request } from 'express';
import { User } from '../models';

const addCountListenSong = (req: Request) => {
  const { artist, song } = req.query;

  if (!req.user) {
    return { message: 'wrong token' };
  }

  const user: User = req.user;

  if (user.playlist) {
    const playlistInDB = user.playlist[String(artist)];
    const songInDB = playlistInDB?.find(
      (songDB) => songDB.title.toLowerCase() === String(song).toLowerCase()
    );

    if (songInDB) {
      songInDB.listenedByMe += 1;
      return songInDB;
    }

    return songInDB;
  }
};

export default addCountListenSong;
