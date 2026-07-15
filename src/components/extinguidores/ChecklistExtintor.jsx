import React, { useState, useEffect } from 'react';

export const itemsExtintor = [
  { id: '1', nombre: "EXTINTOR A-B-C." },
  { id: '2', nombre: "EXTINTOR CO2" },
  { id: '3', nombre: "EXTINTOR PQ" },
  { id: '4', nombre: "CAPACIDAD", tipo: "texto", placeholder: "Ej. 4.5 Kg" },
  { id: '5', nombre: "SOPORTE DE PARED" },
  { id: '6', nombre: "SEGURO" },
  { id: '7', nombre: "MANGUERA/TOBERA" },
  { id: '8', nombre: "MANÓMETRO" },
  { id: '9', nombre: "CARGADO" },
  { id: '10', nombre: "DESCARGADO" },
  { id: '11', nombre: "PINTURA DEL CILINDRO" },
  { id: '12', nombre: "ETIQUETAS" },
  { id: '13', nombre: "SEÑALAMIENTOS" },
  { id: '14', nombre: "ALTURA (1.50mt.)" },
  { id: '15', nombre: "LOCALIZACIÓN:", tipo: "texto", placeholder: "Ej. Pasillo principal" },
  { id: '16', nombre: "OTROS" }
];

const OpcionesEscala = [
  { valor: 'B', color: '#4CAF50', label: 'BUENO' },
  { valor: 'E', color: '#FF9800', label: 'EXTRAVIADO' },
  { valor: 'R', color: '#F44336', label: 'ROBADO' },
  { valor: 'M', color: '#E91E63', label: 'MALO' },
  { valor: 'NA', color: '#9E9E9E', label: 'NO APLICA' }
];

const ChecklistExtintor = ({ onChange, datosPrevios, numExtintores }) => {
  const [respuestas, setRespuestas] = useState(datosPrevios?.extintores || {});
  const [observacionesRow, setObservacionesRow] = useState(datosPrevios?.observacionesRow || {});
  const [extintorActivo, setExtintorActivo] = useState(1);

  useEffect(() => {
    // Inicializar la estructura si está vacía
    let nuevasResp = { ...respuestas };
    for (let i = 1; i <= numExtintores; i++) {
      if (!nuevasResp[i]) nuevasResp[i] = {};
    }
    setRespuestas(nuevasResp);
  }, [numExtintores]);

  const marcar = (extId, itemId, valor) => {
    const nuevo = { ...respuestas, [extId]: { ...respuestas[extId], [itemId]: valor } };
    setRespuestas(nuevo);
    onChange({ extintores: nuevo, observacionesRow });
  };

  const manejarObs = (itemId, txt) => {
    const nuevoObs = { ...observacionesRow, [itemId]: txt };
    setObservacionesRow(nuevoObs);
    onChange({ extintores: respuestas, observacionesRow: nuevoObs });
  };

  const totalPreguntasPorExtintor = itemsExtintor.length;
  const contestadosActual = Object.keys(respuestas[extintorActivo] || {}).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#E65100', marginBottom: '10px' }}>Revisión de Extintores</h2>
      
      {/* TABS DE EXTINTORES */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {Array.from({ length: numExtintores }, (_, i) => i + 1).map(num => {
          const estaCompleto = Object.keys(respuestas[num] || {}).length === totalPreguntasPorExtintor;
          return (
            <button key={num} onClick={() => setExtintorActivo(num)} 
              style={{ 
                flex: '0 0 auto', padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: extintorActivo === num ? '#FF9800' : (estaCompleto ? '#E8F5E9' : '#e0e0e0'), 
                color: extintorActivo === num ? 'white' : '#333', fontWeight: 'bold', boxShadow: extintorActivo === num ? '0 4px 6px rgba(255,152,0,0.3)' : 'none'
              }}>
              Extintor {num} {estaCompleto && '✓'}
            </button>
          )
        })}
        {/* TAB DE OBSERVACIONES GENERALES */}
        <button onClick={() => setExtintorActivo('OBS')} 
          style={{ 
            flex: '0 0 auto', padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: extintorActivo === 'OBS' ? '#607D8B' : '#e0e0e0', color: extintorActivo === 'OBS' ? 'white' : '#333', fontWeight: 'bold' 
          }}>
          📝 Observaciones de Fila
        </button>
      </div>

      {/* CONTENIDO DEL EXTINTOR */}
      {extintorActivo !== 'OBS' && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', animation: 'fadeIn 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #FF9800', paddingBottom: '10px' }}>
            <h3 style={{ color: '#E65100', margin: 0 }}>Evaluando Extintor {extintorActivo}</h3>
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Avance: {contestadosActual}/{totalPreguntasPorExtintor}</span>
          </div>

          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            {OpcionesEscala.map(op => (
              <span key={op.valor} style={{ fontSize: '0.75rem', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
                <b style={{ color: op.color }}>{op.valor}</b> = {op.label}
              </span>
            ))}
          </div>

          {itemsExtintor.map((item) => (
            <div key={item.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.id}. {item.nombre}</span>
                
                {item.tipo === 'texto' ? (
                  <input type="text" placeholder={item.placeholder} value={respuestas[extintorActivo]?.[item.id] || ""} onChange={(e) => marcar(extintorActivo, item.id, e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }} />
                ) : (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {OpcionesEscala.map(opt => {
                      const isSelected = respuestas[extintorActivo]?.[item.id] === opt.valor;
                      return (
                        <button key={opt.valor} onClick={() => marcar(extintorActivo, item.id, opt.valor)}
                          style={{
                            flex: 1, padding: '10px 5px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer',
                            background: isSelected ? opt.color : '#fff', color: isSelected ? 'white' : '#333', fontWeight: 'bold', fontSize: '0.85rem', transition: '0.2s'
                          }}>
                          {opt.valor}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTENIDO DE OBSERVACIONES GENERALES */}
      {extintorActivo === 'OBS' && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', animation: 'fadeIn 0.3s' }}>
          <h3 style={{ color: '#607D8B', borderBottom: '2px solid #607D8B', paddingBottom: '10px' }}>Observaciones por fila (Opcional)</h3>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>Si necesitas hacer una anotación general sobre algún punto (Ej. "Mangueras rotas en los extintores 2 y 4"), escríbela aquí.</p>
          
          {itemsExtintor.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#333' }}>{item.id}. {item.nombre}</label>
              <input type="text" placeholder="Observación..." value={observacionesRow[item.id] || ""} onChange={(e) => manejarObs(item.id, e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', marginTop: '4px' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChecklistExtintor;