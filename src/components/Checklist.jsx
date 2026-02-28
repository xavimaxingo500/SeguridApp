import React, { useState, useEffect } from "react";

// Estructura oficial de las preguntas
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

export default function Checklist({ onChange, datosPrevios }) {
  // Inicializamos con los datos que nos mande App.js (de la semana seleccionada)
  const [respuestas, setRespuestas] = useState(datosPrevios || {});
  const [seccionActiva, setSeccionActiva] = useState(0);
  
  // Si cambia la semana desde afuera, actualizamos visualmente el checklist
  useEffect(() => {
    setRespuestas(datosPrevios || {});
  }, [datosPrevios]);

  const nombresSecciones = Object.keys(estructura);
  const seccionActual = nombresSecciones[seccionActiva];
  const itemsActuales = estructura[seccionActual];

  const marcar = (item, valor) => {
    const nuevo = { ...respuestas, [item]: valor };
    setRespuestas(nuevo);
    onChange(nuevo); // Enviamos los datos actualizados a App.js
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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 15, fontSize: '1.4rem', color: '#1a365d' }}>Revisión Vehicular</h2>
      
      {/* Pestañas de categorías */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', marginBottom: '20px', paddingBottom: '5px' }}>
        {nombresSecciones.map((sec, index) => {
          const itemsDeEstaSeccion = estructura[sec];
          const contestados = itemsDeEstaSeccion.filter(i => respuestas[i]).length;
          const completa = contestados === itemsDeEstaSeccion.length;

          return (
            <button
              key={sec}
              onClick={() => setSeccionActiva(index)}
              style={{
                flex: '0 0 auto',
                padding: '8px 12px',
                background: seccionActiva === index ? '#2196F3' : (completa ? '#E8F5E9' : '#f0f0f0'),
                color: seccionActiva === index ? 'white' : (completa ? '#2E7D32' : '#333'),
                border: completa && seccionActiva !== index ? '1px solid #A5D6A7' : 'none',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: seccionActiva === index ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {sec} {completa ? '✓' : ''}
            </button>
          );
        })}
      </div>

      {/* Cuestionario */}
      <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #2196F3', paddingBottom: '8px', color: '#1a365d' }}>
          {seccionActual}
        </h3>

        {itemsActuales.map(item => (
          <div key={item} style={{ 
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: '12px', padding: "8px 0", borderBottom: "1px solid #f0f0f0"
          }}>
            <span style={{ flex: 1, fontWeight: '500', fontSize: '0.9rem', paddingRight: '10px' }}>{item}</span>
            <div style={{ display: "flex", gap: '6px' }}>
              {["SI", "NO", "NA"].map(op => (
                <button
                  key={op}
                  onClick={() => marcar(item, op)}
                  style={{
                    padding: "8px 14px",
                    background: obtenerColor(item, op),
                    color: respuestas[item] === op ? "white" : "#333",
                    border: respuestas[item] === op ? "none" : "1px solid #ccc",
                    borderRadius: '6px',
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.85rem"
                  }}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navegación interna */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button 
          onClick={anteriorSeccion}
          disabled={seccionActiva === 0}
          style={{ padding: '10px 15px', background: seccionActiva === 0 ? '#e0e0e0' : '#757575', color: 'white', border: 'none', borderRadius: '6px', cursor: seccionActiva === 0 ? 'not-allowed' : 'pointer' }}
        >
          ← Anterior
        </button>

        {seccionActiva < nombresSecciones.length - 1 ? (
          <button 
            onClick={siguienteSeccion}
            style={{ padding: '10px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Siguiente Sección →
          </button>
        ) : (
          <div style={{ padding: '10px 15px', color: '#4CAF50', fontWeight: 'bold' }}>
            Lista Terminada ✓
          </div>
        )}
      </div>
    </div>
  );
}

// 🛑 BARRERA DE SEGURIDAD 

// const todoEstaEnNA = Object.values(respuestas).every(v => v === "NA");

// if (todoEstaEnNA) {
//   alert("Debes contestar el checklist antes de continuar");
//   return;
// }   