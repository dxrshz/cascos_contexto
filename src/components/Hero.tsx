import React, { useState } from 'react';
import { PRODUCTS_BY_ID, getHelmetLabel } from '../data/catalog';
import { HelmetVisual } from './HelmetSvg';

interface HeroProps {
  onSearch: (q: string) => void;
  onOpenQuickView: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenQuickView }) => {
  const [query, setQuery] = useState('');
  const araiProduct = PRODUCTS_BY_ID['arai-corsair-x'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChipClick = (term: string) => {
    setQuery(term);
    onSearch(term);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-labelledby="h1">
      <div className="wrap hero-grid">
        <div>
          <h1 id="h1">Cascos para moto que protegen en ciudad, carretera y tierra</h1>
          <p className="lead">
            Integrales, modulares, urbanos y multipropósito, con envío en 2 a 5 días hábiles y 30
            días para cambiar de talla.
          </p>

          <form className="search" role="search" onSubmit={handleSearchSubmit}>
            <label className="sr" htmlFor="q-hero">
              Buscar cascos por modelo, color o uso
            </label>
            <input
              id="q-hero"
              type="search"
              placeholder="Busca: negro, viaje, modular, Apex"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-ink" type="submit">
              Buscar
            </button>
          </form>

          <p className="try">
            Prueba con:
            <button type="button" className="chip" onClick={() => handleChipClick('urbano')}>
              urbano
            </button>
            <button type="button" className="chip" onClick={() => handleChipClick('viaje')}>
              viaje
            </button>
            <button type="button" className="chip" onClick={() => handleChipClick('negro')}>
              negro
            </button>
            <button type="button" className="chip" onClick={() => handleChipClick('deportivo')}>
              deportivo
            </button>
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-panel" />
          <div className="speed" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="hero-helmet" id="hero-helmet">
            {araiProduct && (
              <HelmetVisual
                product={araiProduct}
                uid="hero"
                label={getHelmetLabel(araiProduct)}
              />
            )}
          </div>
          <button
            className="hero-tag"
            type="button"
            onClick={() => onOpenQuickView('arai-corsair-x')}
            aria-label="Ver detalles del casco Arai Corsair X"
          >
            <strong>Arai Corsair X</strong>
            <span>Integral desde $3.270.000</span>
          </button>
        </div>
      </div>
    </section>
  );
};
