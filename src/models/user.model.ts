import { Song } from './index';

type User = {
  uuid: string;
  username: string;
  password: string;
  playlist: { [key: string]: Array<Song> };
};

export default User;
