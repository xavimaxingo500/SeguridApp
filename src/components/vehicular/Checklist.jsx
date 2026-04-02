// import React, { useState, useEffect } from "react";

// export const estructura = {
//   Luces: [ "Stop", "Reversa", "Intermitentes", "Direccionales", "Delanteras A y B" ],
//   Niveles: [ "Aceite de motor", "Líquido de frenos", "Dirección hidráulica", "Agua / anticongelante" ],
//   Llantas: [ "Presión adecuada", "Buenas condiciones", "Refacción en buen estado" ],
//   Seguridad: [ "Cinturón de seguridad", "Gato hidráulico", "Llave de cruz", "Señales reflectantes", "Espejos", "Limpia parabrisas", "Extintor vigente" ]
// };

// export default function Checklist({ onChange, datosPrevios }) {
//   const [respuestas, setRespuestas] = useState(datosPrevios || {});
//   const [seccionActiva, setSeccionActiva] = useState(0);
  
//   useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);
//   const nombresSecciones = Object.keys(estructura);
//   const seccionActual = nombresSecciones[seccionActiva];
//   const itemsActuales = estructura[seccionActual];

//   const marcar = (item, valor) => {
//     const nuevo = { ...respuestas, [item]: valor };
//     setRespuestas(nuevo);
//     onChange(nuevo);
//   };

//   const manejarObservacion = (item, texto) => {
//     const observacionesActuales = respuestas._observaciones || {};
//     const nuevo = { 
//       ...respuestas, 
//       _observaciones: { ...observacionesActuales, [item]: texto } 
//     };
//     setRespuestas(nuevo);
//     onChange(nuevo);
//   };

//   const obtenerColor = (item, op) => {
//     if (respuestas[item] === op) {
//       if (op === "SI") return "#4CAF50";
//       if (op === "NO") return "#F44336"; 
//       if (op === "NA") return "#FF9800"; 
//     }
//     return "#e0e0e0"; 
//   };

//   const siguienteSeccion = () => { if (seccionActiva < nombresSecciones.length - 1) setSeccionActiva(seccionActiva + 1); };
//   const anteriorSeccion = () => { if (seccionActiva > 0) setSeccionActiva(seccionActiva - 1); };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: 15, fontSize: '1.4rem', color: '#1a365d' }}>Revisión Vehicular</h2>
      
//       <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', marginBottom: '20px', paddingBottom: '5px' }}>
//         {nombresSecciones.map((sec, index) => {
//           const itemsDeEstaSeccion = estructura[sec];
//           const contestados = itemsDeEstaSeccion.filter(i => respuestas[i]).length;
//           const completa = contestados === itemsDeEstaSeccion.length;
//           return (
//             <button key={sec} onClick={() => setSeccionActiva(index)}
//               style={{
//                 flex: '0 0 auto', padding: '8px 12px', cursor: 'pointer', fontSize: '0.85rem', borderRadius: '20px',
//                 background: seccionActiva === index ? '#2196F3' : (completa ? '#E8F5E9' : '#f0f0f0'),
//                 color: seccionActiva === index ? 'white' : (completa ? '#2E7D32' : '#333'),
//                 border: completa && seccionActiva !== index ? '1px solid #A5D6A7' : 'none',
//                 fontWeight: seccionActiva === index ? 'bold' : 'normal'
//               }}>
//               {sec} {completa ? '✓' : ''}
//             </button>
//           );
//         })}
//       </div>

//       <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
//         <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #2196F3', paddingBottom: '8px', color: '#1a365d' }}>{seccionActual}</h3>
//         {itemsActuales.map(item => (
//           <div key={item} style={{ display: "flex", flexDirection: "column", marginBottom: 15, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <span style={{ flex: 1, fontWeight: '500' }}>{item}</span>
//               <div style={{ display: "flex", gap: 5 }}>
//                 {["SI", "NO", "NA"].map(op => (
//                   <button key={op} onClick={() => marcar(item, op)}
//                     style={{
//                       padding: "8px 12px", background: obtenerColor(item, op), color: respuestas[item] === op ? "white" : "black",
//                       border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold", minWidth: "45px"
//                     }}>
//                     {op}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {(respuestas[item] === "NO" || respuestas[item] === "NA") && (
//               <div style={{ marginTop: '10px', animation: 'fadeIn 0.3s' }}>
//                 <input 
//                   type="text" 
//                   placeholder={`Especificar detalle de: ${item}...`}
//                   value={(respuestas._observaciones && respuestas._observaciones[item]) || ""}
//                   onChange={(e) => manejarObservacion(item, e.target.value)}
//                   style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px', fontSize: '0.9rem' }}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//         <button onClick={anteriorSeccion} disabled={seccionActiva === 0} style={{ padding: '10px 15px', background: seccionActiva === 0 ? '#e0e0e0' : '#757575', color: 'white', border: 'none', borderRadius: '6px', cursor: seccionActiva === 0 ? 'not-allowed' : 'pointer' }}>
//           ← Anterior
//         </button>
//         {seccionActiva < nombresSecciones.length - 1 ? (
//           <button onClick={siguienteSeccion} style={{ padding: '10px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
//             Siguiente Sección →
//           </button>
//         ) : (
//           <div style={{ padding: '10px 15px', color: '#4CAF50', fontWeight: 'bold' }}>Lista Terminada ✓</div>
//         )}
//       </div>
//     </div>
//   );
// }


// //cehcklist



import React, { useState, useEffect } from 'react';

export const estructura = {
  Luces: [ "Stop", "Reversa", "Intermitentes", "Direccionales", "Delanteras A y B" ],
  Niveles: [ "Aceite de motor", "Líquido de frenos", "Dirección hidráulica", "Agua / anticongelante" ],
  Llantas: [ "Presión adecuada", "Buenas condiciones", "Refacción en buen estado" ],
  Seguridad: [ "Cinturón de seguridad", "Gato hidráulico", "Llave de cruz", "Señales reflectantes", "Espejos", "Limpia parabrisas", "Extintor vigente" ]
};

function Checklist({ onChange, datosPrevios }) {
  const [respuestas, setRespuestas] = useState(datosPrevios || {});
  const [seccionActiva, setSeccionActiva] = useState(0);
  
  useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);
  const nombresSecciones = Object.keys(estructura);
  const seccionActual = nombresSecciones[seccionActiva];
  const itemsActuales = estructura[seccionActual];

  // Lógica para saber si YA TODO está contestado
  const itemsTotales = Object.values(estructura).flat();
  const contestadosTotales = itemsTotales.filter(item => respuestas[item]).length;
  const todoContestado = contestadosTotales === itemsTotales.length;

  const marcar = (item, valor) => {
    const nuevo = { ...respuestas, [item]: valor };
    setRespuestas(nuevo);
    onChange(nuevo);
  };

  const manejarObservacion = (item, texto) => {
    const observacionesActuales = respuestas._observaciones || {};
    const nuevo = { ...respuestas, _observaciones: { ...observacionesActuales, [item]: texto } };
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

  const siguienteSeccion = () => { if (seccionActiva < nombresSecciones.length - 1) setSeccionActiva(seccionActiva + 1); };
  const anteriorSeccion = () => { if (seccionActiva > 0) setSeccionActiva(seccionActiva - 1); };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 15, fontSize: '1.4rem', color: '#1a365d' }}>Revisión Vehicular</h2>
      
      <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', marginBottom: '20px', paddingBottom: '5px' }}>
        {nombresSecciones.map((sec, index) => {
          const itemsDeEstaSeccion = estructura[sec];
          const contestados = itemsDeEstaSeccion.filter(i => respuestas[i]).length;
          const completa = contestados === itemsDeEstaSeccion.length;
          return (
            <button key={sec} onClick={() => setSeccionActiva(index)}
              style={{
                flex: '0 0 auto', padding: '8px 12px', cursor: 'pointer', fontSize: '0.85rem', borderRadius: '20px',
                background: seccionActiva === index ? '#2196F3' : (completa ? '#E8F5E9' : '#f0f0f0'),
                color: seccionActiva === index ? 'white' : (completa ? '#2E7D32' : '#333'),
                border: completa && seccionActiva !== index ? '1px solid #A5D6A7' : 'none',
                fontWeight: seccionActiva === index ? 'bold' : 'normal'
              }}>
              {sec} {completa ? '✓' : ''}
            </button>
          );
        })}
      </div>

      <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #2196F3', paddingBottom: '8px', color: '#1a365d' }}>{seccionActual}</h3>
        {itemsActuales.map(item => (
          <div key={item} style={{ display: "flex", flexDirection: "column", marginBottom: 15, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ flex: 1, fontWeight: '500' }}>{item}</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["SI", "NO", "NA"].map(op => (
                  <button key={op} onClick={() => marcar(item, op)}
                    style={{
                      padding: "8px 12px", background: obtenerColor(item, op), color: respuestas[item] === op ? "white" : "black",
                      border: "1px solid #999", borderRadius: 4, cursor: "pointer", fontWeight: "bold", minWidth: "45px"
                    }}>
                    {op}
                  </button>
                ))}
              </div>
            </div>
            
            {(respuestas[item] === "NO" || respuestas[item] === "NA") && (
              <div style={{ marginTop: '10px', animation: 'fadeIn 0.3s' }}>
                <input 
                  type="text" 
                  placeholder={`Especificar detalle de: ${item}...`}
                  value={(respuestas._observaciones && respuestas._observaciones[item]) || ""}
                  onChange={(e) => manejarObservacion(item, e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px', fontSize: '0.9rem' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={anteriorSeccion} disabled={seccionActiva === 0} style={{ padding: '10px 15px', background: seccionActiva === 0 ? '#e0e0e0' : '#757575', color: 'white', border: 'none', borderRadius: '6px', cursor: seccionActiva === 0 ? 'not-allowed' : 'pointer' }}>
          ← Anterior
        </button>
        {seccionActiva < nombresSecciones.length - 1 ? (
          <button onClick={siguienteSeccion} style={{ padding: '10px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Siguiente Sección →
          </button>
        ) : (
          todoContestado ? (
            <div style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', fontWeight: 'bold', borderRadius: '6px' }}>
              Lista Terminada ✓
            </div>
          ) : (
            <div style={{ padding: '10px 15px', color: '#F44336', fontWeight: 'bold' }}>
              ⚠️ Faltan puntos por contestar
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Checklist;