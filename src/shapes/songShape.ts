import * as yup from 'yup';

const songShape = yup.object().shape({
  title: yup.string().required('Campo obrigatório!'),
  duration: yup.string().required('Campo obrigatório!'),
  releasedDate: yup.string().required('Campo obrigatório!'),
});

export default songShape;
