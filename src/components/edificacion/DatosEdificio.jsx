// import React from 'react';

// const AREAS_CFE = [
//   "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
//   "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
//   "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones", "T.I."
// ];

// const MESES = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// const DatosEdificio = ({ datos, onChange }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onChange({ [name]: value });
//   };

//   return (
//     <div className="card">
//       <h2 className="card-title">🏢 Datos del Edificio</h2>
      
//       <div className="form-grid">
//         <div className="form-group full-width">
//           <label>Área de Trabajo:</label>
//           <select name="area" value={datos.area || ''} onChange={handleChange}>
//             <option value="" disabled>Selecciona el área...</option>
//             {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
//             <option value="Otros">Otros (Especificar)</option>
//           </select>
//         </div>

//         {datos.area === "Otros" && (
//           <div className="form-group full-width" style={{ animation: 'fadeIn 0.3s' }}>
//             <label style={{ color: '#E65100' }}>Especificar Área:</label>
//             <input type="text" name="areaEspecifica" value={datos.areaEspecifica || ''} onChange={handleChange} placeholder="Ej. Finanzas" />
//           </div>
//         )}

//         <div className="form-group full-width">
//           <label>Dirección:</label>
//           <input type="text" name="direccion" value={datos.direccion || ''} onChange={handleChange} placeholder="Ej. C.59 #488 x 58, 56 Centro" />
//         </div>

//         <div className="form-group">
//           <label>Mes de Inspección:</label>
//           <select name="mes" value={datos.mes || ''} onChange={handleChange}>
//             <option value="" disabled>Selecciona...</option>
//             {MESES.map((m, i) => <option key={i} value={m}>{m} - {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][i]}</option>)}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Tipo de Inspección:</label>
//           <select name="tipoInspeccion" value={datos.tipoInspeccion || ''} onChange={handleChange}>
//             <option value="" disabled>Selecciona...</option>
//             <option value="ORDINARIA">Ordinaria</option>
//             <option value="EXTRAORDINARIA">Extraordinaria</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Fecha 1er Recorrido:</label>
//           <input type="date" name="fecha1" value={datos.fecha1 || ''} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Fecha 2do Recorrido (Opcional):</label>
//           <input type="date" name="fecha2" value={datos.fecha2 || ''} onChange={handleChange} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatosEdificio;




import React, { useEffect } from 'react';

const AREAS_CFE = [
  "Recursos Humanos", "CAC Oriente", "CAC Poniente", "CAC Norte", "CAC Sur",
  "CAC Centro", "CAC Progreso", "CAC Uman", "CAC Conkal", "CAC Hunucma",
  "CAC Acanceh", "CAC Caucel", "Facturación", "Cobranza", "Notificaciones", "T.I."
];

// Diccionario para autocompletar direcciones
const DIRECCIONES_CFE = {
  "CAC Centro": "C.59 #488 x 58 y 56, Centro",
  "CAC Norte": "Calle 42 #123 x 45, Francisco de Montejo",
  "Notificaciones": "C.59 #488 x 58 y 56, Centro",
  // Agrega aquí las demás direcciones que te sepas...
};

const MESES_LETRAS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const DatosEdificio = ({ datos, onChange }) => {

  // Auto-llenar fecha y mes al abrir el componente
  useEffect(() => {
    if (!datos.fecha1) {
      const hoy = new Date();
      const fechaFormat = hoy.toISOString().split('T')[0]; // YYYY-MM-DD
      const letraMes = MESES_LETRAS[hoy.getMonth()];
      
      onChange({ 
        fecha1: fechaFormat,
        mes: letraMes,
        tipoInspeccion: "ORDINARIA" // Valor por defecto
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevosDatos = { [name]: value };

    // Si cambian el área, auto-llenamos la dirección
    if (name === "area" && value !== "Otros") {
      nuevosDatos.direccion = DIRECCIONES_CFE[value] || "";
    }

    onChange(nuevosDatos);
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
          <label>Dirección (Auto-llenado):</label>
          <input type="text" name="direccion" value={datos.direccion || ''} onChange={handleChange} placeholder="Se llena sola al elegir área..." />
        </div>

        <div className="form-group full-width">
          <label>Tipo de Inspección:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            {/* Botones estilo "Apagador" */}
            <button 
              type="button"
              onClick={() => onChange({ tipoInspeccion: "ORDINARIA" })}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.tipoInspeccion === "ORDINARIA" ? '#2196F3' : '#f0f0f0', color: datos.tipoInspeccion === "ORDINARIA" ? 'white' : 'black', fontWeight: 'bold' }}>
              ORDINARIA
            </button>
            <button 
              type="button"
              onClick={() => onChange({ tipoInspeccion: "EXTRAORDINARIA" })}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.tipoInspeccion === "EXTRAORDINARIA" ? '#2196F3' : '#f0f0f0', color: datos.tipoInspeccion === "EXTRAORDINARIA" ? 'white' : 'black', fontWeight: 'bold' }}>
              EXTRAORDINARIA
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Fecha del Recorrido (Auto):</label>
          <input type="date" name="fechaActual" value={datos.fecha1 || ''} onChange={handleChange} />
        </div>
        
        {/* Agregamos el campo de nombres para las firmas */}
        <div className="form-group">
          <label>Nombre del Patrón:</label>
          <input type="text" name="nombrePatron" value={datos.nombrePatron || ''} onChange={handleChange} placeholder="Ej. Ing. Juan Pérez" />
        </div>
        <div className="form-group">
          <label>Nombre del Colaborador:</label>
          <input type="text" name="nombreColaborador" value={datos.nombreColaborador || ''} onChange={handleChange} placeholder="Tu nombre..." />
        </div>
      </div>
    </div>
  );
};

export default DatosEdificio;