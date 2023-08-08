'use client';

import type { FC } from 'react';
import { Toaster as RhtToaster } from 'react-hot-toast';

export const Toaster: FC = () => {
  return <RhtToaster position="top-center" reverseOrder />;
};
