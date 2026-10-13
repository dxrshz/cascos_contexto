import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, ASPECTS, TYPES, COLORS, formatPrice } from '../data/catalog';
import { Review } from '../types';

interface RateSectionProps {
  userReviewsCount: number;
  preSelectedProductId: string | null;
  onSubmitReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onClearUserReviews: () => void;
}

const HINTS = ['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'];

export const RateSection: React.FC<RateSectionProps> = ({
  userReviewsCount,
  preSelectedProductId,
  onSubmitReview,
  onClearUserReviews
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [overall, setOverall] = useState<number>(0);
  const [comodidad, setComodidad] = useState<number>(0);
  const [durabilidad, setDurabilidad] = useState<number>(0);
  const [estilo, setEstilo] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'ok' | 'err' | '' }>({
    text: '',
    type: ''
  });

  const overallInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preSelectedProductId) {
      setSelectedProduct(preSelectedProductId);
      setStatusMsg({ text: '', type: '' });
      setTimeout(() => {
        overallInputRef.current?.focus();
      }, 200);
    }
  }, [preSelectedProductId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      setStatusMsg({ text: 'Elige el casco que quieres calificar.', type: 'err' });
      return;
    }
    if (!overall) {
      setStatusMsg({
        text: 'Marca de 1 a 5 estrellas tu experiencia general.',
        type: 'err'
      });
      return;
    }

    const tags: string[] = [];
    if (comodidad >= 4) tags.push('comodidad');
    if (durabilidad >= 4) tags.push('durabilidad');
    if (estilo >= 4) tags.push('estilo');

    const product = PRODUCTS.find((p) => p.id === selectedProduct);
    const authorName = name.trim().slice(0, 40) || 'Cliente';

    onSubmitReview({
      name: authorName,
      productId: selectedProduct,
      overall,
      comodidad: comodidad || undefined,
      durabilidad: durabilidad || undefined,
      estilo: estilo || undefined,
      tags,
      text: comment.trim().slice(0, 400),
      mine: true
    });

    const nm = authorName === 'Cliente' ? '' : `, ${authorName}`;
    setStatusMsg({
      text: `Gracias${nm}. Calificaste el ${product?.name || 'casco'} con ${overall} ${
        overall === 1 ? 'estrella' : 'estrellas'
      } y ya aparece en las reseñas.`,
      type: 'ok'
    });

    // Reset form fields
    setSelectedProduct('');
    setOverall(0);
    setComodidad(0);
    setDurabilidad(0);
    setEstilo(0);
    setName('');
    setComment('');
  };

  const renderStarsRadioGroup = (
    fieldName: string,
    label: string,
    value: number,
    onChange: (val: number) => void,
    isMain: boolean
  ) => {
    return (
      <fieldset className={`rate-group ${isMain ? 'main' : ''}`}>
        <legend>
          {label}{' '}
          <span className="req">{isMain ? '(obligatoria)' : '(opcional)'}</span>
        </legend>
        <div className="stars-input" role="radiogroup" aria-label={label}>
          {[5, 4, 3, 2, 1].map((starNum) => (
            <React.Fragment key={starNum}>
              <input
                ref={isMain && starNum === 5 ? overallInputRef : undefined}
                type="radio"
                name={fieldName}
                id={`${fieldName}-${starNum}`}
                value={starNum}
                checked={value === starNum}
                onChange={() => {
                  onChange(starNum);
                  if (isMain) setStatusMsg({ text: '', type: '' });
                }}
              />
              <label htmlFor={`${fieldName}-${starNum}`} title={`${starNum} de 5`}>
                ★<span className="sr">{starNum} de 5 estrellas</span>
              </label>
            </React.Fragment>
          ))}
        </div>
        <span className="rate-hint" aria-hidden="true">
          {HINTS[value] || ''}
        </span>
      </fieldset>
    );
  };

  return (
    <section className="section band" id="calificar" aria-labelledby="h-rate">
      <div className="wrap rate-wrap">
        <div>
          <h2 id="h-rate">Califica tu experiencia</h2>
          <p className="lead">
            ¿Ya tienes un casco RutaCasco? Cuéntanos cómo te fue. Tu calificación se suma al
            promedio del modelo y ayuda a otros motociclistas a elegir.
          </p>
        </div>

        <form className="rate-form" id="rate-form" noValidate onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="rate-product">Casco que quieres calificar</label>
            <select
              id="rate-product"
              name="product"
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                setStatusMsg({ text: '', type: '' });
              }}
              required
            >
              <option value="">Elige un modelo</option>
              {PRODUCTS.map((p) => {
                const shortType = TYPES[p.type]?.short.toLowerCase() || p.type;
                const colName = COLORS[p.color]?.name.toLowerCase() || p.color;
                return (
                  <option key={p.id} value={p.id}>
                    {p.name} ({shortType}, {colName}) — {formatPrice(p.price)}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="rate-grid" id="rate-groups">
            {renderStarsRadioGroup(
              'overall',
              'Tu experiencia general',
              overall,
              setOverall,
              true
            )}
            {renderStarsRadioGroup(
              'comodidad',
              'Comodidad',
              comodidad,
              setComodidad,
              false
            )}
            {renderStarsRadioGroup(
              'durabilidad',
              'Durabilidad',
              durabilidad,
              setDurabilidad,
              false
            )}
            {renderStarsRadioGroup('estilo', 'Estilo', estilo, setEstilo, false)}
          </div>

          <div className="row-2">
            <div className="field">
              <label htmlFor="rate-name">Tu nombre (opcional)</label>
              <input
                id="rate-name"
                name="name"
                type="text"
                maxLength={40}
                autoComplete="given-name"
                placeholder="Ej. Carlos"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="rate-comment">Tu comentario (opcional)</label>
              <textarea
                id="rate-comment"
                name="comment"
                maxLength={400}
                placeholder="¿Qué te gustó? ¿Qué mejorarías?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-accent" type="submit">
              Enviar mi calificación
            </button>
            <p
              className={`status ${statusMsg.type}`}
              id="rate-status"
              role="status"
              aria-live="polite"
            >
              {statusMsg.text}
            </p>
          </div>

          {userReviewsCount > 0 && (
            <button
              className="linklike"
              type="button"
              id="rate-clear"
              onClick={() => {
                onClearUserReviews();
                setStatusMsg({
                  text: 'Se borraron tus calificaciones de esta demostración.',
                  type: 'ok'
                });
              }}
            >
              Borrar mis calificaciones de esta demostración
            </button>
          )}
        </form>
      </div>
    </section>
  );
};
