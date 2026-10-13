import React from 'react';
import { FilterState, HelmetTypeId } from '../types';
import { COLORS, TYPES, SIZES, PMIN, PMAX, PSTEP, PRODUCTS, formatPrice } from '../data/catalog';

interface FiltersProps {
  filterState: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  isOpenMobile: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  filterState,
  onChangeFilter,
  onReset,
  isOpenMobile
}) => {
  const typeKeys = Object.keys(TYPES) as HelmetTypeId[];
  const colorKeys = Object.keys(COLORS);

  const typeCounts = PRODUCTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {});

  const handleTypeToggle = (type: HelmetTypeId) => {
    const next = new Set(filterState.types);
    if (next.has(type)) {
      next.delete(type);
    } else {
      next.add(type);
    }
    onChangeFilter({ types: next });
  };

  const handleSizeToggle = (size: string) => {
    const next = new Set(filterState.sizes);
    if (next.has(size)) {
      next.delete(size);
    } else {
      next.add(size);
    }
    onChangeFilter({ sizes: next });
  };

  const handleColorToggle = (color: string) => {
    const next = new Set(filterState.colors);
    if (next.has(color)) {
      next.delete(color);
    } else {
      next.add(color);
    }
    onChangeFilter({ colors: next });
  };

  const handleMinPriceChange = (val: number) => {
    let newMin = Math.min(val, filterState.max);
    onChangeFilter({ min: newMin });
  };

  const handleMaxPriceChange = (val: number) => {
    let newMax = Math.max(val, filterState.min);
    onChangeFilter({ max: newMax });
  };

  const hasActiveFilters = Boolean(
    filterState.q.trim() ||
      filterState.types.size > 0 ||
      filterState.colors.size > 0 ||
      filterState.sizes.size > 0 ||
      filterState.min !== PMIN ||
      filterState.max !== PMAX
  );

  return (
    <aside className="filters" aria-label="Filtros del catálogo">
      <div className={`filters-panel ${isOpenMobile ? 'open' : ''}`} id="filters-panel">
        <fieldset>
          <legend>Tipo de casco</legend>
          <div className="opts col">
            {typeKeys.map((typeKey) => {
              const isChecked = filterState.types.has(typeKey);
              return (
                <label className="check" key={typeKey}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleTypeToggle(typeKey)}
                  />
                  <span className="box">
                    {TYPES[typeKey].short} <em>{typeCounts[typeKey] || 0}</em>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Talla</legend>
          <div className="opts">
            {SIZES.map((size) => {
              const isChecked = filterState.sizes.has(size);
              return (
                <label className="check" key={size}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSizeToggle(size)}
                  />
                  <span className="box">{size}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Color</legend>
          <div className="opts">
            {colorKeys.map((colorKey) => {
              const isChecked = filterState.colors.has(colorKey);
              const colorInfo = COLORS[colorKey];
              return (
                <label className="check" key={colorKey}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleColorToggle(colorKey)}
                  />
                  <span className="box">
                    <i className="dot" style={{ background: colorInfo.hex }} />
                    {colorInfo.name}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Precio (COP)</legend>
          <div className="price-box">
            <output id="price-out">
              De {formatPrice(filterState.min)} a {formatPrice(filterState.max)}
            </output>
            <label className="sr" htmlFor="pmin">
              Precio mínimo
            </label>
            <input
              type="range"
              id="pmin"
              min={PMIN}
              max={PMAX}
              step={PSTEP}
              value={filterState.min}
              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            />
            <label className="sr" htmlFor="pmax">
              Precio máximo
            </label>
            <input
              type="range"
              id="pmax"
              min={PMIN}
              max={PMAX}
              step={PSTEP}
              value={filterState.max}
              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            />
          </div>
        </fieldset>

        <button
          type="button"
          className="btn btn-ghost btn-sm reset"
          id="reset"
          disabled={!hasActiveFilters}
          onClick={onReset}
        >
          Limpiar filtros
        </button>
      </div>
    </aside>
  );
};
