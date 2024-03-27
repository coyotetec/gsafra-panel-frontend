import { useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

export function usePanelContext() {
  return useContext(PanelContext);
}
