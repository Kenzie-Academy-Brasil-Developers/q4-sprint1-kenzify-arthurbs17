import * as yup from 'yup';

const playlistShape = yup.object().shape({
  title: yup.string().required(),
  duration: yup.number().required(),
  releasedDate: yup.date().required(),
});

export default playlistShape;
