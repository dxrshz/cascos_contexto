import React, { useState } from 'react';
import { STORE } from '../data/catalog';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  comparedCount: number;
  isInstalled: boolean;
  onOpenCompareModal: () => void;
  onOpenInstallModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  comparedCount,
  isInstalled,
  onOpenCompareModal,
  onOpenInstallModal
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCompareNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    onOpenCompareModal();
  };

  return (
    <>
      <a className="skip" href="#catalogo">
        Saltar al catálogo
      </a>
      <div className="promo promo-with-app">
        <span>Envío gratis desde $500.000 y 30 días para cambios y devoluciones</span>
        {!isInstalled && (
          <button
            type="button"
            className="promo-app-link"
            onClick={onOpenInstallModal}
          >
            📱 Instalar App Móvil
          </button>
        )}
      </div>

      <header className="site-header">
        <div className="wrap bar">
          <a className="brand" href="#inicio" aria-label="RutaCasco, ir al inicio">
            <svg viewBox="0 0 40 34" aria-hidden="true">
              <path
                d="M3 22C2 10 11 2 22 2c9 0 15 6 15 15v4c0 3-2 6-5 6H10C6 27 3 25 3 22Z"
                fill="#ffc21a"
                stroke="#0f1a28"
                strokeWidth="2.4"
              />
              <path d="M20 12c6-1 13 1 16 5v3H22c-3-3-4-6-2-8Z" fill="#0f1a28" />
            </svg>
            RutaCasco
          </a>

          <nav id="nav" className={menuOpen ? 'open' : ''} aria-label="Principal">
            <a href="#catalogo" onClick={() => setMenuOpen(false)}>
              Catálogo
            </a>
            <button
              type="button"
              className="nav-compare-btn"
              onClick={handleCompareNavClick}
            >
              Comparador
              {comparedCount > 0 && <span className="nav-badge">{comparedCount}</span>}
            </button>
            <a href="#resenas" onClick={() => setMenuOpen(false)}>
              Reseñas
            </a>
            <a href="#calificar" onClick={() => setMenuOpen(false)}>
              Calificar
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              Preguntas
            </a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
            <PWAInstallButton
              isInstalled={isInstalled}
              onOpenModal={onOpenInstallModal}
            />

            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="nav"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              Menú {comparedCount > 0 && `(${comparedCount})`}
            </button>

            <a
              className="btn btn-accent btn-sm"
              data-store="checkout"
              href={`${STORE.baseUrl}${STORE.checkoutPath}?utm_source=landing&utm_medium=cta`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
