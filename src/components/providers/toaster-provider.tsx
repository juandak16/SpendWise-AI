'use client';

import { Toaster } from 'sonner';

/**
 * Toast notification system provider
 * Uses Sonner for user feedback
 * @see dev.md - 3.2 Toast to User pattern
 */
export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: 'inherit',
        },
      }}
    />
  );
};
