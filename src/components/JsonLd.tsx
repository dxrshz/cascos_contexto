import React from 'react';
import { PRODUCTS, STORE, COLORS } from '../data/catalog';
import { FAQ_ITEMS } from './FaqSection';

export const JsonLd: React.FC = () => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${STORE.site}/#org`,
        name: STORE.brand,
        url: `${STORE.site}/`,
        logo: `${STORE.site}/img/logo.png`
      },
      {
        '@type': 'WebSite',
        '@id': `${STORE.site}/#website`,
        url: `${STORE.site}/`,
        name: STORE.brand,
        inLanguage: STORE.locale,
        publisher: { '@id': `${STORE.site}/#org` }
      },
      {
        '@type': 'CollectionPage',
        '@id': `${STORE.site}/cascos-para-moto#page`,
        url: `${STORE.site}/cascos-para-moto`,
        name: 'Cascos para moto',
        inLanguage: STORE.locale,
        isPartOf: { '@id': `${STORE.site}/#website` }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${STORE.site}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cascos para moto',
            item: `${STORE.site}/cascos-para-moto`
          }
        ]
      }
    ]
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cascos para moto',
    itemListElement: PRODUCTS.map((p, i) => {
      const pUrl = `${STORE.baseUrl}${STORE.productPath}${encodeURIComponent(p.id)}`;
      const imgUrl = p.image
        ? (p.image.startsWith('http') ? p.image : `${STORE.site}${p.image}`)
        : `${STORE.site}/img/${p.id}.jpg`;
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          sku: p.id,
          category: 'Cascos para moto',
          description: p.desc,
          color: COLORS[p.color]?.name || p.color,
          image: imgUrl,
          url: pUrl,
          brand: { '@type': 'Brand', name: STORE.brand },
          offers: {
            '@type': 'Offer',
            price: String(p.price),
            priceCurrency: STORE.currency,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            url: pUrl
          }
        }
      };
    })
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
