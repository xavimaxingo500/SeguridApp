import React, { useState } from 'react';
import { generarPDFBotiquin } from './generarPdfBotiquin';

// Agregamos "coordenadasGPS" a las propiedades que recibe
const ReporteBotiquin = ({ datosForm, checklist, capturas, firma, coordenadasGPS, showNotification }) => {
  const [enviando, setEnviando] = useState(false);

  const handleDescargar = async () => {
    setEnviando(true);
    try {
      // Mandamos las coordenadas al generador PDF
      await generarPDFBotiquin(datosForm, checklist, firma, coordenadasGPS);
      showNotification('✅ PDF de Botiquín generado correctamente', 'success');
    } catch (error) {
      console.error("Error al generar PDF:", error);
      showNotification('❌ Error al generar el documento', 'error');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="card text-center">
      <h2>🎉 Inspección de Botiquín Lista</h2>
      <p className="text-gray-600 mb-6">
        El inventario mensual y la firma del responsable han sido registrados correctamente.
        {coordenadasGPS ? "📍 (Ubicación GPS guardada en el reporte)" : ""}
      </p>
      
      <button 
        onClick={handleDescargar} 
        disabled={enviando} 
        className="btn btn-success btn-large" 
        style={{ opacity: enviando ? 0.7 : 1, background: '#d32f2f' }}
      >
         {enviando ? '⏳ Generando documento...' : '📄 Descargar Documento Botiquín'}
      </button>
    </div>
  );
};

export default ReporteBotiquin;