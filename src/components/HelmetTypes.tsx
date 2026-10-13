import React from 'react';
import { HelmetTypeId } from '../types';
import { TYPES, PRODUCTS, getHelmetLabel } from '../data/catalog';
import { HelmetVisual } from './HelmetSvg';

interface HelmetTypesProps {
  onSelectType: (type: HelmetTypeId) => void;
}

export const HelmetTypes: React.FC<HelmetTypesProps> = ({ onSelectType }) => {
  const typeKeys = Object.keys(TYPES) as HelmetTypeId[];

  return (
    <section className="section" aria-labelledby="h-tipos">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-tipos">Elige el casco según cómo ruedas</h2>
          <p>
            Cada tipo de casco resuelve un uso distinto. Toca uno para ver solo esos modelos en el
            catálogo.
          </p>
        </div>
        <div className="tiles" id="tiles">
          {typeKeys.map((typeKey) => {
            const rep = PRODUCTS.find((p) => p.type === typeKey);
            const count = PRODUCTS.filter((p) => p.type === typeKey).length;
            const typeInfo = TYPES[typeKey];

            return (
              <button
                key={typeKey}
                type="button"
                className="tile"
                onClick={() => onSelectType(typeKey)}
              >
                <div>
                  <strong>{typeInfo.short}</strong>
                  <span>
                    {typeInfo.blurb} {count} modelos.
                  </span>
                </div>
                <div className="tile-img">
                  {rep && (
                    <HelmetVisual
                      product={rep}
                      uid={`t-${typeKey}`}
                      label={getHelmetLabel(rep)}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
