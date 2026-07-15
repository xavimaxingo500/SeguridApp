import React, { useEffect } from 'react';

const AREAS_CFE = [
  "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
  "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
  "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones", "T.I."
];

const DatosBotiquin = ({ datos, onChange }) => {
  useEffect(() => {
    if (!datos.fechaRevision) {
      const hoy = new Date().toISOString().split('T')[0];
      onChange({ fechaRevision: hoy });
    }
  }, []);

  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <h2 className="card-title" style={{ borderLeft: '5px solid #d32f2f', color: '#d32f2f' }}>
        🚑 Datos del Botiquín
      </h2>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Proceso / Departamento:</label>
          <select name="depto" value={datos.depto || ''} onChange={handleChange}>
            <option value="" disabled>Selecciona el departamento...</option>
            {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
            <option value="Otros">Otros (Especificar)</option>
          </select>
        </div>

        {datos.depto === "Otros" && (
          <div className="form-group full-width">
            <label style={{ color: '#d32f2f' }}>Especificar Depto:</label>
            <input type="text" name="deptoEspecifico" value={datos.deptoEspecifico || ''} onChange={handleChange} />
          </div>
        )}

        <div className="form-group">
          <label>Número de Botiquín:</label>
          <input type="text" name="botiquinNum" value={datos.botiquinNum || ''} onChange={handleChange} placeholder="Ej. BOTIQUÍN # 1" />
        </div>

        <div className="form-group">
          <label>Fecha de Revisión:</label>
          <input type="date" name="fechaRevision" value={datos.fechaRevision || ''} onChange={handleChange} />
        </div>
        
        <div className="form-group full-width">
          <label>Ubicación General:</label>
          <input type="text" name="ubicacion" value={datos.ubicacion || ''} onChange={handleChange} placeholder="Ej. Recepción principal" />
        </div>

        <div className="form-group full-width">
          <label>Área / Piso Específico:</label>
          <input type="text" name="areaPiso" value={datos.areaPiso || ''} onChange={handleChange} placeholder="Ej. Planta Baja" />
        </div>

        <div className="form-group full-width">
          <label>Responsable del Botiquín (Nombre completo y R.P.E.):</label>
          <input type="text" name="responsable" value={datos.responsable || ''} onChange={handleChange} placeholder="Ej. 9EMEE DORIS PEREZ UC" />
        </div>
      </div>
    </div>
  );
};

export default DatosBotiquin;