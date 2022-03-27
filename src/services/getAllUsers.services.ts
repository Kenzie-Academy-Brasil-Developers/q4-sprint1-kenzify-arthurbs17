import { User } from '../models';

const getAllUsers = async (usersDB: Array<User>) => {
  const usersFormated = await usersDB.map((userDB) => {
    const { password, ...users } = userDB;
    return users;
  });
  return usersFormated;
};

export default getAllUsers;
