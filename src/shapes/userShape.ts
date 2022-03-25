import * as yup from 'yup';
import bcrypt from 'bcryptjs';

const userShape = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .required()
    .transform((pwd) => bcrypt.hashSync(pwd, 10)),
});

export default userShape;
