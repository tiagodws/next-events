import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Alert, AlertProps } from '..';
import { ToasterContext } from './toaster-context';

type ToasterProviderProps = {
  children?: ReactNode;
};

export const ToasterProvider: FC<ToasterProviderProps> = ({ children }) => {
  const [current, setCurrent] = useState<AlertProps>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(!!current), [current]);

  const showToast = useCallback((toast: AlertProps) => {
    setCurrent(toast);
  }, []);

  return (
    <ToasterContext.Provider value={{ showToast }}>
      <div className="toast toast-top toast-center">
        {isVisible && current && <Alert {...current} />}
      </div>
    </ToasterContext.Provider>
  );
};
