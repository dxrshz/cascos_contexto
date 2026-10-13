import React from 'react';
import { Product } from '../types';
import { PRODUCTS_BY_ID, formatPrice } from '../data/catalog';
import { HelmetVisual } from './HelmetSvg';

interface ComparisonBarProps {
  comparedIds: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenModal: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  comparedIds,
  onRemove,
  onClear,
  onOpenModal
}) => {
  if (comparedIds.length === 0) return null;

  return (
    <aside className="compare-bar" aria-label="Barra de comparación de cascos">
      <div className="wrap compare-bar-content">
        <div className="compare-bar-info">
          <span className="compare-pill">
            {comparedIds.length} de 3
          </span>
          <div className="compare-text">
            <strong>Comparador de cascos</strong>
            <span className="compare-sub">
              {comparedIds.length === 1
                ? 'Selecciona hasta 2 cascos más para comparar lado a lado'
                : 'Compara especificaciones técnicas y precios'}
            </span>
          </div>
        </div>

        <div className="compare-thumbnails">
          {[0, 1, 2].map((slotIdx) => {
            const id = comparedIds[slotIdx];
            const product = id ? PRODUCTS_BY_ID[id] : null;

            if (product) {
              return (
                <div key={product.id} className="compare-slot filled">
                  <div className="compare-thumb-img">
                    <HelmetVisual
                      product={product}
                      uid={`bar-${product.id}`}
                      label={product.name}
                    />
                  </div>
                  <div className="compare-thumb-details">
                    <span className="compare-thumb-name">{product.name}</span>
                    <span className="compare-thumb-price">{formatPrice(product.price)}</span>
                  </div>
                  <button
                    type="button"
                    className="compare-slot-remove"
                    onClick={() => onRemove(product.id)}
                    aria-label={`Quitar ${product.name} del comparador`}
                    title="Quitar casco"
                  >
                    &times;
                  </button>
                </div>
              );
            }

            return (
              <div key={`empty-${slotIdx}`} className="compare-slot empty" title="Espacio disponible">
                <span>+ Casco {slotIdx + 1}</span>
              </div>
            );
          })}
        </div>

        <div className="compare-bar-actions">
          <button
            type="button"
            className="btn btn-accent btn-sm compare-action-btn"
            onClick={onOpenModal}
            disabled={comparedIds.length === 0}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M12 3v18" />
            </svg>
            Comparar ahora
          </button>
          <button
            type="button"
            className="linklike compare-clear-btn"
            onClick={onClear}
            title="Limpiar todos los cascos seleccionados"
          >
            Limpiar
          </button>
        </div>
      </div>
    </aside>
  );
};
