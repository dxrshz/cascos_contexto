import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  COLORS,
  TYPES,
  SIZES,
  buyUrl,
  productUrl,
  formatPrice,
  formatDecimal,
  getHelmetLabel
} from '../data/catalog';
import { HelmetVisual } from './HelmetSvg';
import { StarRating } from './StarRating';

interface QuickViewModalProps {
  product: Product | null;
  userReviewsCount: number;
  userReviewsSum: number;
  isCompared: boolean;
  canAddMore: boolean;
  onToggleCompare: (id: string) => void;
  onClose: () => void;
  onRateProduct: (productId: string) => void;
  onOpenCompareModal: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  userReviewsCount,
  userReviewsSum,
  isCompared,
  canAddMore,
  onToggleCompare,
  onClose,
  onRateProduct,
  onOpenCompareModal
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const totalCount = product.count + userReviewsCount;
  const avgRating = (product.rating * product.count + userReviewsSum) / totalCount;
  const col = COLORS[product.color] || { name: product.color, hex: '#23262d' };
  const typeInfo = TYPES[product.type];
  const label = getHelmetLabel(product);

  const handleRateClick = () => {
    const pid = product.id;
    onClose();
    onRateProduct(pid);
    const rateSection = document.getElementById('calificar');
    if (rateSection) {
      rateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8, 14, 22, 0.66)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <dialog
        open
        id="quick"
        aria-labelledby="q-title"
        style={{
          display: 'block',
          position: 'relative',
          width: 'min(940px, 100%)',
          maxHeight: 'calc(100dvh - 32px)',
          margin: 0
        }}
      >
        <div className="q-grid">
          <div className="q-media">
            <HelmetVisual product={product} uid={`m-${product.id}`} label={label} />
          </div>

          <div className="q-info">
            <button
              type="button"
              className="q-close"
              onClick={onClose}
              aria-label="Cerrar detalle"
            >
              &times;
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <p className="p-type" style={{ margin: 0 }}>{typeInfo?.label || product.type}</p>
              <button
                type="button"
                className={`btn-quick-compare ${isCompared ? 'active' : ''}`}
                onClick={() => {
                  onToggleCompare(product.id);
                }}
                title={isCompared ? 'Quitar del comparador' : canAddMore ? 'Agregar al comparador' : 'Máximo 3 cascos en comparador'}
              >
                {isCompared ? '✓ En comparador' : '+ Comparar casco'}
              </button>
            </div>

            <h2 className="q-title" id="q-title">
              {product.name}
            </h2>

            <div className="p-rate">
              <StarRating score={avgRating} />
              <span>
                {formatDecimal(avgRating)} de 5 ({totalCount} calificaciones)
              </span>
            </div>

            <p className="q-price">
              {formatPrice(product.price)}
              {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
            </p>

            <p>{product.desc}</p>

            <ul className="q-feat">
              {product.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>

            <dl className="specs">
              <dt>Color</dt>
              <dd>{col.name}</dd>
              <dt>Peso</dt>
              <dd>{product.weight}</dd>
              <dt>Carcasa</dt>
              <dd>{product.shell}</dd>
              <dt>Norma</dt>
              <dd>{product.cert}</dd>
            </dl>

            <fieldset className="q-sizes">
              <legend>Elige tu talla</legend>
              <div className="size-opts">
                {SIZES.map((size) => {
                  const isAvailable = product.sizes.includes(size);
                  return (
                    <React.Fragment key={size}>
                      <input
                        type="radio"
                        name="size"
                        id={`sz-${size}`}
                        value={size}
                        checked={selectedSize === size}
                        disabled={!isAvailable}
                        onChange={() => setSelectedSize(size)}
                      />
                      <label htmlFor={`sz-${size}`}>{size}</label>
                    </React.Fragment>
                  );
                })}
                <a
                  className="q-guide linklike"
                  href="#faq"
                  onClick={() => {
                    onClose();
                    const faqEl = document.getElementById('faq');
                    if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ¿Cuál es mi talla?
                </a>
              </div>
            </fieldset>

            <div className="q-actions">
              <a
                className="btn btn-accent"
                id="q-buy"
                href={buyUrl(product, selectedSize)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Comprar ahora
              </a>
              <a
                className="btn btn-ghost"
                href={productUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver página del producto
              </a>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '10px' }}>
              <button type="button" className="linklike" onClick={handleRateClick}>
                Calificar este casco
              </button>
              {isCompared && (
                <button
                  type="button"
                  className="linklike"
                  style={{ color: 'var(--ink)', fontWeight: 600 }}
                  onClick={() => {
                    onClose();
                    onOpenCompareModal();
                  }}
                >
                  Abrir comparativa →
                </button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
