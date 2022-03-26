import * as yup from 'yup';
import bcrypt from 'bcryptjs';

const userShape = yup.object().shape({
  username: yup.string().required('username is a required field'),
  password: yup
    .string()
    .required('password is a required field')
    .transform((pwd) => bcrypt.hashSync(pwd, 10)),
});

export default userShape;
