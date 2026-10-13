import React, { useState, useMemo } from 'react';
import { FilterState, Product, Review } from '../types';
import { PRODUCTS, TYPES, COLORS, normalizeStr } from '../data/catalog';
import { Filters } from './Filters';
import { ProductCard } from './ProductCard';

interface CatalogProps {
  filterState: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  userReviews: Review[];
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onOpenQuickView: (id: string) => void;
  onOpenCompareModal: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  filterState,
  onChangeFilter,
  onResetFilters,
  userReviews,
  comparedIds,
  onToggleCompare,
  onOpenQuickView,
  onOpenCompareModal
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Group user reviews by productId
  const userReviewsByProduct = useMemo(() => {
    const map: Record<string, { count: number; sum: number }> = {};
    for (const r of userReviews) {
      if (!map[r.productId]) {
        map[r.productId] = { count: 0, sum: 0 };
      }
      map[r.productId].count += 1;
      map[r.productId].sum += r.overall;
    }
    return map;
  }, [userReviews]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p: Product) => {
      if (filterState.types.size > 0 && !filterState.types.has(p.type)) {
        return false;
      }
      if (filterState.colors.size > 0 && !filterState.colors.has(p.color)) {
        return false;
      }
      if (
        filterState.sizes.size > 0 &&
        !p.sizes.some((s) => filterState.sizes.has(s))
      ) {
        return false;
      }
      if (p.price < filterState.min || p.price > filterState.max) {
        return false;
      }

      const qTrim = filterState.q.trim();
      if (qTrim) {
        const typeInfo = TYPES[p.type];
        const colInfo = COLORS[p.color];
        const hay = normalizeStr(
          [
            'casco',
            p.name,
            typeInfo?.label || '',
            typeInfo?.tags || '',
            colInfo?.name || '',
            p.shell,
            p.desc,
            p.features.join(' ')
          ].join(' ')
        );
        const terms = normalizeStr(qTrim)
          .split(/\s+/)
          .filter(Boolean)
          .map((t) => (t.length > 3 ? t.replace(/(es|s)$/, '') : t));

        return terms.every((t) => hay.includes(t));
      }

      return true;
    });
  }, [filterState]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (filterState.sort === 'precio-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filterState.sort === 'precio-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filterState.sort === 'valorados') {
      list.sort((a, b) => {
        const aReviews = userReviewsByProduct[a.id] || { count: 0, sum: 0 };
        const bReviews = userReviewsByProduct[b.id] || { count: 0, sum: 0 };
        const aAvg = (a.rating * a.count + aReviews.sum) / (a.count + aReviews.count);
        const bAvg = (b.rating * b.count + bReviews.sum) / (b.count + bReviews.count);
        return bAvg - aAvg;
      });
    }
    return list;
  }, [filteredProducts, filterState.sort, userReviewsByProduct]);

  return (
    <section className="section section-alt" id="catalogo" aria-labelledby="h-cat">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-cat">Catálogo de cascos para moto</h2>
          <p>
            Busca por palabra clave o combina filtros. Usa el botón &quot;Comparar&quot; para
            contrastar hasta 3 modelos lado a lado.
          </p>
        </div>

        <div className="toolbar">
          <form
            className="search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <span className="ico" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <label className="sr" htmlFor="q-cat">
              Buscar cascos
            </label>
            <input
              id="q-cat"
              type="search"
              placeholder="Buscar por modelo, color o uso"
              autoComplete="off"
              value={filterState.q}
              onChange={(e) => onChangeFilter({ q: e.target.value })}
            />
          </form>

          <button
            className="btn btn-ghost btn-sm filters-toggle"
            type="button"
            id="filters-toggle"
            aria-expanded={isMobileFiltersOpen}
            aria-controls="filters-panel"
            onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
          >
            Filtros
          </button>

          {comparedIds.length > 0 && (
            <button
              type="button"
              className="btn btn-accent btn-sm compare-toolbar-btn"
              onClick={onOpenCompareModal}
            >
              Comparar ({comparedIds.length})
            </button>
          )}

          <div className="sort">
            <label htmlFor="sort">Ordenar por</label>
            <select
              id="sort"
              value={filterState.sort}
              onChange={(e) =>
                onChangeFilter({
                  sort: e.target.value as FilterState['sort']
                })
              }
            >
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="valorados">Mejor valorados</option>
            </select>
          </div>
        </div>

        <div className="cat">
          <Filters
            filterState={filterState}
            onChangeFilter={onChangeFilter}
            onReset={onResetFilters}
            isOpenMobile={isMobileFiltersOpen}
          />

          <div>
            <p className="count" id="count" role="status" aria-live="polite">
              {sortedProducts.length}{' '}
              {sortedProducts.length === 1 ? 'casco encontrado' : 'cascos encontrados'}
            </p>

            <div className="grid" id="grid" style={{ marginTop: '18px' }}>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => {
                  const uStat = userReviewsByProduct[product.id] || { count: 0, sum: 0 };
                  const isCompared = comparedIds.includes(product.id);
                  const canAddMore = comparedIds.length < 3 || isCompared;

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      userReviewsCount={uStat.count}
                      userReviewsSum={uStat.sum}
                      isCompared={isCompared}
                      canAddMore={canAddMore}
                      onToggleCompare={onToggleCompare}
                      onOpenQuickView={onOpenQuickView}
                    />
                  );
                })
              ) : (
                <div className="empty">
                  <h3>No hay cascos con esos filtros</h3>
                  <p>
                    Quita algún filtro, amplía el rango de precio o prueba otra palabra clave.
                  </p>
                  <button type="button" className="btn btn-accent" onClick={onResetFilters}>
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
