// import React, { useState, useEffect } from 'react';

// export const itemsEdificio = [
//   "AVISOS DE SEGURIDAD", "PISOS EN BUEN ESTADO", "VENTANAS EN BUEN ESTADO",
//   "PUERTAS DE ACCESO", "TECHOS SIN FILTRACIONES", "PLAFONES SIN MANCHAS",
//   "ILUMINACIÓN", "ESCALERAS", "PASAMANOS", "PASILLOS SIN OBSTÁCULOS",
//   "INTERRUPTOR GENERAL", "APAGADORES", "CONTACTOS (no saturados)",
//   "SANITARIOS LIMPIOS", "SURTIDOR DE AGUA", "VENTILACION (A/A)",
//   "ORDEN Y LIMPIEZA (5'S)", "SILLAS EN BUEN ESTADO", "ESCRITORIOS ORDENADOS",
//   "ARCHIVEROS FUNCIONALES", "RUTAS DE EVACUACIÓN", "SISTEMA DE EMERGENCIA",
//   "PLAGA DE ANIMALES", "OTROS"
// ];

// function ChecklistEdificio({ onChange, datosPrevios }) {
//   const [respuestas, setRespuestas] = useState(datosPrevios || {});

//   useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);

//   const marcar = (item, valor) => {
//     const nuevo = { ...respuestas, [item]: { ...respuestas[item], estado: valor } };
//     setRespuestas(nuevo);
//     onChange(nuevo);
//   };

//   const manejarObservacion = (item, texto) => {
//     const nuevo = { ...respuestas, [item]: { ...respuestas[item], obs: texto } };
//     setRespuestas(nuevo);
//     onChange(nuevo);
//   };

//   const todosContestados = itemsEdificio.every(item => respuestas[item]?.estado);

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: 15, fontSize: '1.4rem', color: '#1a365d' }}>Inspección de Edificio</h2>
      
//       <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
//         {itemsEdificio.map((item, index) => {
//           const respActual = respuestas[item] || {};
//           return (
//             <div key={item} style={{ display: "flex", flexDirection: "column", marginBottom: 15, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
//                 <span style={{ flex: 1, minWidth: "200px", fontWeight: '500' }}>{index + 1}.- {item}</span>
//                 <div style={{ display: "flex", gap: 5 }}>
//                   <button onClick={() => marcar(item, "SI")} style={{ padding: "8px 12px", background: respActual.estado === "SI" ? "#4CAF50" : "#e0e0e0", color: respActual.estado === "SI" ? "white" : "black", border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>SI</button>
//                   <button onClick={() => marcar(item, "NO")} style={{ padding: "8px 12px", background: respActual.estado === "NO" ? "#F44336" : "#e0e0e0", color: respActual.estado === "NO" ? "white" : "black", border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>NO</button>
//                   <button onClick={() => marcar(item, "MPC")} style={{ padding: "8px 12px", background: respActual.estado === "MPC" ? "#FF9800" : "#e0e0e0", color: respActual.estado === "MPC" ? "white" : "black", border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}>REQ. MPC</button>
//                 </div>
//               </div>
              
//               <div style={{ marginTop: '10px' }}>
//                 <input 
//                   type="text" 
//                   placeholder="Observaciones..."
//                   value={respActual.obs || ""}
//                   onChange={(e) => manejarObservacion(item, e.target.value)}
//                   style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '0.9rem' }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div style={{ marginTop: '20px', textAlign: 'right' }}>
//         {todosContestados ? (
//           <div style={{ display: 'inline-block', padding: '10px 15px', background: '#4CAF50', color: 'white', fontWeight: 'bold', borderRadius: '6px' }}>
//             Lista Terminada ✓
//           </div>
//         ) : (
//           <div style={{ display: 'inline-block', padding: '10px 15px', color: '#F44336', fontWeight: 'bold' }}>
//             ⚠️ Faltan puntos por contestar
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChecklistEdificio;




import React, { useState, useEffect, useRef } from 'react';

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

// Secciones para que no se amontone
const SECCIONES = [
  { titulo: "Estructura y Accesos", rango: [0, 8] },
  { titulo: "Instalaciones y Servicios", rango: [8, 16] },
  { titulo: "Orden, Limpieza y Emergencia", rango: [16, 24] }
];

function ChecklistEdificio({ onChange, datosPrevios }) {
  const [respuestas, setRespuestas] = useState(datosPrevios || {});
  const [seccionActiva, setSeccionActiva] = useState(0);
  const [alerta, setAlerta] = useState(false);
  const topRef = useRef(null);

  useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);

  const marcar = (item, valor) => {
    const nuevo = { ...respuestas, [item]: { ...respuestas[item], estado: valor } };
    setRespuestas(nuevo);
    onChange(nuevo);
    if (valor === "NO" || valor === "MPC") setAlerta(true);
  };

  const manejarObs = (item, texto) => {
    const nuevo = { ...respuestas, [item]: { ...respuestas[item], obs: texto } };
    setRespuestas(nuevo);
    onChange(nuevo);
  };

  const cambiarSeccion = (idx) => {
    setSeccionActiva(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSec = SECCIONES[seccionActiva];
  const itemsActuales = itemsEdificio.slice(currentSec.rango[0], currentSec.rango[1]);
  const contestados = itemsEdificio.filter(i => respuestas[i]?.estado).length;

  return (
    <div ref={topRef} style={{ maxWidth: '600px', margin: '0 auto' }}>
      {alerta && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', textAlign: 'center', maxWidth: '400px' }}>
            <h3 style={{ color: '#d32f2f' }}>⚠️ Atención Requerida</h3>
            <p>Si marcaste <b>NO</b> o <b>MPC</b>, por favor escribe el detalle en observaciones y coordina la corrección.</p>
            <button onClick={() => setAlerta(false)} className="btn btn-primary w-full">Entendido</button>
          </div>
        </div>
      )}

      <h2 style={{ textAlign: 'center', color: '#1a365d' }}>Inspección de Edificio</h2>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', overflowX: 'auto' }}>
        {SECCIONES.map((s, i) => (
          <button key={i} onClick={() => cambiarSeccion(i)} style={{ flex: 1, padding: '10px', fontSize: '0.8rem', borderRadius: '20px', border: 'none', background: seccionActiva === i ? '#2196F3' : '#e0e0e0', color: seccionActiva === i ? 'white' : 'black' }}>
            Paso {i+1}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', minHeight: '400px' }}>
        <h3 style={{ borderBottom: '2px solid #2196F3', paddingBottom: '5px' }}>{currentSec.titulo}</h3>
        {itemsActuales.map(item => (
          <div key={item} style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                {["SI", "NO", "MPC"].map(opt => (
                  <button key={opt} onClick={() => marcar(item, opt)} style={{ padding: '8px 10px', borderRadius: '5px', border: '1px solid #ccc', background: respuestas[item]?.estado === opt ? (opt === 'SI' ? '#4CAF50' : opt === 'NO' ? '#F44336' : '#FF9800') : '#f5f5f5', color: respuestas[item]?.estado === opt ? 'white' : 'black', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {(respuestas[item]?.estado === "NO" || respuestas[item]?.estado === "MPC") && (
              <input type="text" placeholder="¿Cuál es la falla?" value={respuestas[item]?.obs || ""} onChange={(e) => manejarObs(item, e.target.value)} style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px' }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={() => cambiarSeccion(seccionActiva - 1)} disabled={seccionActiva === 0} className="btn btn-secondary">← Anterior</button>
        {seccionActiva < 2 ? (
          <button onClick={() => cambiarSeccion(seccionActiva + 1)} className="btn btn-primary">Siguiente →</button>
        ) : (
          <span style={{ color: contestados === 24 ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>{contestados === 24 ? '✓ Completo' : '⚠️ Faltan respuestas'}</span>
        )}
      </div>
    </div>
  );
}
export default ChecklistEdificio;