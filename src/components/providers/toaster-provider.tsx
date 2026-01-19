'use client';

import { Toaster } from 'sonner';

/**
 * Provider del sistema de notificaciones Toast
 * Usa Sonner para mostrar feedback al usuario
 * @see coder.md - 3.2 Toast al Usuario
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
