import { ColorInfo, HelmetTypeId, HelmetTypeInfo, AspectInfo, Product, Review } from '../types';

export const STORE = {
  baseUrl: 'https://www.example.com/tienda',
  productPath: '/producto/',
  checkoutPath: '/checkout',
  site: 'https://www.example.com',
  brand: 'RutaCasco',
  currency: 'COP',
  locale: 'es-CO'
};

export const LS_REVIEWS_KEY = 'rutacasco:reviews:v1';

export const COLORS: Record<string, ColorInfo> = {
  negro:    { name: 'Negro',    hex: '#23262d', accent: '#ffc21a' },
  blanco:   { name: 'Blanco',   hex: '#f4f5f7', accent: '#1d46c9' },
  rojo:     { name: 'Rojo',     hex: '#c8261f', accent: '#f4f5f7' },
  azul:     { name: 'Azul',     hex: '#1d46c9', accent: '#ffc21a' },
  gris:     { name: 'Gris',     hex: '#7b8794', accent: '#0f1a28' },
  amarillo: { name: 'Amarillo', hex: '#ffc21a', accent: '#0f1a28' },
  verde:    { name: 'Verde',    hex: '#2f7d4f', accent: '#f4f5f7' }
};

export const TYPES: Record<HelmetTypeId, HelmetTypeInfo> = {
  urbano: {
    label: 'Urbano (jet)',
    short: 'Urbano',
    blurb: 'Ligero y abierto para el tráfico diario.',
    tags: 'ciudad jet abierto trayecto diario scooter trabajo'
  },
  integral: {
    label: 'Integral',
    short: 'Integral',
    blurb: 'Máxima protección y aerodinámica para carretera.',
    tags: 'deportivo pista carretera velocidad cerrado full face'
  },
  modular: {
    label: 'Modular',
    short: 'Modular',
    blurb: 'Mentonera abatible, cómodo en paradas y viajes.',
    tags: 'abatible flip up viaje turismo largas distancias'
  },
  multiproposito: {
    label: 'Multipropósito',
    short: 'Multipropósito',
    blurb: 'Visera y visor ancho para asfalto y tierra.',
    tags: 'adventure aventura trail dual sport todoterreno tierra viaje'
  }
};

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ASPECTS: AspectInfo[] = [
  { key: 'comodidad',   label: 'Comodidad' },
  { key: 'durabilidad', label: 'Durabilidad' },
  { key: 'estilo',      label: 'Estilo' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'nomada',
    name: 'Caberg FLYON II',
    type: 'urbano',
    color: 'blanco',
    price: 449000,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    count: 212,
    badge: 'Más vendido',
    weight: '1.050 g',
    shell: 'ABS inyectado',
    cert: 'ECE 22.06',
    image: '/img/caberg_flyon.jpg',
    desc: 'Casco abierto con visor burbuja para el tráfico de cada día. Ligero, ventilado y fácil de poner.',
    features: ['Visor burbuja con filtro UV', 'Forro desmontable y lavable', 'Cierre micrométrico']
  },
  {
    id: 'brisa',
    name: 'Caberg FLYON II',
    type: 'urbano',
    color: 'negro',
    price: 499000,
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5,
    count: 148,
    weight: '1.020 g',
    shell: 'ABS inyectado',
    cert: 'ECE 22.06',
    image: '/img/caberg_flyon_negro.jpg',
    desc: 'Jet negro con detalles azules y verdes, buena ventilación y visor antirrayas para ir a trabajar en moto o scooter.',
    features: ['Visor antirrayas', 'Entradas de aire frontales', 'Tallas XS disponibles']
  },
  {
    id: 'arai-corsair-x',
    name: 'Arai Corsair X',
    type: 'integral',
    color: 'negro',
    price: 3270000,
    sizes: ['S', 'M', 'L'],
    rating: 4.6,
    count: 212,
    badge: 'Premium',
    weight: '1.600 g',
    shell: 'Carcasa PB SNC2',
    cert: 'ECE 22.06',
    image: '/img/arai-corsair-x.jpg',
    desc: 'Fiel al estilo Arai, el casco Corsair-X ha llevado la tecnología de los cascos y la protección del piloto un paso más allá al diseñar un casco que no solo protege contra impactos directos, sino que también está diseñado específicamente para minimizar el efecto de los impactos de rebote.',
    features: ['Visor burbuja con filtro UV', 'Forro desmontable y lavable', 'Cierre micrométrico']
  },
  {
    id: 'apex',
    name: 'Shaft PRO SHPRO 610 DV EVO',
    type: 'integral',
    color: 'negro',
    price: 450000,
    sizes: ['M', 'L', 'XL'],
    rating: 4.8,
    count: 187,
    weight: '1.420 g',
    shell: 'Policarbonato',
    cert: 'ECE 22.06',
    image: '/img/shaft_shpro610.jpg',
    desc: 'Integral deportivo con ventilación de alto caudal, visor Pinlock listo y forro que no aprieta en trayectos largos.',
    features: ['Visor compatible con Pinlock', 'Ventilación frontal y trasera', 'Forro desmontable']
  },
  {
    id: 'velocity',
    name: 'MT KRE+ S',
    type: 'integral',
    color: 'rojo',
    price: 829000,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    count: 131,
    weight: '1.360 g',
    shell: 'Fibra de vidrio',
    cert: 'ECE 22.06',
    image: '/img/mt_kre+s.jpg',
    desc: 'Integral aerodinámico de fibra de vidrio con alerón estabilizador para carretera a alta velocidad.',
    features: ['Alerón trasero estabilizador', 'Visor de cambio rápido', 'Cierre de doble anilla']
  },
  {
    id: 'phantom',
    name: 'MT Thunder 4 SV',
    type: 'integral',
    color: 'azul',
    price: 500000,
    sizes: ['M', 'L', 'XL'],
    rating: 4.9,
    count: 64,
    badge: 'Premium',
    weight: '1.250 g',
    shell: 'Fibra de carbono',
    cert: 'ECE 22.06',
    image: '/img/thunder4.jpg',
    desc: 'Carcasa de fibra de carbono ultraligera para jornadas largas. Menos peso en el cuello, más concentración en la ruta.',
    features: ['Carcasa de carbono', 'Visor antiniebla', 'Forro de secado rápido']
  },
  {
    id: 'voyager',
    name: 'LS2 Valiant gear ff912',
    type: 'modular',
    color: 'negro',
    price: 759000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    count: 175,
    weight: '1.650 g',
    shell: 'Policarbonato',
    cert: 'ECE 22.06',
    image: '/img/valiant_gear.jpg',
    desc: 'Modular con mentonera abatible y visor solar integrado. Ideal para viajes largos y paradas frecuentes.',
    features: ['Visor solar integrado', 'Mentonera con bloqueo doble', 'Compatible con intercomunicador']
  },
  {
    id: 'turing',
    name: 'LS2 Strobe II ff908',
    type: 'modular',
    color: 'blanco',
    price: 609000,
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    count: 89,
    weight: '1.580 g',
    shell: 'Fibra compuesta',
    cert: 'ECE 22.06',
    image: '/img/strobe_ii.jpg',
    desc: 'Modular premium con espacio para parlantes Bluetooth y una carcasa más compacta que otros modulares.',
    features: ['Alojamiento para intercomunicador', 'Visor solar de doble capa', 'Ventilación regulable']
  },
  {
    id: 'selva',
    name: 'Scorpion EXO-XT9000 Trailhead',
    type: 'multiproposito',
    color: 'gris',
    price: 2000000,
    sizes: ['S', 'M', 'L'],
    rating: 4.4,
    count: 58,
    weight: '1.620 g',
    shell: 'Fibra de Carbono',
    cert: 'ECE 22.06',
    image: '/img/scorpion_exoxt9000.jpg',
    desc: 'Casco de aventura de gama media-alta fabricado en fibra de carbono 3K, diseñado para uso en carretera y todoterreno (trail/ADV).',
    features: ['Visera aerodinámica', 'Forro transpirable', 'Ventilación superior']
  }
];

export const PRODUCTS_BY_ID: Record<string, Product> = PRODUCTS.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {}
);

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Camila R.',
    city: 'Bogotá',
    productId: 'apex',
    date: '2026-09-21',
    overall: 5,
    comodidad: 5,
    durabilidad: 5,
    estilo: 5,
    tags: ['comodidad', 'estilo'],
    text: 'Llevo tres meses con el Apex RS y lo uso casi todos los días en trayectos de una hora. El forro no aprieta ni en las sienes y el rojo se ve mucho mejor en persona.'
  },
  {
    id: 'r2',
    name: 'Andrés M.',
    city: 'Medellín',
    productId: 'nomada',
    date: '2026-09-14',
    overall: 5,
    comodidad: 5,
    durabilidad: 4,
    estilo: 4,
    tags: ['comodidad'],
    text: 'Perfecto para moverme por la ciudad. Pesa poco, el visor burbuja no se empaña y se pone en segundos. Hace justo lo que necesitaba.'
  },
  {
    id: 'r3',
    name: 'Valentina S.',
    city: 'Cali',
    productId: 'selva',
    date: '2026-09-02',
    overall: 4,
    comodidad: 4,
    durabilidad: 5,
    estilo: 4,
    tags: ['durabilidad'],
    text: 'Lo llevé a un viaje de 1.800 km con lluvia y polvo y aguantó sin una sola rayadura en la carcasa. La visera vibra por encima de 110 km/h, pero se corrige ajustándola.'
  },
  {
    id: 'r4',
    name: 'Mateo G.',
    city: 'Bucaramanga',
    productId: 'turing',
    date: '2026-08-27',
    overall: 5,
    comodidad: 5,
    durabilidad: 5,
    estilo: 4,
    tags: ['comodidad', 'durabilidad'],
    text: 'El sistema modular se siente sólido, sin holguras al subir la mentonera. Lo uso con intercomunicador y las almohadillas dejan espacio para los parlantes.'
  },
  {
    id: 'r5',
    name: 'Lucía P.',
    city: 'Pereira',
    productId: 'nomada',
    date: '2026-08-19',
    overall: 5,
    comodidad: 4,
    durabilidad: 5,
    estilo: 5,
    tags: ['estilo'],
    text: 'Es el casco más bonito que he tenido. El acabado mate y las costuras del forro parecen de una marca mucho más cara. Me preguntan por él en cada parada.'
  },
  {
    id: 'r6',
    name: 'Diego F.',
    city: 'Barranquilla',
    productId: 'phantom',
    date: '2026-08-11',
    overall: 5,
    comodidad: 5,
    durabilidad: 5,
    estilo: 5,
    tags: ['comodidad', 'durabilidad'],
    text: 'Se nota la fibra de carbono: casi no sientes el peso después de horas de ruta. Es una inversión, pero la diferencia en el cuello se nota desde el primer día.'
  },
  {
    id: 'r7',
    name: 'Sofía L.',
    city: 'Manizales',
    productId: 'brisa',
    date: '2026-08-03',
    overall: 4,
    comodidad: 4,
    durabilidad: 4,
    estilo: 5,
    tags: ['estilo'],
    text: 'El blanco con detalles azules combina con mi moto y se limpia con un paño húmedo. La talla XS me quedó justa, tal como indica la guía.'
  },
  {
    id: 'r8',
    name: 'Javier T.',
    city: 'Cartagena',
    productId: 'velocity',
    date: '2026-07-25',
    overall: 5,
    comodidad: 4,
    durabilidad: 5,
    estilo: 5,
    tags: ['durabilidad', 'estilo'],
    text: 'Tuve una caída a baja velocidad en un cruce y el casco solo quedó con un raspón superficial. Me alegra haber elegido uno homologado.'
  },
  {
    id: 'r9',
    name: 'Paula N.',
    city: 'Cúcuta',
    productId: 'phantom',
    date: '2026-07-16',
    overall: 5,
    comodidad: 5,
    durabilidad: 4,
    estilo: 5,
    tags: ['comodidad', 'estilo'],
    text: 'El azul se ve desde lejos, lo que me da tranquilidad en carretera. La ventilación superior funciona de verdad en los días de calor.'
  },
  {
    id: 'r10',
    name: 'Tomás B.',
    city: 'Ibagué',
    productId: 'selva',
    date: '2026-07-07',
    overall: 4,
    comodidad: 4,
    durabilidad: 4,
    estilo: 4,
    tags: ['comodidad'],
    text: 'Buena relación calidad precio. El forro tarda unos días en acomodarse y después queda muy cómodo para jornadas largas.'
  },
  {
    id: 'r11',
    name: 'Renata C.',
    city: 'Santa Marta',
    productId: 'voyager',
    date: '2026-06-28',
    overall: 5,
    comodidad: 5,
    durabilidad: 5,
    estilo: 4,
    tags: ['comodidad', 'durabilidad'],
    text: 'El visor solar integrado me ahorró comprar gafas aparte. Hice un viaje de cuatro días y la mentonera abatible fue una gran idea para las paradas.'
  },
  {
    id: 'r12',
    name: 'Felipe O.',
    city: 'Bogotá',
    productId: 'arai-corsair-x',
    date: '2026-09-30',
    overall: 5,
    comodidad: 5,
    durabilidad: 5,
    estilo: 5,
    tags: ['comodidad', 'durabilidad', 'estilo'],
    text: 'El Arai Corsair X es otro nivel. La carcasa PB SNC2 se siente rígida pero ligera, el ajuste es perfecto para uso en pista y la visera no vibra a alta velocidad. Vale cada peso.'
  }
];

export const PMIN = 400000;
export const PMAX = 3500000;
export const PSTEP = 50000;

export function formatPrice(n: number): string {
  try {
    return new Intl.NumberFormat(STORE.locale, {
      style: 'currency',
      currency: STORE.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(n);
  } catch (e) {
    return '$' + Number(n).toLocaleString('es-CO');
  }
}

export function formatDecimal(n: number): string {
  return n.toFixed(1).replace('.', ',');
}

export function normalizeStr(s: string): string {
  return String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function buyUrl(p: Product, size?: string): string {
  return (
    STORE.baseUrl +
    STORE.checkoutPath +
    '?sku=' +
    encodeURIComponent(p.id) +
    (size ? '&talla=' + encodeURIComponent(size) : '') +
    '&utm_source=landing&utm_medium=cta'
  );
}

export function productUrl(p: Product): string {
  return STORE.baseUrl + STORE.productPath + encodeURIComponent(p.id);
}

export function shadeColor(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, v));
  const r = c((n >> 16) + amt);
  const g = c(((n >> 8) & 255) + amt);
  const b = c((n & 255) + amt);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function getHelmetLabel(p: Product): string {
  const shortType = TYPES[p.type]?.short.toLowerCase() || p.type;
  const colName = COLORS[p.color]?.name.toLowerCase() || p.color;
  return `Casco ${shortType} ${p.name} de color ${colName}`;
}
