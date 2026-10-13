import React from 'react';
import { STORE } from '../data/catalog';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <a className="brand" href="#inicio">
            RutaCasco
          </a>
          <ul>
            <li>
              <a href="#catalogo">Catálogo</a>
            </li>
            <li>
              <a href="#resenas">Reseñas</a>
            </li>
            <li>
              <a href="#calificar">Calificar</a>
            </li>
            <li>
              <a href="#faq">Preguntas frecuentes</a>
            </li>
            <li>
              <a
                data-store="shop"
                href={STORE.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir a la tienda
              </a>
            </li>
          </ul>
        </div>
        <p className="legal">
          &copy; <span id="year">{currentYear}</span> RutaCasco. Usa siempre un casco homologado y
          abrochado. Precios en COP (pesos colombianos).
        </p>
      </div>
    </footer>
  );
};
