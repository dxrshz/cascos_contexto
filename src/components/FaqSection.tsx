import React from 'react';

export const FAQ_ITEMS = [
  {
    q: '¿Cómo elijo mi talla de casco?',
    a: 'Rodea tu cabeza con una cinta métrica, un dedo por encima de las cejas y las orejas. Referencia: XS 53 a 54 cm, S 55 a 56 cm, M 57 a 58 cm, L 59 a 60 cm, XL 61 a 62 cm y XXL 63 a 64 cm. El casco debe quedar firme, sin puntos de presión, y al mover la cabeza la piel de tu cara debe moverse con él. Si estás entre dos tallas, prueba la menor: el forro cede un poco con el uso.'
  },
  {
    q: '¿Los cascos están homologados?',
    a: 'Sí. Todos nuestros modelos cumplen las normas ECE 22.06 o DOT, y la etiqueta de homologación va cosida en la correa de barbilla. Revisa la ficha de cada casco para ver la norma exacta.'
  },
  {
    q: '¿Cuál es la diferencia entre casco integral, modular y multipropósito?',
    a: 'El integral cubre toda la cabeza y es el más seguro y aerodinámico, ideal para carretera y velocidad. El modular tiene la mentonera abatible, así que puedes abrirla en las paradas y es muy cómodo para viajar. El multipropósito suma visera y visor ancho para asfalto y tierra. El urbano o jet deja el rostro abierto y es el más ligero para trayectos cortos en ciudad.'
  },
  {
    q: '¿Cuánto tarda el envío y cuánto cuesta?',
    a: 'La entrega tarda de 2 a 5 días hábiles y recibes un número de seguimiento por correo. El envío es gratis en compras desde $500.000; por debajo de ese monto se calcula al pagar.'
  },
  {
    q: '¿Puedo cambiar o devolver mi casco?',
    a: 'Tienes 30 días desde la entrega para cambiar o devolver tu casco, siempre que no se haya usado en carretera y conserve etiquetas y empaque. El primer cambio de talla es gratis.'
  },
  {
    q: '¿Cada cuánto debo cambiar mi casco?',
    a: 'Los fabricantes recomiendan reemplazarlo cada cinco años, o antes si sufre un golpe fuerte, aunque no se vea el daño. La espuma interior se comprime y pierde capacidad de absorber impactos.'
  },
  {
    q: '¿Cómo limpio y cuido mi casco?',
    a: 'Limpia la carcasa y el visor con un paño húmedo y jabón neutro. El forro desmontable se lava a mano con agua tibia y se seca a la sombra. Evita solventes, gasolina y adhesivos fuertes, y guárdalo en su bolsa de tela lejos del sol.'
  },
  {
    q: '¿Qué garantía tienen?',
    a: 'Todos los cascos incluyen 2 años de garantía contra defectos de fabricación. No cubre daños por caídas, golpes ni uso inadecuado.'
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjetas de crédito y débito, transferencia bancaria, PSE, Nequi y pago contra entrega en ciudades seleccionadas. Todas las compras se procesan en una pasarela segura.'
  }
];

export const FaqSection: React.FC = () => {
  return (
    <section className="section" id="faq" aria-labelledby="h-faq">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-faq">Preguntas frecuentes</h2>
          <p>Lo que más nos preguntan antes de comprar un casco.</p>
        </div>
        <div className="faq">
          {FAQ_ITEMS.map((item, idx) => (
            <details key={idx}>
              <summary>{item.q}</summary>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
