import { User } from '../models';
import { Request } from 'express';
import { createSong } from './';

const songInPlaylist = async (req: Request) => {
  if (!req.user) {
    return { message: 'user not found' };
  }

  const user = req.user;
  const [artist] = Object.keys(req.body);
  const newSong = await createSong(req.body[artist]);

  if (user.playlist) {
    const playlist = user.playlist[artist];

    if (!user.playlist[artist]) {
      user.playlist = { ...user.playlist, ...{ [artist]: [newSong] } };
    }

    playlist.push(newSong);

    const { password, ...response } = user;

    return response;
  }
};

export default songInPlaylist;
