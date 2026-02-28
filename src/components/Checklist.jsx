import React, { useState, useEffect } from 'react';

export const estructura = {
  Luces: [
    "Stop",
    "Reversa",
    "Intermitentes",
    "Direccionales",
    "Delanteras A y B"
  ],
  Niveles: [
    "Aceite de motor",
    "Líquido de frenos",
    "Dirección hidráulica",
    "Agua / anticongelante"
  ],
  Llantas: [
    "Presión adecuada",
    "Buenas condiciones",
    "Refacción en buen estado"
  ],
  Seguridad: [
    "Cinturón de seguridad",
    "Gato hidráulico",
    "Llave de cruz",
    "Señales reflectantes",
    "Espejos",
    "Limpia parabrisas",
    "Extintor vigente"
  ]
};

const Checklist = ({ onChange, datosPrevios }) => {
  const [respuestas, setRespuestas] = useState(datosPrevios || {});
  const [seccionActiva, setSeccionActiva] = useState(0);

  useEffect(() => {
    setRespuestas(datosPrevios || {});
  }, [datosPrevios]);

  const nombresSecciones = Object.keys(estructura);
  const seccionActual = nombresSecciones[seccionActiva];
  const itemsActuales = estructura[seccionActual];

  const marcar = (item, valor) => {
    const nuevo = { ...respuestas, [item]: valor };
    setRespuestas(nuevo);
    onChange(nuevo);
  };

  const obtenerColor = (item, op) => {
    if (respuestas[item] === op) {
      if (op === "SI") return "#4CAF50";
      if (op === "NO") return "#F44336";
      if (op === "NA") return "#FF9800";
    }
    return "#e0e0e0";
  };

  const siguienteSeccion = () => {
    if (seccionActiva < nombresSecciones.length - 1) setSeccionActiva(seccionActiva + 1);
  };

  const anteriorSeccion = () => {
    if (seccionActiva > 0) setSeccionActiva(seccionActiva - 1);
  };

  return (
    <div className="card">
      <h2 className="card-title">✅ Revisión Vehicular</h2>
      <div className="tabs">
        {nombresSecciones.map((sec, index) => {
          const itemsDeEstaSeccion = estructura[sec];
          const contestados = itemsDeEstaSeccion.filter(i => respuestas[i]).length;
          const completa = contestados === itemsDeEstaSeccion.length;
          return (
            <button
              key={sec}
              onClick={() => setSeccionActiva(index)}
              className={`tab ${seccionActiva === index ? 'active' : ''} ${completa ? 'complete' : ''}`}
            >
              {sec} {completa ? '✓' : ''}
            </button>
          );
        })}
      </div>
      <div className="checklist-section">
        <h3>{seccionActual}</h3>
        {itemsActuales.map(item => (
          <div key={item} className="checklist-item">
            <span>{item}</span>
            <div className="option-buttons">
              {["SI", "NO", "NA"].map(op => (
                <button
                  key={op}
                  onClick={() => marcar(item, op)}
                  style={{ backgroundColor: obtenerColor(item, op), color: respuestas[item] === op ? 'white' : '#333' }}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={anteriorSeccion} disabled={seccionActiva === 0} className="btn btn-secondary">
          ← Anterior
        </button>
        {seccionActiva < nombresSecciones.length - 1 ? (
          <button onClick={siguienteSeccion} className="btn btn-primary">
            Siguiente Sección →
          </button>
        ) : (
          <span className="text-green-600 font-bold">Lista Terminada ✓</span>
        )}
      </div>
    </div>
  );
};

export default Checklist;