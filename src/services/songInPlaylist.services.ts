import { Request } from 'express';
import { createSong } from './';
import { USERS_DB } from '../configs';

const songInPlaylist = async (req: Request) => {
  if (!req.user) {
    return { message: 'wrong token' };
  }

  const artist = req.artist;
  const newSong = await createSong(req.validateSong);

  if (req.user.playlist) {
    if (!req.user.playlist[artist]) {
      req.user.playlist = { ...req.user.playlist, [artist]: [newSong] };
    } else {
      req.user.playlist[artist].push(newSong);
    }

    const response = {
      uuid: req.user.uuid,
      username: req.user.username,
      playlist: req.user.playlist,
    };

    return response;
  }
};

export default songInPlaylist;
