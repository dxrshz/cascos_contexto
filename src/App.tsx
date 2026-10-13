import React, { useState, useMemo } from 'react';
import { FilterState, HelmetTypeId, Review } from './types';
import {
  INITIAL_REVIEWS,
  LS_REVIEWS_KEY,
  PMIN,
  PMAX,
  PRODUCTS_BY_ID
} from './data/catalog';
import { usePWAInstall } from './hooks/usePWAInstall';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Perks } from './components/Perks';
import { HelmetTypes } from './components/HelmetTypes';
import { Catalog } from './components/Catalog';
import { ReviewsSection } from './components/ReviewsSection';
import { RateSection } from './components/RateSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { ComparisonBar } from './components/ComparisonBar';
import { ComparisonModal } from './components/ComparisonModal';
import { MobileAppInstallModal } from './components/MobileAppInstallModal';
import { JsonLd } from './components/JsonLd';

export const App: React.FC = () => {
  // PWA install state
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Load user reviews from localStorage
  const [userReviews, setUserReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(LS_REVIEWS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    q: '',
    types: new Set<HelmetTypeId>(),
    colors: new Set<string>(),
    sizes: new Set<string>(),
    min: PMIN,
    max: PMAX,
    sort: 'destacados'
  });

  // Quick view modal state
  const [quickViewId, setQuickViewId] = useState<string | null>(null);

  // Pre-selected product in rating form
  const [preSelectedRateId, setPreSelectedRateId] = useState<string | null>(null);

  // Compared products state (up to 3)
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Sync user reviews to localStorage
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...newReviewData,
      id: `u${Date.now()}`,
      date: new Date().toISOString().slice(0, 10)
    };
    const updated = [...userReviews, newRev];
    setUserReviews(updated);
    try {
      localStorage.setItem(LS_REVIEWS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save review to localStorage', e);
    }
  };

  const handleClearReviews = () => {
    setUserReviews([]);
    try {
      localStorage.removeItem(LS_REVIEWS_KEY);
    } catch (e) {
      console.warn('Could not remove reviews from localStorage', e);
    }
  };

  // Compare toggles
  const handleToggleCompare = (id: string) => {
    setComparedProductIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        setIsCompareModalOpen(true);
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedProductIds((prev) => prev.filter((item) => item !== id));
  };

  const handleAddToCompare = (id: string) => {
    setComparedProductIds((prev) => {
      if (prev.includes(id) || prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleClearCompare = () => {
    setComparedProductIds([]);
  };

  // Full review list (user reviews reversed, then initial reviews)
  const allReviews = useMemo(() => {
    return [...userReviews].reverse().concat(INITIAL_REVIEWS);
  }, [userReviews]);

  // Quick view product
  const quickViewProduct = quickViewId ? PRODUCTS_BY_ID[quickViewId] || null : null;
  const quickViewUserReviews = useMemo(() => {
    if (!quickViewId) return { count: 0, sum: 0 };
    const matching = userReviews.filter((r) => r.productId === quickViewId);
    return {
      count: matching.length,
      sum: matching.reduce((acc, r) => acc + r.overall, 0)
    };
  }, [quickViewId, userReviews]);

  // Handlers
  const handleSearch = (q: string) => {
    setFilterState((prev) => ({ ...prev, q }));
  };

  const handleSelectType = (type: HelmetTypeId) => {
    setFilterState((prev) => ({
      ...prev,
      types: new Set([type])
    }));
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChangeFilter = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      q: '',
      types: new Set<HelmetTypeId>(),
      colors: new Set<string>(),
      sizes: new Set<string>(),
      min: PMIN,
      max: PMAX,
      sort: 'destacados'
    });
  };

  return (
    <>
      <JsonLd />
      <Header
        comparedCount={comparedProductIds.length}
        isInstalled={isInstalled}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />
      <main id="inicio">
        <Hero onSearch={handleSearch} onOpenQuickView={setQuickViewId} />
        <Perks />
        <HelmetTypes onSelectType={handleSelectType} />
        <Catalog
          filterState={filterState}
          onChangeFilter={handleChangeFilter}
          onResetFilters={handleResetFilters}
          userReviews={userReviews}
          comparedIds={comparedProductIds}
          onToggleCompare={handleToggleCompare}
          onOpenQuickView={setQuickViewId}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
        />
        <ReviewsSection allReviews={allReviews} />
        <RateSection
          userReviewsCount={userReviews.length}
          preSelectedProductId={preSelectedRateId}
          onSubmitReview={handleAddReview}
          onClearUserReviews={handleClearReviews}
        />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />

      {/* Floating Comparison Dock Bar */}
      <ComparisonBar
        comparedIds={comparedProductIds}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
        onOpenModal={() => setIsCompareModalOpen(true)}
      />

      {/* Quick View Dialog */}
      <QuickViewModal
        product={quickViewProduct}
        userReviewsCount={quickViewUserReviews.count}
        userReviewsSum={quickViewUserReviews.sum}
        isCompared={quickViewProduct ? comparedProductIds.includes(quickViewProduct.id) : false}
        canAddMore={comparedProductIds.length < 3}
        onToggleCompare={handleToggleCompare}
        onClose={() => setQuickViewId(null)}
        onRateProduct={(id) => setPreSelectedRateId(id)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Comparison Modal Dialog */}
      {isCompareModalOpen && (
        <ComparisonModal
          comparedIds={comparedProductIds}
          userReviews={userReviews}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={handleRemoveFromCompare}
          onAdd={handleAddToCompare}
          onOpenQuickView={(id) => setQuickViewId(id)}
        />
      )}

      {/* Mobile App / APK Install Guidance Modal */}
      <MobileAppInstallModal
        isOpen={isInstallModalOpen}
        isInstallable={isInstallable}
        onInstall={install}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </>
  );
};

export default App;
