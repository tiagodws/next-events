import { createContext } from 'react';
import { AlertProps } from '../alert';

export type ToasterContextValue = {
  showToast(toast: AlertProps): void;
};

export const ToasterContext = createContext<ToasterContextValue>({
  showToast: () => null,
});
