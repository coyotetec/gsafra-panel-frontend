import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function handleChangeInput<stateType>(
  setState: Dispatch<SetStateAction<stateType>>,
  { target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
) {
  const { name, value } = target;
  setState((prevState) => ({ ...prevState, [name]: value }));
}
