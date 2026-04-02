import React, { useState, useEffect } from 'react';

export const itemsEdificio = [
  "AVISOS DE SEGURIDAD", "PISOS EN BUEN ESTADO", "VENTANAS EN BUEN ESTADO",
  "PUERTAS DE ACCESO", "TECHOS SIN FILTRACIONES", "PLAFONES SIN MANCHAS",
  "ILUMINACIÓN", "ESCALERAS", "PASAMANOS", "PASILLOS SIN OBSTÁCULOS",
  "INTERRUPTOR GENERAL", "APAGADORES", "CONTACTOS (no saturados)",
  "SANITARIOS LIMPIOS", "SURTIDOR DE AGUA", "VENTILACION (A/A)",
  "ORDEN Y LIMPIEZA (5'S)", "SILLAS EN BUEN ESTADO", "ESCRITORIOS ORDENADOS",
  "ARCHIVEROS FUNCIONALES", "RUTAS DE EVACUACIÓN", "SISTEMA DE EMERGENCIA",
  "PLAGA DE ANIMALES", "OTROS"
];

function ChecklistEdificio({ onChange, datosPrevios }) {
  const [respuestas, setRespuestas] = useState(datosPrevios || {});

  useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);

  const marcar = (item, valor) => {
    const nuevo = { ...respuestas, [item]: { ...respuestas[item], estado: valor } };
    setRespuestas(nuevo);
    onChange(nuevo);
  };

  const manejarObservacion = (item, texto) => {
    const nuevo = { ...respuestas, [item]: { ...respuestas[item], obs: texto } };
    setRespuestas(nuevo);
    onChange(nuevo);
  };

  const todosContestados = itemsEdificio.every(item => respuestas[item]?.estado);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 15, fontSize: '1.4rem', color: '#1a365d' }}>Inspección de Edificio</h2>
      
      <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        {itemsEdificio.map((item, index) => {
          const respActual = respuestas[item] || {};
          return (
            <div key={item} style={{ display: "flex", flexDirection: "column", marginBottom: 15, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <span style={{ flex: 1, minWidth: "200px", fontWeight: '500' }}>{index + 1}.- {item}</span>
                <div style={{ display: "flex", gap: 5 }}>
                  <button onClick={() => marcar(item, "SI")} style={{ padding: "8px 12px", background: respActual.estado === "SI" ? "#4CAF50" : "#e0e0e0", color: respActual.estado === "SI" ? "white" : "black", border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>SI</button>
                  <button onClick={() => marcar(item, "NO")} style={{ padding: "8px 12px", background: respActual.estado === "NO" ? "#F44336" : "#e0e0e0", color: respActual.estado === "NO" ? "white" : "black", border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>NO</button>
                  <button onClick={() => marcar(item, "MPC")} style={{ padding: "8px 12px", background: respActual.estado === "MPC" ? "#FF9800" : "#e0e0e0", color: respActual.estado === "MPC" ? "white" : "black", border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}>REQ. MPC</button>
                </div>
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Observaciones..."
                  value={respActual.obs || ""}
                  onChange={(e) => manejarObservacion(item, e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        {todosContestados ? (
          <div style={{ display: 'inline-block', padding: '10px 15px', background: '#4CAF50', color: 'white', fontWeight: 'bold', borderRadius: '6px' }}>
            Lista Terminada ✓
          </div>
        ) : (
          <div style={{ display: 'inline-block', padding: '10px 15px', color: '#F44336', fontWeight: 'bold' }}>
            ⚠️ Faltan puntos por contestar
          </div>
        )}
      </div>
    </div>
  );
}

export default ChecklistEdificio;