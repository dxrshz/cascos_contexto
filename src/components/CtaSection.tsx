import React from 'react';
import { STORE } from '../data/catalog';

export const CtaSection: React.FC = () => {
  return (
    <section className="cta" aria-labelledby="h-cta">
      <div className="wrap cta-grid">
        <h2 id="h-cta">Tu casco es lo único que no se improvisa</h2>
        <div>
          <p>
            Elige tu talla, paga en un minuto y recíbelo en 2 a 5 días. Si no te queda bien, lo
            cambias sin costo.
          </p>
          <div className="cta-actions">
            <a
              className="btn btn-ink"
              data-store="checkout"
              href={`${STORE.baseUrl}${STORE.checkoutPath}?utm_source=landing&utm_medium=cta`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar ahora
            </a>
            <a
              className="btn btn-ghost"
              href="mailto:ventas@example.com?subject=Consulta%20sobre%20cascos"
            >
              Hablar con un asesor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
