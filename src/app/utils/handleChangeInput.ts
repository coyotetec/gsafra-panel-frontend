import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function handleChangeInput<stateType>(
  setState: Dispatch<SetStateAction<stateType>>,
  { target }: ChangeEvent<HTMLInputElement>,
) {
  const { name, value } = target;
  setState((prevState) => ({ ...prevState, [name]: value }));
}
