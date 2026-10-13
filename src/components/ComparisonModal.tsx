import React, { useEffect } from 'react';
import { Product } from '../types';
import {
  PRODUCTS,
  PRODUCTS_BY_ID,
  TYPES,
  COLORS,
  formatPrice,
  formatDecimal,
  buyUrl,
  getHelmetLabel
} from '../data/catalog';
import { HelmetVisual } from './HelmetSvg';
import { StarRating } from './StarRating';

interface ComparisonModalProps {
  comparedIds: string[];
  userReviews: Array<{ productId: string; overall: number }>;
  onClose: () => void;
  onRemove: (id: string) => void;
  onAdd: (id: string) => void;
  onOpenQuickView: (id: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  comparedIds,
  userReviews,
  onClose,
  onRemove,
  onAdd,
  onOpenQuickView
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const products: Product[] = comparedIds
    .map((id) => PRODUCTS_BY_ID[id])
    .filter(Boolean);

  const availableToAdd = PRODUCTS.filter((p) => !comparedIds.includes(p.id));

  // Compute ratings including user reviews
  const getProductStats = (p: Product) => {
    const matching = userReviews.filter((r) => r.productId === p.id);
    const totalCount = p.count + matching.length;
    const avg =
      (p.rating * p.count + matching.reduce((acc, r) => acc + r.overall, 0)) /
      totalCount;
    return { avg, totalCount };
  };

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
        zIndex: 110,
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
        id="comparison-dialog"
        className="compare-dialog"
        aria-labelledby="compare-modal-title"
      >
        <div className="compare-dialog-header">
          <div>
            <span className="compare-dialog-badge">Herramienta de decisión</span>
            <h2 id="compare-modal-title" className="compare-dialog-title">
              Comparativa técnica de cascos
            </h2>
            <p className="compare-dialog-sub">
              Compara especificaciones técnicas, certificaciones de seguridad y precios lado a
              lado (hasta 3 cascos simultáneos).
            </p>
          </div>
          <button
            type="button"
            className="q-close"
            onClick={onClose}
            aria-label="Cerrar comparador"
          >
            &times;
          </button>
        </div>

        {products.length === 0 ? (
          <div className="compare-empty-state">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M12 3v18" />
            </svg>
            <h3>No has seleccionado ningún casco para comparar</h3>
            <p>
              Explora el catálogo y pulsa el botón &quot;Comparar&quot; en los cascos que te interesen.
            </p>
            <button type="button" className="btn btn-accent" onClick={onClose}>
              Ver catálogo
            </button>
          </div>
        ) : (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-th-feature">Especificación</th>
                  {products.map((p) => {
                    const stats = getProductStats(p);
                    const col = COLORS[p.color] || { name: p.color, hex: '#23262d' };
                    const label = getHelmetLabel(p);

                    return (
                      <th key={p.id} className="compare-th-product">
                        <div className="compare-card-head">
                          <button
                            type="button"
                            className="compare-remove-btn"
                            onClick={() => onRemove(p.id)}
                            title="Quitar casco de la comparativa"
                          >
                            Quitar &times;
                          </button>
                          <div className="compare-product-img">
                            <HelmetVisual
                              product={p}
                              uid={`cmp-${p.id}`}
                              label={label}
                            />
                            {p.badge && <span className="badge">{p.badge}</span>}
                          </div>
                          <span className="p-type">{TYPES[p.type]?.short || p.type}</span>
                          <h3 className="compare-product-name">{p.name}</h3>
                          <div className="p-rate">
                            <StarRating score={stats.avg} />
                            <span>
                              {formatDecimal(stats.avg)} ({stats.totalCount})
                            </span>
                          </div>
                          <div className="compare-product-price">
                            <strong>{formatPrice(p.price)}</strong>
                            {p.oldPrice && <s>{formatPrice(p.oldPrice)}</s>}
                          </div>
                          <div className="compare-header-actions">
                            <a
                              className="btn btn-accent btn-sm"
                              href={buyUrl(p)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Comprar
                            </a>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => {
                                onClose();
                                onOpenQuickView(p.id);
                              }}
                            >
                              Ficha
                            </button>
                          </div>
                        </div>
                      </th>
                    );
                  })}

                  {products.length < 3 && (
                    <th className="compare-th-add">
                      <div className="compare-add-slot">
                        <div className="compare-add-icon">+</div>
                        <strong>Agregar otro casco</strong>
                        <p>Selecciona un modelo adicional para contrastar especificaciones:</p>
                        <select
                          className="compare-add-select"
                          onChange={(e) => {
                            if (e.target.value) {
                              onAdd(e.target.value);
                              e.target.value = '';
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            -- Elegir modelo --
                          </option>
                          {availableToAdd.map((avail) => (
                            <option key={avail.id} value={avail.id}>
                              {avail.name} ({TYPES[avail.type]?.short}) -{' '}
                              {formatPrice(avail.price)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {/* Tipo de Casco */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Tipo de Casco</strong>
                    <span>Propósito y estilo de rodaje</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <span className="compare-cell-highlight">
                        {TYPES[p.type]?.label || p.type}
                      </span>
                      <p className="compare-cell-sub">{TYPES[p.type]?.blurb}</p>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Precio */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Precio</strong>
                    <span>Pesos colombianos (COP)</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <span className="compare-price-val">
                        {formatPrice(p.price)}
                      </span>
                      {p.price >= 500000 ? (
                        <span className="compare-shipping-free">Envío gratis</span>
                      ) : (
                        <span className="compare-shipping-calc">Envío por calcular</span>
                      )}
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Peso */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Peso aproximado</strong>
                    <span>Impacto en fatiga del cuello</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <strong>{p.weight}</strong>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Carcasa / Material */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Material de Carcasa</strong>
                    <span>Construcción estructural</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <span className="compare-tag-mat">{p.shell}</span>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Homologación / Certificación */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Homologación de Seguridad</strong>
                    <span>Norma oficial certificada</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <span className="compare-cert-badge">{p.cert}</span>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Color */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Color disponible</strong>
                    <span>Acabado del modelo</span>
                  </td>
                  {products.map((p) => {
                    const col = COLORS[p.color] || { name: p.color, hex: '#23262d' };
                    return (
                      <td key={p.id}>
                        <div className="p-color">
                          <i style={{ background: col.hex }} />
                          <span>{col.name}</span>
                        </div>
                      </td>
                    );
                  })}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Tallas disponibles */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Tallas en catálogo</strong>
                    <span>Medidas verificadas</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <div className="compare-sizes-list">
                        {p.sizes.map((sz) => (
                          <span key={sz} className="compare-size-badge">
                            {sz}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Características destacadas */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Características Clave</strong>
                    <span>Equipamiento de fábrica</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <ul className="compare-features-list">
                        {p.features.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>

                {/* Descripción */}
                <tr>
                  <td className="compare-feature-label">
                    <strong>Resumen del fabricante</strong>
                    <span>Enfoque del producto</span>
                  </td>
                  {products.map((p) => (
                    <td key={p.id}>
                      <p className="compare-desc-text">{p.desc}</p>
                    </td>
                  ))}
                  {products.length < 3 && <td className="compare-cell-empty" />}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="compare-dialog-footer">
          <p className="compare-guarantee-note">
            Todos los cascos cuentan con 2 años de garantía, 30 días para cambio de talla sin costo
            y homologación visible en la correa.
          </p>
          <div className="compare-footer-btns">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
              Cerrar comparador
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
