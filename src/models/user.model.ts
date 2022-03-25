import { Playlist } from './index';

type User = {
  id: string;
  username: string;
  password: string;
  playlist: Array<Playlist>;
};

export default User;
