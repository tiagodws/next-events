import { toast as rhtToast } from 'react-hot-toast';
import type { AlertProps } from '../alert';
import { Alert } from '../alert';

export const toast = (props: AlertProps) => {
  return rhtToast.custom(
    (toast) => {
      const animationClass = toast.visible ? 'animate-enter' : 'animate-leave';

      return (
        <div className={`${animationClass}`} {...toast.ariaProps}>
          <Alert {...props} />
        </div>
      );
    },
    { id: props.id }
  );
};
