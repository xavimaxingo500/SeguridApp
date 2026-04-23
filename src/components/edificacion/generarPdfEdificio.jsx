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

const cargarImagen = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
  });
};

export const generarPDFEdificio = async (datosForm, checklist, firma) => {
  const areaTexto = datosForm.area === "Otros" ? datosForm.areaEspecifica : (datosForm.area || "Otros");
  const areaAbbr = ABREVIATURAS[datosForm.area] || "OTROS"; 
  
  const now = new Date();
  const timestamp = `${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
  const ID_GENERADO = `Edificio_${areaAbbr}_${timestamp}`;

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  let yPos = 10;
  const hFila = 6.5;

  // Cargar logos
  const imgSuterm = await cargarImagen(sutermLogo);
  const imgCfe = await cargarImagen(cfeLogo);

  if (imgSuterm) doc.addImage(imgSuterm, 'PNG', margin, yPos, 15, 15);
  if (imgCfe) doc.addImage(imgCfe, 'PNG', pageWidth - margin - 28, yPos + 2, 28, 10);

  // Encabezados
  doc.setFontSize(14); doc.setFont('helvetica', 'bold');
  doc.text("COMISION FEDERAL DE ELECTRICIDAD", pageWidth / 2, yPos + 6, { align: 'center' });
  doc.setFontSize(10);
  doc.text("DIVISION DE DISTRIBUCION PENINSULAR", pageWidth / 2, yPos + 11, { align: 'center' });
  doc.text("GUÍA DE INSPECCIÓN: EDIFICIO", pageWidth / 2, yPos + 16, { align: 'center' });
  
  yPos += 22;

  // Datos Generales
  doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.text(`ÁREA DE TRABAJO:`, margin, yPos); 
  doc.setFont('helvetica', 'normal');
  doc.text(areaTexto || '', margin + 35, yPos);
  doc.line(margin + 34, yPos + 1, margin + 90, yPos + 1);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`DIRECCIÓN:`, margin + 95, yPos);
  doc.setFont('helvetica', 'normal'); doc.text(datosForm.direccion || '', margin + 118, yPos);
  doc.line(margin + 117, yPos + 1, pageWidth - margin, yPos + 1);
  
  yPos += 8;

  // --- TABLA DE 2 QUINCENAS ---
  const wNo = 6;
  const wIdent = 45; 
  const wCheck = 5; 
  const wObs = 20; 

  doc.setFillColor(220, 220, 220);
  doc.rect(margin, yPos, pageWidth - (margin*2), hFila * 1.5, 'FD');
  doc.setFontSize(6); doc.setFont('helvetica', 'bold');
  
  doc.text("No.", margin + 1, yPos + 6);
  doc.text("IDENTIFICACIÓN EDIFICIO", margin + wNo + 2, yPos + 6);
  
  // Headers Quincena 1
  let xOffset = margin + wNo + wIdent;
  doc.text("SI", xOffset + 1, yPos + 6);
  doc.text("NO", xOffset + wCheck + 1, yPos + 6);
  doc.text("REQ.", xOffset + (wCheck*2) + 0.5, yPos + 4);
  doc.text("MPC", xOffset + (wCheck*2) + 0.5, yPos + 7);
  doc.text("OBS", xOffset + (wCheck*3) + 2, yPos + 6);

  // Headers Quincena 2
  xOffset = xOffset + (wCheck*3) + wObs; 
  doc.text("SI", xOffset + 1, yPos + 6);
  doc.text("NO", xOffset + wCheck + 1, yPos + 6);
  doc.text("REQ.", xOffset + (wCheck*2) + 0.5, yPos + 4);
  doc.text("MPC", xOffset + (wCheck*2) + 0.5, yPos + 7);
  doc.text("OBS", xOffset + (wCheck*3) + 2, yPos + 6);

  yPos += hFila * 1.5;

  // Llenado de Filas
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  itemsEdificio.forEach((item, index) => {
    const filaActual = yPos + (index * hFila);
    const resp1 = checklist[item] || {}; 
    
    doc.rect(margin, filaActual, wNo, hFila);
    doc.rect(margin + wNo, filaActual, wIdent, hFila);
    
    let currentX = margin + wNo + wIdent;
    doc.rect(currentX, filaActual, wCheck, hFila);
    doc.rect(currentX + wCheck, filaActual, wCheck, hFila);
    doc.rect(currentX + (wCheck*2), filaActual, wCheck, hFila);
    doc.rect(currentX + (wCheck*3), filaActual, wObs, hFila);
    
    let currentX2 = currentX + (wCheck*3) + wObs;
    doc.rect(currentX2, filaActual, wCheck, hFila);
    doc.rect(currentX2 + wCheck, filaActual, wCheck, hFila);
    doc.rect(currentX2 + (wCheck*2), filaActual, wCheck, hFila);
    doc.rect(currentX2 + (wCheck*3), filaActual, wObs, hFila);

    doc.text(`${index + 1}.-`, margin + 1, filaActual + 4.5);
    doc.text(item, margin + wNo + 1, filaActual + 4.5);
    
    doc.setFont('helvetica', 'bold');
    if (resp1.estado === "SI") doc.text("X", currentX + 1.5, filaActual + 4.5);
    if (resp1.estado === "NO") doc.text("X", currentX + wCheck + 1.5, filaActual + 4.5);
    if (resp1.estado === "MPC") doc.text("X", currentX + (wCheck*2) + 1.5, filaActual + 4.5);
    
    doc.setFont('helvetica', 'normal');
    if (resp1.obs) {
        let obsTexto = resp1.obs.length > 18 ? resp1.obs.substring(0, 16) + "..." : resp1.obs;
        doc.text(obsTexto, currentX + (wCheck*3) + 1, filaActual + 4.5);
    }
  });

  yPos = yPos + (24 * hFila) + 5;

  // COMENTARIOS 
  doc.rect(margin, yPos, 80, 25);
  doc.setFontSize(6); doc.setFont('helvetica', 'bold');
  doc.text("COMENTARIOS", margin + 2, yPos + 4);
  doc.setFont('helvetica', 'normal');
  if (datosForm.comentarios) {
     const splitComentarios = doc.splitTextToSize(datosForm.comentarios, 76);
     doc.text(splitComentarios, margin + 2, yPos + 8);
  }

  // MESES
  const xRightBox = margin + 85;
  doc.setFontSize(7); doc.setFont('helvetica', 'bold');
  doc.text("MARCAR CON UNA X EL MES", xRightBox, yPos + 3);
  
  const mesesArr = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const wMes = 6;
  mesesArr.forEach((m, i) => {
    doc.rect(xRightBox + (i * wMes), yPos + 5, wMes, hFila);
    doc.text(m, xRightBox + (i * wMes) + 2, yPos + 9);
    if (datosForm.mes === m) { 
      doc.setFontSize(9);
      doc.text("X", xRightBox + (i * wMes) + 1.5, yPos + 9.5);
      doc.setFontSize(7);
    }
  });

  // TIPO INSPECCION Y FECHAS
  let yFechas = yPos + 15;
  doc.text("TIPO DE INSPECCIÓN", xRightBox, yFechas + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`ORDINARIA ( ${datosForm.tipoInspeccion === "ORDINARIA" ? "X" : " "} )`, xRightBox + 40, yFechas + 3);
  doc.text(`EXTRAORDINARIA ( ${datosForm.tipoInspeccion === "EXTRAORDINARIA" ? "X" : " "} )`, xRightBox + 40, yFechas + 7);

  yFechas += 12;
  let a1="", m1="", d1="";
  if(datosForm.fecha1) {
     const partes = datosForm.fecha1.split('-');
     a1 = partes[0].slice(-2); 
     m1 = partes[1];
     d1 = partes[2];
  }

  doc.text("FECHA 1er RECORRIDO", xRightBox, yFechas + 4);
  doc.rect(xRightBox + 40, yFechas, 10, hFila); doc.text("AÑO", xRightBox+41, yFechas-1); doc.text(a1, xRightBox+42, yFechas+4.5);
  doc.rect(xRightBox + 50, yFechas, 10, hFila); doc.text("MES", xRightBox+51, yFechas-1); doc.text(m1, xRightBox+52, yFechas+4.5);
  doc.rect(xRightBox + 60, yFechas, 10, hFila); doc.text("DIA", xRightBox+61, yFechas-1); doc.text(d1, xRightBox+62, yFechas+4.5);

  // FIRMAS
  yPos += 35; 
  doc.setFillColor(200, 200, 200);
  doc.rect(margin, yPos, pageWidth - (margin*2), 6, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text("PRIMERA REVISIÓN", pageWidth / 2, yPos + 4, {align: 'center'});
  
  yPos += 20; 
  doc.line(margin + 10, yPos, margin + 80, yPos);
  doc.line(margin + 110, yPos, margin + 180, yPos);
  
  doc.text("NOMBRE Y FIRMA PATRÓN", margin + 45, yPos + 4, {align: 'center'});
  doc.text("NOMBRE FIRMA COLABORADOR", margin + 145, yPos + 4, {align: 'center'});
  
  doc.setFont('helvetica', 'normal');
  doc.text(datosForm.nombrePatron || "", margin + 45, yPos - 1, {align: 'center'});
  doc.text(datosForm.nombreColaborador || datosForm.nombre || "", margin + 145, yPos - 1, {align: 'center'});

  // Guardar Keywords para recuperar datos después
  const estadoParaGuardar = JSON.stringify({ form: datosForm, checklist, idActual: ID_GENERADO });
  doc.setProperties({ title: ID_GENERADO, keywords: estadoParaGuardar });

  doc.setFontSize(6); doc.setTextColor(128);
  doc.text("FORMA SH-210", margin, pageHeight - 8);
  doc.text(`ID: ${ID_GENERADO}`, pageWidth / 2, pageHeight - 8, { align: 'center' });

  doc.save(`${ID_GENERADO}.pdf`);
  
  return true; // Retornamos true si todo salió bien
};