import { Song } from '../models';

const createSong = async (artist: Array<Song>): Promise<Song> => {
  const [song] = await artist;
  song.title = song.title
    .split(' ')
    .map(
      (word) => word[0].toUpperCase() + word.substring(1).toLocaleLowerCase()
    )
    .join(' ');
  song.listenedByMe = 0;

  return song;
};

export default createSong;
