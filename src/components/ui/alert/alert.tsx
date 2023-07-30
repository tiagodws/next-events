import {
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';

type AlertProps = {
  message: string;
  type?: 'default' | 'info' | 'warning' | 'error' | 'success';
};

const icon = {
  default: (
    <ChatBubbleBottomCenterTextIcon strokeWidth={2} className="w-6 h-6" />
  ),
  info: <InformationCircleIcon strokeWidth={2} className="w-6 h-6" />,
  warning: <ExclamationTriangleIcon strokeWidth={2} className="w-6 h-6" />,
  error: <XCircleIcon strokeWidth={2} className="w-6 h-6" />,
  success: <CheckCircleIcon strokeWidth={2} className="w-6 h-6" />,
};

const alertClasses = {
  default: '',
  info: 'alert-info',
  warning: 'alert-warning',
  error: 'alert-error',
  success: 'alert-success',
};

export const Alert: FC<AlertProps> = (props) => {
  const { message, type = 'default' } = props;

  return (
    <div className={`alert ${alertClasses[type]}`}>
      {icon[type]}
      <span>{message}</span>
    </div>
  );
};
