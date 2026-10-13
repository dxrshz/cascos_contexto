import React, { useState, useMemo } from 'react';
import { Review } from '../types';
import { ASPECTS, PRODUCTS_BY_ID, formatDecimal } from '../data/catalog';
import { StarRating } from './StarRating';

interface ReviewsSectionProps {
  allReviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ allReviews }) => {
  const [aspectFilter, setAspectFilter] = useState<'all' | 'comodidad' | 'durabilidad' | 'estilo'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Aggregates for summary
  const aggregates = useMemo(() => {
    const totalCount = allReviews.length;
    const calcAvg = (key: 'overall' | 'comodidad' | 'durabilidad' | 'estilo') => {
      const values = allReviews.map((r) => r[key]).filter((v): v is number => typeof v === 'number' && v > 0);
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    };

    return {
      n: totalCount,
      overall: calcAvg('overall'),
      comodidad: calcAvg('comodidad'),
      durabilidad: calcAvg('durabilidad'),
      estilo: calcAvg('estilo')
    };
  }, [allReviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return allReviews.filter((r) => {
      if (aspectFilter === 'all') return true;
      return (r.tags || []).includes(aspectFilter);
    });
  }, [allReviews, aspectFilter]);

  const shownReviews = filteredReviews.slice(0, visibleCount);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="section" id="resenas" aria-labelledby="h-res">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-res">Lo que dicen quienes ya ruedan con nuestros cascos</h2>
          <p>Opiniones sobre comodidad, durabilidad y estilo.</p>
        </div>

        <div className="rev-wrap">
          <div className="rev-summary" id="rev-summary">
            <p className="score">{formatDecimal(aggregates.overall)}</p>
            <StarRating score={aggregates.overall} />
            <p className="small">Promedio de {aggregates.n} reseñas de clientes</p>

            {ASPECTS.map((aspect) => {
              const val = aggregates[aspect.key];
              const pct = ((val / 5) * 100).toFixed(0);
              return (
                <div className="bar-row" key={aspect.key}>
                  <span>{aspect.label}</span>
                  <div className="track">
                    <i style={{ width: `${pct}%` }} />
                  </div>
                  <b>{formatDecimal(val)}</b>
                </div>
              );
            })}

            <p className="demo-note">
              Reseñas ilustrativas de demostración. Reemplázalas por opiniones reales de tus clientes antes de publicar.
            </p>
          </div>

          <div>
            <div className="tabs" id="rev-tabs" role="group" aria-label="Filtrar reseñas por aspecto">
              <button
                type="button"
                className="tab"
                aria-pressed={aspectFilter === 'all'}
                onClick={() => {
                  setAspectFilter('all');
                  setVisibleCount(6);
                }}
              >
                Todas
              </button>
              {ASPECTS.map((aspect) => (
                <button
                  key={aspect.key}
                  type="button"
                  className="tab"
                  aria-pressed={aspectFilter === aspect.key}
                  onClick={() => {
                    setAspectFilter(aspect.key);
                    setVisibleCount(6);
                  }}
                >
                  {aspect.label}
                </button>
              ))}
            </div>

            <div id="rev-list">
              {shownReviews.length > 0 ? (
                shownReviews.map((rev) => {
                  const product = PRODUCTS_BY_ID[rev.productId];
                  return (
                    <article className="review" key={rev.id}>
                      <div className="rev-top">
                        <StarRating score={rev.overall} />
                        <p className="rev-name">{rev.name}</p>
                      </div>
                      <p className="rev-meta">
                        Casco {product?.name || rev.productId}
                        {rev.city ? `, ${rev.city}` : ''}, {formatDate(rev.date)}
                      </p>
                      <p className="rev-text">
                        {rev.text || 'Calificó este casco sin dejar comentario.'}
                      </p>
                      <div className="pills">
                        {rev.mine && <span className="pill me">Tu reseña</span>}
                        {(rev.tags || []).map((t) => {
                          const aspect = ASPECTS.find((x) => x.key === t);
                          const scoreVal = (rev as any)[t];
                          return aspect && scoreVal ? (
                            <span className="pill" key={t}>
                              {aspect.label} {scoreVal}/5
                            </span>
                          ) : null;
                        })}
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="rev-text" style={{ paddingTop: '18px' }}>
                  Aún no hay reseñas con ese aspecto destacado.
                </p>
              )}
            </div>

            {filteredReviews.length > visibleCount && (
              <button
                className="btn btn-ghost more"
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
              >
                Ver más reseñas
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
