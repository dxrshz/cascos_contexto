import React from 'react';

export const Perks: React.FC = () => {
  return (
    <section className="perks" aria-label="Beneficios de comprar en RutaCasco">
      <div className="wrap">
        <ul>
          <li>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5l-8-3Z" />
              <path d="m8.5 12 2.5 2.5 4.5-5" />
            </svg>
            <div>
              <strong>Homologados</strong>
              <span>Normas ECE 22.06 y DOT en todos los modelos</span>
            </div>
          </li>
          <li>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="17" cy="18" r="2" />
            </svg>
            <div>
              <strong>Llega en 2 a 5 días</strong>
              <span>Gratis desde $500.000 con seguimiento</span>
            </div>
          </li>
          <li>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <div>
              <strong>30 días para cambiar</strong>
              <span>Cambia de talla una vez sin costo</span>
            </div>
          </li>
          <li>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="9" r="6" />
              <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
            </svg>
            <div>
              <strong>2 años de garantía</strong>
              <span>Cobertura contra defectos de fabricación</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
