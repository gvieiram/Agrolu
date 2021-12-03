/* eslint-disable no-return-assign */
import { Alert } from 'react-native';

export default function AlertError(error) {
  const { response } = error;

  if (response.data.error) {
    return Alert.alert('Houve erro', response.data.error);
  }

  let errors = '';

  Object.keys(response.data.errors).map(
    i => (errors += `${response.data.errors[i][0]}\n`),
  );

  return Alert.alert('Houve erros nos seguintes campos', errors);
}
