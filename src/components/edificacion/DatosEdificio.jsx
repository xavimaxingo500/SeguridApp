import React, { useEffect } from 'react';

const AREAS_CFE = [
  "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
  "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
  "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones", "T.I."
];

const DIRECCIONES_CFE = {
  "CAC Centro": "C.59 #488 x 58 y 56, Centro",
  "CAC Norte": "Calle 42 #123 x 45, Francisco de Montejo",
  "Notificaciones": "C.59 #488 x 58 y 56, Centro",
};

const MESES_LETRAS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const DatosEdificio = ({ datos, onChange }) => {
  useEffect(() => {
    if (!datos.fecha1) {
      const hoy = new Date();
      const fechaFormat = hoy.toISOString().split('T')[0];
      const letraMes = MESES_LETRAS[hoy.getMonth()];
      onChange({ 
        fecha1: fechaFormat,
        mes: letraMes,
        tipoInspeccion: "ORDINARIA",
        quincenaActiva: "quincena1" // Por defecto arranca en la 1
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevosDatos = { [name]: value };
    if (name === "area" && value !== "Otros") {
      nuevosDatos.direccion = DIRECCIONES_CFE[value] || "";
    }
    onChange(nuevosDatos);
  };

  return (
    <div className="card">
      <h2 className="card-title">🏢 Datos del Edificio</h2>
      <div className="form-grid">
        
        {/* NUEVO: SELECTOR DE QUINCENA */}
        <div className="form-group full-width" style={{ background: '#E3F2FD', padding: '15px', borderRadius: '10px', border: '2px dashed #2196F3' }}>
          <label style={{ color: '#1565C0', fontWeight: 'bold' }}>¿Qué recorrido estás realizando?</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <button type="button" onClick={() => onChange({ quincenaActiva: "quincena1" })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.quincenaActiva === "quincena1" ? '#2196F3' : '#fff', color: datos.quincenaActiva === "quincena1" ? 'white' : 'black', fontWeight: 'bold' }}>
              1ra Quincena
            </button>
            <button type="button" onClick={() => onChange({ quincenaActiva: "quincena2" })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.quincenaActiva === "quincena2" ? '#2196F3' : '#fff', color: datos.quincenaActiva === "quincena2" ? 'white' : 'black', fontWeight: 'bold' }}>
              2da Quincena
            </button>
          </div>
        </div>

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
        
        <div className="form-group full-width"><label>Dirección (Auto-llenado):</label><input type="text" name="direccion" value={datos.direccion || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Tipo de Inspección:</label><select name="tipoInspeccion" value={datos.tipoInspeccion || ''} onChange={handleChange}><option value="ORDINARIA">ORDINARIA</option><option value="EXTRAORDINARIA">EXTRAORDINARIA</option></select></div>
        <div className="form-group"><label>Fecha del Recorrido:</label><input type="date" name="fecha1" value={datos.fecha1 || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Nombre del Patrón:</label><input type="text" name="nombrePatron" value={datos.nombrePatron || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Nombre del Colaborador:</label><input type="text" name="nombreColaborador" value={datos.nombreColaborador || ''} onChange={handleChange} /></div>
      </div>
    </div>
  );
};

export default DatosEdificio;