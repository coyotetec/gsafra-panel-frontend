import { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';

export function useSidebarData() {
  return useContext(SidebarContext);
}
