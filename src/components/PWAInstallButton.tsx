import React from 'react';

interface PWAInstallButtonProps {
  isInstalled: boolean;
  onOpenModal: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  isInstalled,
  onOpenModal
}) => {
  if (isInstalled) return null;

  return (
    <button
      type="button"
      className="btn-pwa-install"
      onClick={onOpenModal}
      aria-label="Instalar como aplicación móvil o APK"
      title="Instalar en tu teléfono móvil o dispositivo"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
      <span>Instalar App Móvil</span>
    </button>
  );
};
