# RutaCasco - Tienda y Catálogo de Cascos para Moto

Aplicación web desarrollada en React y TypeScript con Vite para **RutaCasco**, especializada en cascos de motocicleta homologados (ECE 22.06 y DOT).

## Características

- **Catálogo de Cascos**: Modelos integrales, modulares, urbanos y multipropósito con especificaciones técnicas (peso, coraza, certificaciones, visor, etc.).
- **Filtros Avanzados**: Búsqueda por término clave, filtrado por tipo de casco, talla (XS a XXL), color y rango dinámico de precios en COP.
- **Ordenamiento**: Destacados, precio (ascendente / descendente) y mejor valorados.
- **Vista Rápida Modal**: Detalles del casco, galería/ilustraciones SVG, selector de tallas con disponibilidad, características y accesos directos a compra.
- **Sistema Interactivo de Calificación y Reseñas**:
  - Resumen estadístico con promedios generales y por aspecto (comodidad, durabilidad, estilo).
  - Pestañas de filtrado de reseñas por aspecto.
  - Formulario de calificación en tiempo real que actualiza los promedios y almacena las reseñas en `localStorage`.
- **Preguntas Frecuentes**: Sección interactiva de dudas habituales sobre homologación, tallaje y envíos.
- **SEO y Datos Estructurados**: Marcado Schema.org (`Organization`, `WebSite`, `CollectionPage`, `BreadcrumbList`, `ItemList`, `FAQPage`).

## Ejecución

```bash
npm run dev
```

Dev server configurado en puerto 3000 (`0.0.0.0:3000`).
