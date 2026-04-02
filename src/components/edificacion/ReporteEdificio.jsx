import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import cfeLogo from '../Logos/cfe.png';
import sutermLogo from '../Logos/suterm.png';
import { itemsEdificio } from './ChecklistEdificio';

const ABREVIATURAS = {
  "Recursos Humanos": "RH", "Notificaciones": "NA", "Cobranza": "COB",
  "Facturación": "FAC", "CAC Conkal": "CKL", "CAC Poniente": "PTE",
  "CAC Centro": "CNO", "CAC Progreso": "PPO", "CAC Sur": "SUR",
  "CAC Norte": "NTE", "CAC Acanceh": "AAH", "CAC Caucel": "CCL",
  "T.I.": "TI", "CAC Uman": "UMA", "CAC Hunucma": "HUN",
  "CAC Oriente": "OT", "Otros": "OTROS"
};

const ReporteEdificio = ({ datosForm, checklist, firma, showNotification }) => {
  const [enviando, setEnviando] = useState(false);

  const generarID = () => {
    const areaSeleccionada = datosForm.area === "Otros" ? datosForm.areaEspecifica : (datosForm.area || "Otros");
    const areaAbbr = ABREVIATURAS[datosForm.area] || "OTROS"; 
    
    const now = new Date();
    const timestamp = `${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
    
    return `Edificio_${areaAbbr}_${timestamp}`;
  };

  const cargarImagen = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  };

  const generarPDF = async () => {
    try {
      setEnviando(true);
      const ID_GENERADO = generarID();
      // Formato Vertical (Portrait) para que entren los 24 items
      const doc = new jsPDF('p', 'mm', 'a4'); 
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 10;
      let yPos = 10;
      const hFila = 6.5; 

      const imgSuterm = await cargarImagen(sutermLogo);
      const imgCfe = await cargarImagen(cfeLogo);

      if (imgSuterm) doc.addImage(imgSuterm, 'PNG', margin, yPos, 15, 15);
      if (imgCfe) doc.addImage(imgCfe, 'PNG', pageWidth - margin - 28, yPos + 2, 28, 10);

      doc.setFontSize(14); doc.setFont('helvetica', 'bold');
      doc.text("COMISION FEDERAL DE ELECTRICIDAD", pageWidth / 2, yPos + 6, { align: 'center' });
      doc.setFontSize(10);
      doc.text("DIVISION DE DISTRIBUCION PENINSULAR", pageWidth / 2, yPos + 11, { align: 'center' });
      doc.text("GUÍA DE INSPECCIÓN: EDIFICIO", pageWidth / 2, yPos + 16, { align: 'center' });
      yPos += 22;

      // Encabezados de Datos
      doc.setFontSize(9); doc.setFont('helvetica', 'bold');
      const areaTexto = datosForm.area === "Otros" ? datosForm.areaEspecifica : (datosForm.area || '');
      doc.text(`ÁREA DE TRABAJO:`, margin, yPos); 
      doc.setFont('helvetica', 'normal'); doc.text(areaTexto, margin + 35, yPos);
      doc.line(margin + 34, yPos + 1, margin + 90, yPos + 1);

      doc.setFont('helvetica', 'bold');
      doc.text(`DIRECCIÓN:`, margin + 95, yPos); 
      doc.setFont('helvetica', 'normal'); doc.text(datosForm.direccion || '', margin + 118, yPos);
      doc.line(margin + 117, yPos + 1, pageWidth - margin, yPos + 1);
      
      yPos += 8;

      // Dibujar la Tabla
      const wNo = 8;
      const wIdent = 55;
      const wCheck = 8; // para SI, NO, MPC
      const wObs = pageWidth - (margin * 2) - wNo - wIdent - (wCheck * 3);
      
      // Cabecera Tabla
      doc.setFillColor(220, 220, 220);
      doc.rect(margin, yPos, pageWidth - (margin*2), hFila * 1.5, 'FD');
      doc.setFontSize(7); doc.setFont('helvetica', 'bold');
      doc.text("No.", margin + 1, yPos + 6);
      doc.text("IDENTIFICACIÓN", margin + wNo + 2, yPos + 4);
      doc.text("EDIFICIO", margin + wNo + 2, yPos + 7);
      doc.text("SI", margin + wNo + wIdent + 2, yPos + 6);
      doc.text("NO", margin + wNo + wIdent + wCheck + 1, yPos + 6);
      doc.text("REQ.", margin + wNo + wIdent + (wCheck*2) + 1, yPos + 4);
      doc.text("MPC", margin + wNo + wIdent + (wCheck*2) + 1, yPos + 7);
      doc.text("OBSERVACIONES", margin + wNo + wIdent + (wCheck*3) + 20, yPos + 6);
      
      yPos += hFila * 1.5;

      // Filas de los 24 items
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      itemsEdificio.forEach((item, index) => {
        const filaActual = yPos + (index * hFila);
        const resp = checklist[item] || {};

        // Bordes
        doc.rect(margin, filaActual, wNo, hFila);
        doc.rect(margin + wNo, filaActual, wIdent, hFila);
        doc.rect(margin + wNo + wIdent, filaActual, wCheck, hFila);
        doc.rect(margin + wNo + wIdent + wCheck, filaActual, wCheck, hFila);
        doc.rect(margin + wNo + wIdent + (wCheck*2), filaActual, wCheck, hFila);
        doc.rect(margin + wNo + wIdent + (wCheck*3), filaActual, wObs, hFila);

        // Textos
        doc.text(`${index + 1}.-`, margin + 1, filaActual + 4.5);
        doc.text(item, margin + wNo + 1, filaActual + 4.5);

        // Marcas
        doc.setFont('helvetica', 'bold');
        if (resp.estado === "SI") doc.text("X", margin + wNo + wIdent + 2.5, filaActual + 4.5);
        if (resp.estado === "NO") doc.text("X", margin + wNo + wIdent + wCheck + 2.5, filaActual + 4.5);
        if (resp.estado === "MPC") doc.text("X", margin + wNo + wIdent + (wCheck*2) + 2.5, filaActual + 4.5);
        doc.setFont('helvetica', 'normal');

        // Observaciones
        if (resp.obs) {
            let obsTexto = resp.obs.length > 50 ? resp.obs.substring(0, 47) + "..." : resp.obs;
            doc.text(obsTexto, margin + wNo + wIdent + (wCheck*3) + 2, filaActual + 4.5);
        }
      });

      yPos = yPos + (24 * hFila) + 5;

      // Sección inferior derecha (Fechas y Meses)
      const xRightBox = pageWidth / 2 + 10;
      doc.setFontSize(7); doc.setFont('helvetica', 'bold');
      doc.text("MARCAR CON UNA X EL MES", xRightBox + 20, yPos);
      
      yPos += 2;
      const mesesArr = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
      const wMes = 6;
      mesesArr.forEach((m, i) => {
        doc.rect(xRightBox + (i * wMes), yPos, wMes, hFila);
        doc.text(m, xRightBox + (i * wMes) + 2, yPos + 4);
        if (datosForm.mes === m) {
          doc.setFontSize(9);
          doc.text("X", xRightBox + (i * wMes) + 1.5, yPos + 4.5);
          doc.setFontSize(7);
        }
      });

      yPos += hFila + 2;
      doc.text("TIPO DE INSPECCIÓN", xRightBox + 25, yPos + 3);
      yPos += 5;
      
      doc.setFont('helvetica', 'normal');
      doc.rect(xRightBox, yPos, 36, hFila); doc.text(`ORDINARIA ${datosForm.tipoInspeccion === "ORDINARIA" ? "( X )" : ""}`, xRightBox + 2, yPos + 4);
      doc.rect(xRightBox + 36, yPos, 36, hFila); doc.text(`EXTRAORDINARIA ${datosForm.tipoInspeccion === "EXTRAORDINARIA" ? "( X )" : ""}`, xRightBox + 38, yPos + 4);

      yPos += hFila + 2;
      // Firma
      doc.setFont('helvetica', 'bold');
      doc.text("COMISIÓN LOCAL DE SEGURIDAD E HIGIENE", xRightBox + 5, yPos + 5);
      
      if (firma) doc.addImage(firma, 'PNG', xRightBox + 10, yPos + 10, 40, 15);
      doc.line(xRightBox, yPos + 25, pageWidth - margin, yPos + 25);
      doc.setFont('helvetica', 'normal');
      doc.text("NOMBRE Y FIRMA DEL COLABORADOR", xRightBox + 15, yPos + 29);

      // Metadatos y Descarga
      doc.setFontSize(6); doc.setTextColor(128);
      doc.text("FORMA SH-210", margin, pageHeight - 8);
      doc.text('Documento generado por SeguridApp', pageWidth / 2, pageHeight - 8, { align: 'center' });
      doc.text(`ID: ${ID_GENERADO}`, pageWidth / 2, pageHeight - 4, { align: 'center' });

      doc.save(`${ID_GENERADO}.pdf`);
      showNotification(' ✅ PDF de Edificio generado correctamente', 'success');

    } catch (error) { 
      console.error(error);
      showNotification(' ❌ Error en el proceso', 'error'); 
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="card text-center">
      <h2> 🎉 Inspección de Edificio Lista</h2>
      <p className="text-gray-600 mb-6">El documento de revisión de instalaciones está completo.</p>
      
      <button onClick={generarPDF} disabled={enviando} className="btn btn-success btn-large" style={{ opacity: enviando ? 0.7 : 1 }}>
         {enviando ? '⏳ Generando documento...' : '📄 Descargar Documento Edificio'}
      </button>
    </div>
  );
};

export default ReporteEdificio;