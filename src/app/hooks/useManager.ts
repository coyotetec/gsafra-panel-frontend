import { useContext } from 'react';
import { ManagerContext } from '../contexts/ManagerContext';

export function useManager() {
  return useContext(ManagerContext);
}
