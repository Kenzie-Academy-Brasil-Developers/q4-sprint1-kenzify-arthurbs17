import { v4 as uuid4 } from 'uuid';
import { User } from '../models';

const createUser = async (user: User): Promise<User> => {
  const newUser: User = await {
    ...user,
    uuid: uuid4(),
    playlist: {},
  };

  return newUser;
};

export default createUser;
