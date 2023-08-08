import type { StatusType } from '@/types';
import {
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FaceFrownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import type { FC, ReactNode } from 'react';

export type AlertProps = {
  id?: string;
  message?: string | ReactNode | null;
  statusType?: StatusType;
};

const icon = {
  default: (
    <ChatBubbleBottomCenterTextIcon strokeWidth={2} className="w-6 h-6" />
  ),
  info: <InformationCircleIcon strokeWidth={2} className="w-6 h-6" />,
  warning: <ExclamationTriangleIcon strokeWidth={2} className="w-6 h-6" />,
  error: <FaceFrownIcon strokeWidth={2} className="w-6 h-6" />,
  success: <CheckCircleIcon strokeWidth={2} className="w-6 h-6" />,
};

const statusTypeClasses = {
  default: '',
  info: 'alert-info',
  warning: 'alert-warning',
  error: 'alert-error',
  success: 'alert-success',
};

export const Alert: FC<AlertProps> = (props) => {
  const { id, message, statusType = 'default' } = props;

  return (
    <div id={id} className={`alert ${statusTypeClasses[statusType]}`}>
      {icon[statusType]}
      <span>{message}</span>
    </div>
  );
};
