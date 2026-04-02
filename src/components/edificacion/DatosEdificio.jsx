import React from 'react';

const AREAS_CFE = [
  "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
  "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
  "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones", "T.I."
];

const MESES = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const DatosEdificio = ({ datos, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="card">
      <h2 className="card-title">🏢 Datos del Edificio</h2>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Área de Trabajo:</label>
          <select name="area" value={datos.area || ''} onChange={handleChange}>
            <option value="" disabled>Selecciona el área...</option>
            {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
            <option value="Otros">Otros (Especificar)</option>
          </select>
        </div>

        {datos.area === "Otros" && (
          <div className="form-group full-width" style={{ animation: 'fadeIn 0.3s' }}>
            <label style={{ color: '#E65100' }}>Especificar Área:</label>
            <input type="text" name="areaEspecifica" value={datos.areaEspecifica || ''} onChange={handleChange} placeholder="Ej. Finanzas" />
          </div>
        )}

        <div className="form-group full-width">
          <label>Dirección:</label>
          <input type="text" name="direccion" value={datos.direccion || ''} onChange={handleChange} placeholder="Ej. C.59 #488 x 58, 56 Centro" />
        </div>

        <div className="form-group">
          <label>Mes de Inspección:</label>
          <select name="mes" value={datos.mes || ''} onChange={handleChange}>
            <option value="" disabled>Selecciona...</option>
            {MESES.map((m, i) => <option key={i} value={m}>{m} - {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][i]}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de Inspección:</label>
          <select name="tipoInspeccion" value={datos.tipoInspeccion || ''} onChange={handleChange}>
            <option value="" disabled>Selecciona...</option>
            <option value="ORDINARIA">Ordinaria</option>
            <option value="EXTRAORDINARIA">Extraordinaria</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha 1er Recorrido:</label>
          <input type="date" name="fecha1" value={datos.fecha1 || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Fecha 2do Recorrido (Opcional):</label>
          <input type="date" name="fecha2" value={datos.fecha2 || ''} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default DatosEdificio;