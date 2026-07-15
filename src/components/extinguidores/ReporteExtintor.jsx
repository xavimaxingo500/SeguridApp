import React, { useState } from 'react';
import { generarPDFExtintor } from './generarPdfExtintor';

const ReporteExtintor = ({ datosForm, checklist, capturas, firma, coordenadasGPS, showNotification }) => {
  const [enviando, setEnviando] = useState(false);

  const handleDescargar = async () => {
    setEnviando(true);
    try {
      // 👇 AHORA SÍ LE PASAMOS LAS CAPTURAS AL PDF 👇
      await generarPDFExtintor(datosForm, checklist, firma, coordenadasGPS, capturas);
      showNotification('✅ PDF de Extintores generado correctamente', 'success');
    } catch (error) {
      console.error(error);
      showNotification('❌ Error al generar el documento', 'error');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="card text-center">
      <h2 style={{ color: '#FF9800' }}>🧯 Inspección de Extintores Lista</h2>
      <p className="text-gray-600 mb-6">
        Los datos del área, la evaluación de los extintores y las firmas están listos para imprimirse.
        {coordenadasGPS ? <><br/>📍 (Ubicación GPS lista)</> : ""}
        {capturas && Object.keys(capturas).length > 0 ? <><br/>📸 ({Object.keys(capturas).length} fotos adjuntas)</> : ""}
      </p>
      
      <button 
        onClick={handleDescargar} 
        disabled={enviando} 
        className="btn btn-success btn-large" 
        style={{ opacity: enviando ? 0.7 : 1, background: '#FF9800' }}
      >
         {enviando ? '⏳ Armando cuadrícula y fotos...' : '📄 Descargar Documento Oficial'}
      </button>
    </div>
  );
};

export default ReporteExtintor;