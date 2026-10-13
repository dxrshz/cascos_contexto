import React from 'react';
import { Product } from '../types';
import { COLORS, shadeColor } from '../data/catalog';

interface HelmetSvgProps {
  product: Product;
  uid: string;
  label: string;
}

const SHELL: Record<string, string> = {
  integral: 'M28,122 C26,66 66,28 112,28 C156,28 190,60 194,108 L196,134 C197,148 188,160 174,160 L74,160 C46,160 29,146 28,122 Z',
  urbano: 'M30,118 C28,64 66,32 110,32 C150,32 176,58 180,96 L181,104 C160,100 138,104 124,118 L120,136 C118,148 108,158 92,158 L74,158 C46,158 31,142 30,118 Z',
  multiproposito: 'M28,122 C26,68 66,32 112,32 C152,32 184,58 192,100 L204,128 C208,142 198,160 182,160 L74,160 C46,160 29,146 28,122 Z',
  modular: 'M28,122 C26,66 66,28 112,28 C156,28 190,60 194,108 L196,134 C197,148 188,160 174,160 L74,160 C46,160 29,146 28,122 Z'
};

export const HelmetVisual: React.FC<HelmetSvgProps> = ({ product, uid, label }) => {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={label}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    );
  }

  const col = COLORS[product.color] || { hex: '#23262d', accent: '#ffc21a' };
  const d = SHELL[product.type] || SHELL.integral;
  const ink = '#0b1420';
  const acc = col.accent;

  return (
    <svg
      viewBox="0 0 230 190"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      focusable="false"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={`sh${uid}`} x1="0" y1="0" x2=".4" y2="1">
          <stop offset="0" stopColor={shadeColor(col.hex, 40)} />
          <stop offset=".55" stopColor={col.hex} />
          <stop offset="1" stopColor={shadeColor(col.hex, -42)} />
        </linearGradient>
        <linearGradient id={`vz${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1420" />
          <stop offset="1" stopColor="#36506d" />
        </linearGradient>
        <clipPath id={`cp${uid}`}>
          <path d={d} />
        </clipPath>
      </defs>
      <ellipse cx="112" cy="172" rx="86" ry="8" fill="#000" opacity=".16" />
      <path d={d} fill={`url(#sh${uid})`} />
      <g clipPath={`url(#cp${uid})`}>
        <path d="M94,20 L118,20 L98,172 L74,172 Z" fill={acc} />
        <path d="M124,20 L134,20 L114,172 L104,172 Z" fill={acc} opacity=".55" />
      </g>
      {product.type === 'integral' && (
        <>
          <path
            d="M112,72 C140,64 180,76 191,98 L193,113 C170,112 142,114 118,117 C103,105 101,84 112,72 Z"
            fill={`url(#vz${uid})`}
          />
          <path
            d="M122,77 C140,72 160,76 172,86"
            stroke="#fff"
            strokeOpacity=".38"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M158,134 H186 M158,143 H184"
            stroke={ink}
            strokeOpacity=".7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M48,158 H172" stroke={ink} strokeWidth="9" strokeLinecap="round" />
        </>
      )}
      {product.type === 'modular' && (
        <>
          <path
            d="M112,72 C140,64 180,76 191,98 L193,113 C170,112 142,114 118,117 C103,105 101,84 112,72 Z"
            fill={`url(#vz${uid})`}
          />
          <path
            d="M122,77 C140,72 160,76 172,86"
            stroke="#fff"
            strokeOpacity=".38"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M122,124 C150,126 182,122 195,116"
            stroke={ink}
            strokeOpacity=".4"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="136"
            cy="100"
            r="7.5"
            fill="#cfd5dc"
            stroke={ink}
            strokeOpacity=".5"
            strokeWidth="2"
          />
          <rect x="170" y="134" width="18" height="6" rx="3" fill={acc} />
          <path d="M48,158 H172" stroke={ink} strokeWidth="9" strokeLinecap="round" />
        </>
      )}
      {product.type === 'urbano' && (
        <>
          <path
            d="M181,104 C160,100 138,104 124,118"
            stroke={ink}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M32,126 C34,146 52,158 74,158 L92,158"
            stroke={ink}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M126,62 C152,58 176,72 182,94 L182,108 C158,104 136,108 120,120 C106,104 108,74 126,62 Z"
            fill={`url(#vz${uid})`}
            opacity=".8"
          />
          <path
            d="M130,68 C146,66 162,72 172,82"
            stroke="#fff"
            strokeOpacity=".38"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M122,140 C134,152 152,160 172,158"
            fill="none"
            stroke={ink}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="172" cy="158" r="5" fill="#cfd5dc" />
        </>
      )}
      {product.type === 'multiproposito' && (
        <>
          <path
            d="M116,70 C148,60 188,74 198,98 L200,114 L124,116 C106,104 104,84 116,70 Z"
            fill={`url(#vz${uid})`}
          />
          <path
            d="M128,75 C146,70 168,74 182,84"
            stroke="#fff"
            strokeOpacity=".38"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M100,38 C132,22 184,34 210,62 L202,68 C176,48 138,40 104,48 Z"
            fill={acc}
            stroke={ink}
            strokeOpacity=".35"
            strokeWidth="1.5"
          />
          <rect x="178" y="130" width="24" height="7" rx="3" fill={ink} opacity=".75" />
          <path d="M48,158 H176" stroke={ink} strokeWidth="9" strokeLinecap="round" />
        </>
      )}
      <path
        d="M44,92 C48,64 72,44 102,38"
        stroke="#fff"
        strokeOpacity=".4"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path d={d} fill="none" stroke={ink} strokeOpacity=".28" strokeWidth="2" />
    </svg>
  );
};
