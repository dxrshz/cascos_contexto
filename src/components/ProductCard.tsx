import React from 'react';
import { Product } from '../types';
import { COLORS, TYPES, buyUrl, formatPrice, formatDecimal, getHelmetLabel } from '../data/catalog';
import { HelmetVisual } from './HelmetSvg';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  userReviewsCount: number;
  userReviewsSum: number;
  isCompared: boolean;
  canAddMore: boolean;
  onToggleCompare: (id: string) => void;
  onOpenQuickView: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  userReviewsCount,
  userReviewsSum,
  isCompared,
  canAddMore,
  onToggleCompare,
  onOpenQuickView
}) => {
  const totalCount = product.count + userReviewsCount;
  const avgRating = (product.rating * product.count + userReviewsSum) / totalCount;
  const col = COLORS[product.color] || { name: product.color, hex: '#23262d' };
  const typeInfo = TYPES[product.type];
  const label = getHelmetLabel(product);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare(product.id);
  };

  return (
    <article className={`p-card ${isCompared ? 'in-comparison' : ''}`}>
      <div className="p-img-container">
        <button
          type="button"
          className="p-img"
          onClick={() => onOpenQuickView(product.id)}
          aria-label={`Ver detalles de ${product.name}`}
        >
          <HelmetVisual product={product} uid={`c-${product.id}`} label={label} />
          {product.badge && <span className="badge">{product.badge}</span>}
        </button>

        <button
          type="button"
          className={`btn-card-compare ${isCompared ? 'active' : ''}`}
          onClick={handleCompareClick}
          aria-pressed={isCompared}
          aria-label={isCompared ? `Quitar ${product.name} del comparador` : `Añadir ${product.name} al comparador`}
          title={isCompared ? 'Quitar del comparador' : canAddMore ? 'Comparar con otros cascos' : 'Máximo 3 cascos en comparador'}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isCompared ? (
              <polyline points="20 6 9 17 4 12" />
            ) : (
              <>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </>
            )}
          </svg>
          <span>{isCompared ? 'En comparador' : 'Comparar'}</span>
        </button>
      </div>

      <p className="p-type">{typeInfo?.label || product.type}</p>
      <h3 className="p-name">{product.name}</h3>

      <div className="p-rate">
        <StarRating score={avgRating} />
        <span>
          {formatDecimal(avgRating)} ({totalCount})
        </span>
      </div>

      <p className="p-desc">{product.desc}</p>

      <div className="p-foot">
        <div className="price">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
        </div>
        <span className="p-color">
          <i style={{ background: col.hex }} />
          {col.name}
        </span>
      </div>

      <div className="p-actions">
        <a
          className="btn btn-accent btn-sm"
          href={buyUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Comprar ${product.name}`}
        >
          Comprar
        </a>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => onOpenQuickView(product.id)}
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
};
