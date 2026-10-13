import React from 'react';

interface MobileAppInstallModalProps {
  isOpen: boolean;
  isInstallable: boolean;
  onInstall: () => void;
  onClose: () => void;
}

export const MobileAppInstallModal: React.FC<MobileAppInstallModalProps> = ({
  isOpen,
  isInstallable,
  onInstall,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8, 14, 22, 0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 120,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <dialog
        open
        className="compare-dialog"
        style={{ maxWidth: '640px', width: '100%', margin: 0 }}
      >
        <div className="compare-dialog-header">
          <div>
            <span className="compare-dialog-badge">Instalación Móvil</span>
            <h2 className="compare-dialog-title" style={{ fontSize: '2rem' }}>
              Instalar RutaCasco en tu Móvil
            </h2>
            <p className="compare-dialog-sub">
              Disfruta de la app completa como una aplicación nativa en tu dispositivo móvil.
            </p>
          </div>
          <button type="button" className="q-close" onClick={onClose} aria-label="Cerrar">
            &times;
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Direct Install CTA */}
          <div
            style={{
              padding: '18px',
              borderRadius: '12px',
              backgroundColor: 'var(--surface-2)',
              border: '2px solid var(--accent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: '#0f1a28',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img
                  src="/icon.svg"
                  alt="RutaCasco Logo"
                  style={{ width: '32px', height: '32px' }}
                />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>
                  RutaCasco Mobile (PWA / WebAPK)
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Acceso sin barra de navegación, rendimiento acelerado y soporte offline.
                </span>
              </div>
            </div>

            {isInstallable ? (
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => {
                  onInstall();
                  onClose();
                }}
                style={{ width: '100%', minHeight: '44px' }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Instalar Aplicación en Android / Móvil
              </button>
            ) : (
              <div
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                  padding: '8px 12px',
                  backgroundColor: 'rgba(255, 194, 26, 0.15)',
                  borderRadius: '8px'
                }}
              >
                💡 Si el botón automático no aparece en tu navegador, sigue las instrucciones paso a
                paso a continuación.
              </div>
            )}
          </div>

          {/* Android Steps */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--display)',
                fontSize: '1.4rem',
                margin: '0 0 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>📱</span> Cómo instalar en Android (Generación de APK / WebAPK)
            </h4>
            <ol
              style={{
                paddingLeft: '20px',
                margin: 0,
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--muted)'
              }}
            >
              <li>
                Abre esta aplicación desde tu celular en <strong>Google Chrome</strong>,{' '}
                <strong>Brave</strong> o <strong>Samsung Internet</strong>.
              </li>
              <li>
                Pulsa en el menú de tres puntos (<strong>⋮</strong>) en la esquina superior derecha.
              </li>
              <li>
                Selecciona <strong>&quot;Instalar aplicación&quot;</strong> o{' '}
                <strong>&quot;Agregar a la pantalla principal&quot;</strong>.
              </li>
              <li>
                Android compilará automáticamente el paquete <strong>WebAPK nativo</strong> con el
                icono de RutaCasco, pantalla de inicio independiente y sin marcos de navegador.
              </li>
            </ol>
          </div>

          {/* iOS Steps */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--display)',
                fontSize: '1.4rem',
                margin: '0 0 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>🍏</span> Cómo instalar en iPhone / iPad (iOS)
            </h4>
            <ol
              style={{
                paddingLeft: '20px',
                margin: 0,
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--muted)'
              }}
            >
              <li>
                Abre el enlace en <strong>Safari</strong>.
              </li>
              <li>
                Toca el botón <strong>Compartir</strong> (el ícono del cuadrado con flecha hacia arriba).
              </li>
              <li>
                Baja y selecciona <strong>&quot;Añadir a pantalla de inicio&quot;</strong>.
              </li>
            </ol>
          </div>

          {/* Technical Info about APK conversion */}
          <div
            style={{
              padding: '14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0,0,0,0.03)',
              fontSize: '0.85rem',
              color: 'var(--muted)',
              border: '1px solid var(--line)'
            }}
          >
            <strong>Nota para desarrolladores:</strong> La app cuenta con manifiesto W3C y Service
            Worker precargado. Para generar un archivo <code>.apk</code> independiente para Google Play
            Store, puedes empaquetarla con <strong>Bubblewrap CLI (TWA)</strong> mediante:{' '}
            <code style={{ background: 'var(--surface-2)', padding: '2px 5px', borderRadius: '4px' }}>
              npx @bubblewrap/cli init --manifest=https://.../manifest.webmanifest
            </code>{' '}
            o integrarla con <strong>Capacitor</strong>.
          </div>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Entendido
          </button>
        </div>
      </dialog>
    </div>
  );
};
