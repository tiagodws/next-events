import { useContext } from 'react';
import { ToasterContext, ToasterContextValue } from './toaster-context';

export const useToaster = (): ToasterContextValue => {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToaster must be used within an ToasterProvider');
  }

  return context;
};
