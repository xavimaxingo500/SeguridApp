import React, { useEffect, useState } from 'react';

const AREAS_CFE = [
  "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
  "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
  "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones", "T.I."
];

const DatosExtintor = ({ datos, onChange }) => {
  const [mostrarOtro, setMostrarOtro] = useState(() => datos.area && !AREAS_CFE.includes(datos.area));

  useEffect(() => {
    if (!datos.fecha) {
      const hoy = new Date().toISOString().split('T')[0];
      // Por defecto iniciamos con 1 extintor, máximo 10
      onChange({ fecha: hoy, numExtintores: 1 });
    }
  }, []);

  const handleChange = (e) => {
    let nuevos = { [e.target.name]: e.target.value };
    if (e.target.name === "area") setMostrarOtro(e.target.value === "Otros");
    onChange(nuevos);
  };

  return (
    <div className="card">
      <h2 className="card-title" style={{ borderLeft: '5px solid #FF9800', color: '#E65100' }}>🧯 Datos del Área</h2>
      
      <div className="form-grid">
        <div className="form-group full-width" style={{ background: '#FFF8E1', padding: '15px', borderRadius: '10px', border: '2px dashed #FF9800' }}>
          <label style={{ color: '#E65100', fontWeight: 'bold', fontSize: '1.1rem' }}>¿Cuántos extintores vas a revisar en esta área?</label>
          <select name="numExtintores" value={datos.numExtintores || 1} onChange={handleChange} style={{ marginTop: '10px', fontSize: '1.2rem', padding: '10px', fontWeight: 'bold' }}>
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} Extintor{num > 1 ? 'es' : ''}</option>
            ))}
          </select>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>El formato oficial permite hasta 10 por hoja.</p>
        </div>

        <div className="form-group">
          <label>Área de Trabajo:</label>
          <select name="area" value={datos.area || ''} onChange={handleChange}>
            <option value="" disabled>Selecciona...</option>
            {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
            <option value="Otros">Otros (Especificar)</option>
          </select>
        </div>
        
        {mostrarOtro && <div className="form-group"><label style={{ color: '#E65100' }}>Especificar Área:</label><input type="text" name="areaEspecifica" value={datos.areaEspecifica || ''} onChange={handleChange} /></div>}
        
        <div className="form-group full-width"><label>Fecha de Inspección:</label><input type="date" name="fecha" value={datos.fecha || ''} onChange={handleChange} /></div>
        
        <div className="form-group"><label>Inspeccionó (Tu Nombre):</label><input type="text" name="inspecciono" value={datos.inspecciono || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Vo. Bo. (Jefe/Responsable):</label><input type="text" name="vobo" value={datos.vobo || ''} onChange={handleChange} /></div>
      </div>
    </div>
  );
};

export default DatosExtintor;