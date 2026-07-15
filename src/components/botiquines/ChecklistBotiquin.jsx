import React, { useState, useEffect } from 'react';

// La misma estructura de tu imagen
export const estructuraBotiquin = {
  "ANTISÉPTICOS": [
    { nombre: "ALCOHOL ANTISÉPTICO FRASCO POR 275 ml.", unidad: "Unidad" },
    { nombre: "JABÓN NEUTRO.", unidad: "Unidad" },
    { nombre: "VASELINA.", unidad: "Frasco" },
    { nombre: "AGUA ESTÉRIL.", unidad: "Frasco" },
    { nombre: "SOLUCIÓN YODADA.", unidad: "Frasco" }
  ],
  "EQUIPOS": [
    { nombre: "BAUMANÓMETRO", unidad: "Unidad" },
    { nombre: "TERMÓMETRO (incluido el de uso para clientes).", unidad: "Unidad" }
  ],
  "MATERIAL DE CURACIÓN": [
    { nombre: "ALGODÓN.", unidad: "Bolsa" },
    { nombre: "APLICADORES.", unidad: "Paquete" },
    { nombre: "GASAS 5 X 5.", unidad: "Unidad" },
    { nombre: "COMPRESAS DE GASAS 10 X 10.", unidad: "Paquete" },
    { nombre: "ABATELENGUAS.", unidad: "Paquete" },
    { nombre: "CURITAS.", unidad: "Caja" },
    { nombre: "GUANTES DE LÁTEX PARA EXAMEN.", unidad: "Caja" },
    { nombre: "MICROPORE ROLLO.", unidad: "Unidad" },
    { nombre: "TAPABOCAS.", unidad: "Caja" },
    { nombre: "VENDA DE ALGODÓN ELÁSTICAS 5 X 5.", unidad: "Unidad" },
    { nombre: "VENDA DE ALGODÓN ELÁSTICAS DE 10 X 5.", unidad: "Unidad" },
    { nombre: "VENDA DE GASA DE 5 X 5.", unidad: "Unidad" },
    { nombre: "VENDA DE GASA DE 10 X 5.", unidad: "Unidad" },
    { nombre: "VENDA DE 4, 6 U 8 CABOS.", unidad: "Unidad" },
    { nombre: "VENDA TRIANGULAR.", unidad: "Unidad" }
  ],
  "INSUMOS ADICIONALES (No obligatorios)": [
    { nombre: "BOLSAS PLÁSTICAS (ROJAS Y VERDES).", unidad: "Unidad" },
    { nombre: "GAFAS PROTECTORAS.", unidad: "Unidad" },
    { nombre: "MANUAL DE PRIMEROS AUXILIOS.", unidad: "Unidad" },
    { nombre: "SÁBANAS DESECHABLES.", unidad: "Unidad" },
    { nombre: "TIJERAS DE BOTÓN.", unidad: "Unidad" },
    { nombre: "CAMILLA DE ATENCIÓN.", unidad: "Unidad" },
    { nombre: "CAMILLA RÍGIDA.", unidad: "Unidad" },
    { nombre: "COLLAR CERVICAL ADULTO.", unidad: "Unidad" },
    { nombre: "ELEMENTO DE BARRERA O MÁSCARA PARA RCP.", unidad: "Unidad" },
    { nombre: "INMOVILIZADORES DE CUELLO.", unidad: "Unidad" },
    { nombre: "INMOVILIZADORES O FÉRULA MIEMBROS INFERIORES (ADULTO).", unidad: "Unidad" },
    { nombre: "INMOVILIZADORES O FÉRULA MIEMBROS SUPERIORES (ADULTO).", unidad: "Unidad" },
    { nombre: "LINTERNA.", unidad: "Unidad" },
    { nombre: "MEGÁFONO.", unidad: "Unidad" },
    { nombre: "PILAS DE REPUESTO.", unidad: "Unidad" },
    { nombre: "PLANOS ESTRUCTURALES.", unidad: "Pza" },
    { nombre: "LISTADO TELÉFONOS DE EMERGENCIA.", unidad: "Pza" },
    { nombre: "SILLA DE RUEDAS.", unidad: "Unidad" }
  ]
};

const ChecklistBotiquin = ({ onChange, datosPrevios }) => {
  const [respuestas, setRespuestas] = useState(datosPrevios || {});
  const [seccionActiva, setSeccionActiva] = useState(0);

  useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);

  const nombresSecciones = Object.keys(estructuraBotiquin);
  const seccionActual = nombresSecciones[seccionActiva];
  const itemsActuales = estructuraBotiquin[seccionActual];
  const itemsTotales = Object.values(estructuraBotiquin).flat().length;
  const contestadosTotales = Object.keys(respuestas).length;

  const manejarCambio = (itemNombre, campo, valor) => {
    const estadoActual = respuestas[itemNombre] || { vencimiento: '', verificacion: '', observacion: '' };
    // Si marcamos que SI cumple, borramos la observación por si habían escrito algo antes
    if (campo === 'verificacion' && valor === 'SI') {
        estadoActual.observacion = '';
    }
    const nuevoEstado = { ...estadoActual, [campo]: valor };
    const nuevoGlobal = { ...respuestas, [itemNombre]: nuevoEstado };
    setRespuestas(nuevoGlobal);
    onChange(nuevoGlobal);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#1a365d', marginBottom: '20px' }}>Inventario Mensual</h2>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
        {nombresSecciones.map((sec, i) => (
          <button key={i} onClick={() => setSeccionActiva(i)} 
            style={{ 
              flex: '0 0 auto', padding: '10px 15px', fontSize: '0.8rem', borderRadius: '20px', border: 'none', 
              background: seccionActiva === i ? '#d32f2f' : '#e0e0e0', 
              color: seccionActiva === i ? 'white' : 'black', fontWeight: 'bold', cursor: 'pointer'
            }}>
            {sec}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ borderBottom: '2px solid #d32f2f', paddingBottom: '5px', color: '#d32f2f' }}>
          {seccionActual}
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '15px' }}>
          * Si el insumo no caduca (ej. Tijeras), puedes dejar la fecha en blanco. Si no cuentan con el insumo, selecciona "N/A".
        </p>
        
        {itemsActuales.map((item, index) => {
          const estadoItem = respuestas[item.nombre] || {};
          const mostrarObs = estadoItem.verificacion === 'NO' || estadoItem.verificacion === 'N/A';
          
          return (
            <div key={index} style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.nombre}</span>
                <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#777', background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                  Cant: {item.unidad}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '8px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#555' }}>Vencimiento (Opcional):</label>
                  <input type="date" value={estadoItem.vencimiento || ''} onChange={(e) => manejarCambio(item.nombre, 'vencimiento', e.target.value)} 
                    style={{ width: '100%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#555' }}>¿Está en buen estado?:</label>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                    <button onClick={() => manejarCambio(item.nombre, 'verificacion', 'SI')} 
                      style={{ flex: 1, padding: '5px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: estadoItem.verificacion === 'SI' ? '#4CAF50' : '#fff', color: estadoItem.verificacion === 'SI' ? 'white' : 'black', fontWeight: 'bold' }}>SI</button>
                    <button onClick={() => manejarCambio(item.nombre, 'verificacion', 'NO')} 
                      style={{ flex: 1, padding: '5px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: estadoItem.verificacion === 'NO' ? '#F44336' : '#fff', color: estadoItem.verificacion === 'NO' ? 'white' : 'black', fontWeight: 'bold' }}>NO</button>
                    <button onClick={() => manejarCambio(item.nombre, 'verificacion', 'N/A')} 
                      style={{ flex: 1, padding: '5px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', background: estadoItem.verificacion === 'N/A' ? '#FF9800' : '#fff', color: estadoItem.verificacion === 'N/A' ? 'white' : 'black', fontWeight: 'bold' }}>N/A</button>
                  </div>
                </div>
              </div>

              {/* El campo de observaciones aparece SOLAMENTE si hay un problema o no existe */}
              {mostrarObs && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                  <input type="text" placeholder={estadoItem.verificacion === 'N/A' ? "Especifica que no cuentan con él..." : "Especifica el problema..."} 
                    value={estadoItem.observacion || ''} onChange={(e) => manejarCambio(item.nombre, 'observacion', e.target.value)} 
                    style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={() => setSeccionActiva(seccionActiva - 1)} disabled={seccionActiva === 0} className="btn btn-secondary">← Anterior</button>
        {seccionActiva < nombresSecciones.length - 1 ? (
          <button onClick={() => setSeccionActiva(seccionActiva + 1)} className="btn btn-primary" style={{ background: '#d32f2f' }}>Siguiente Sección →</button>
        ) : (
          <span style={{ color: contestadosTotales >= itemsTotales - 18 ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>
            {contestadosTotales >= itemsTotales - 18 ? '✓ Inventario Terminado' : '⚠️ Faltan respuestas'}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChecklistBotiquin;