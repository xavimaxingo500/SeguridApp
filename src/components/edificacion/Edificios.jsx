// import React, { useRef, useState, useEffect } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
// import { PDFDocument } from 'pdf-lib';
// import { jsPDF } from 'jspdf';

// // ====> TUS LOGOS <====
// import logoSutermImg from '../Logos/suterm.png';
// import logoCfeImg from '../Logos/cfe.png';

// const ABREVIATURAS = {
//   "Recursos Humanos": "RH", "Notificaciones": "NA", "Cobranza": "COB",
//   "Facturación": "FAC", "CAC Conkal": "CKL", "CAC Poniente": "PTE",
//   "CAC Centro": "CNO", "CAC Progreso": "PPO", "CAC Sur": "SUR",
//   "CAC Norte": "NTE", "CAC Acanceh": "AAH", "CAC Caucel": "CCL",
//   "T.I.": "TI", "CAC Uman": "UMA", "CAC Hunucma": "HUN",
//   "CAC Oriente": "OT", "Otros": "OTROS"
// };
// const AREAS_CFE = Object.keys(ABREVIATURAS).filter(a => a !== "Otros");
// const DIRECCIONES_CFE = { "CAC Centro": "C.59 #488 x 58 y 56, Centro", "CAC Norte": "Calle 42 #123 x 45, Francisco de Montejo", "Notificaciones": "C.59 #488 x 58 y 56, Centro" };
// const MESES_LETRAS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// // ==========================================
// // 1. DATOS EDIFICIO
// // ==========================================
// const DatosEdificio = ({ datos, onChange }) => {
//   const [mostrarOtro, setMostrarOtro] = useState(() => datos.area && !AREAS_CFE.includes(datos.area));

//   useEffect(() => {
//     if (!datos.fecha1) {
//       const hoy = new Date();
//       onChange({ fecha1: hoy.toISOString().split('T')[0], mes: MESES_LETRAS[hoy.getMonth()], tipoInspeccion: "ORDINARIA", quincenaActiva: "quincena1" });
//     }
//   }, []);

//   const handleChange = (e) => {
//     let nuevos = { [e.target.name]: e.target.value };
//     if (e.target.name === "area" && e.target.value !== "Otros") nuevos.direccion = DIRECCIONES_CFE[e.target.value] || "";
//     if (e.target.name === "area") setMostrarOtro(e.target.value === "Otros");
//     onChange(nuevos);
//   };

//   return (
//     <div className="card">
//       <h2 className="card-title">🏢 Datos del Edificio</h2>
//       <div className="form-grid">
//         <div className="form-group full-width" style={{ background: '#E3F2FD', padding: '15px', borderRadius: '10px', border: '2px dashed #2196F3' }}>
//           <label style={{ color: '#1565C0', fontWeight: 'bold' }}>¿Qué recorrido estás realizando?</label>
//           <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
//             <button type="button" onClick={() => onChange({ quincenaActiva: "quincena1" })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.quincenaActiva === "quincena1" ? '#2196F3' : '#fff', color: datos.quincenaActiva === "quincena1" ? 'white' : 'black', fontWeight: 'bold' }}>1ra Quincena</button>
//             <button type="button" onClick={() => onChange({ quincenaActiva: "quincena2" })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.quincenaActiva === "quincena2" ? '#2196F3' : '#fff', color: datos.quincenaActiva === "quincena2" ? 'white' : 'black', fontWeight: 'bold' }}>2da Quincena</button>
//           </div>
//         </div>
//         <div className="form-group full-width">
//           <label>Área de Trabajo:</label>
//           <select name="area" value={datos.area || ''} onChange={handleChange}>
//             <option value="" disabled>Selecciona...</option>
//             {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
//             <option value="Otros">Otros (Especificar)</option>
//           </select>
//         </div>
//         {mostrarOtro && <div className="form-group full-width"><label style={{ color: '#E65100' }}>Especificar:</label><input type="text" name="areaEspecifica" value={datos.areaEspecifica || ''} onChange={handleChange} /></div>}
//         <div className="form-group full-width"><label>Dirección:</label><input type="text" name="direccion" value={datos.direccion || ''} onChange={handleChange} /></div>
//         <div className="form-group"><label>Tipo Inspección:</label><select name="tipoInspeccion" value={datos.tipoInspeccion || ''} onChange={handleChange}><option value="ORDINARIA">ORDINARIA</option><option value="EXTRAORDINARIA">EXTRAORDINARIA</option></select></div>
//         <div className="form-group"><label>Fecha:</label><input type="date" name="fecha1" value={datos.fecha1 || ''} onChange={handleChange} /></div>
//         <div className="form-group"><label>Patrón:</label><input type="text" name="nombrePatron" value={datos.nombrePatron || ''} onChange={handleChange} /></div>
//         <div className="form-group"><label>Colaborador:</label><input type="text" name="nombreColaborador" value={datos.nombreColaborador || ''} onChange={handleChange} /></div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // 2. CHECKLIST EDIFICIO
// // ==========================================
// const itemsEdificio = [ "AVISOS DE SEGURIDAD", "PISOS EN BUEN ESTADO", "VENTANAS EN BUEN ESTADO", "PUERTAS DE ACCESO", "TECHOS SIN FILTRACIONES", "PLAFONES SIN MANCHAS", "ILUMINACIÓN", "ESCALERAS", "PASAMANOS", "PASILLOS SIN OBSTÁCULOS", "INTERRUPTOR GENERAL", "APAGADORES", "CONTACTOS (no saturados)", "SANITARIOS LIMPIOS", "SURTIDOR DE AGUA", "VENTILACION (A/A)", "ORDEN Y LIMPIEZA (5'S)", "SILLAS EN BUEN ESTADO", "ESCRITORIOS ORDENADOS", "ARCHIVEROS FUNCIONALES", "RUTAS DE EVACUACIÓN", "SISTEMA DE EMERGENCIA", "PLAGA DE ANIMALES", "OTROS" ];
// const SECCIONES = [ { titulo: "Estructura y Accesos", rango: [0, 8] }, { titulo: "Instalaciones y Servicios", rango: [8, 16] }, { titulo: "Orden y Emergencia", rango: [16, 24] } ];

// const ChecklistEdificio = ({ onChange, datosPrevios, quincenaActiva }) => {
//   const [respuestas, setRespuestas] = useState(datosPrevios || {});
//   const [seccionActiva, setSeccionActiva] = useState(0);
  
//   useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);

//   const marcar = (item, val) => { const n = { ...respuestas, [item]: { ...respuestas[item], estado: val } }; setRespuestas(n); onChange(n); };
//   const manejarObs = (item, txt) => { const n = { ...respuestas, [item]: { ...respuestas[item], obs: txt } }; setRespuestas(n); onChange(n); };

//   const currentSec = SECCIONES[seccionActiva];
//   const itemsAct = itemsEdificio.slice(currentSec.rango[0], currentSec.rango[1]);
//   const contestados = itemsEdificio.filter(i => respuestas[i]?.estado).length;

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2 style={{ textAlign: 'center', color: '#1a365d' }}>Inspección de Edificio</h2>
//       <div style={{ textAlign: 'center', marginBottom: '15px', fontWeight: 'bold', color: '#FF9800' }}> Evaluando: {quincenaActiva === "quincena1" ? "1ra Quincena" : "2da Quincena"} </div>
//       <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
//         {SECCIONES.map((s, i) => <button key={i} onClick={() => setSeccionActiva(i)} style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none', background: seccionActiva === i ? '#2196F3' : '#e0e0e0', color: seccionActiva === i ? 'white' : 'black' }}> Paso {i+1} </button>)}
//       </div>
//       <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
//         <h3 style={{ borderBottom: '2px solid #2196F3', paddingBottom: '5px' }}>{currentSec.titulo}</h3>
//         {itemsAct.map(item => (
//           <div key={item} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
//               <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item}</span>
//               <div style={{ display: 'flex', gap: '5px' }}>
//                 {["SI", "NO", "MPC"].map(opt => ( <button key={opt} onClick={() => marcar(item, opt)} style={{ padding: '6px 10px', borderRadius: '5px', border: '1px solid #ccc', background: respuestas[item]?.estado === opt ? (opt === 'SI' ? '#4CAF50' : opt === 'NO' ? '#F44336' : '#FF9800') : '#f5f5f5', color: respuestas[item]?.estado === opt ? 'white' : 'black', fontSize: '0.75rem', fontWeight: 'bold' }}> {opt} </button> ))}
//               </div>
//             </div>
//             {(respuestas[item]?.estado === "NO" || respuestas[item]?.estado === "MPC") && ( <input type="text" placeholder="Falla..." value={respuestas[item]?.obs || ""} onChange={(e) => manejarObs(item, e.target.value)} style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px' }} /> )}
//           </div>
//         ))}
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//         <button onClick={() => setSeccionActiva(seccionActiva - 1)} disabled={seccionActiva === 0} className="btn btn-secondary">← Anterior</button>
//         {seccionActiva < 2 ? ( <button onClick={() => setSeccionActiva(seccionActiva + 1)} className="btn btn-primary">Siguiente →</button> ) : ( <span style={{ color: contestados === 24 ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>{contestados === 24 ? '✓ Completo' : '⚠️ Faltan respuestas'}</span> )}
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // 3. FIRMA
// // ==========================================
// const Firma = ({ onFirmaCompletada, showNotification }) => {
//   const firmaRef = useRef(null);
//   const [firmaData, setFirmaData] = useState(null);
//   const guardarFirma = () => {
//     if (!firmaRef.current || firmaRef.current.isEmpty()) { showNotification('Firma requerida', 'warning'); return; }
//     const fb64 = firmaRef.current.getCanvas().toDataURL('image/png'); setFirmaData(fb64); onFirmaCompletada(fb64); showNotification('✅ Firma guardada', 'success');
//   };
//   return (
//     <div className="card">
//       <h2 className="card-title">✍️ Firma</h2>
//       <div className="signature-pad"><SignatureCanvas ref={firmaRef} canvasProps={{ className: 'signature-canvas' }} penColor="black" backgroundColor="white" /></div>
//       <div className="flex gap-4"><button onClick={() => { firmaRef.current.clear(); setFirmaData(null); }} className="btn btn-secondary flex-1">🧹 Borrar</button><button onClick={guardarFirma} className="btn btn-primary flex-1">💾 Guardar</button></div>
//     </div>
//   );
// };

// // ==========================================
// // 4. REPORTE Y PDF EDIFICIOS
// // ==========================================
// const ReporteEdificio = ({ datosForm, checklistGlobal, firma, showNotification, logosPdf }) => {
//   const [enviando, setEnviando] = useState(false);

//   const generarPDFEdificio = async () => {
//     try {
//       setEnviando(true);
//       const areaAbbr = ABREVIATURAS[datosForm.area] || "OTROS";
//       const now = new Date(); const ts = `${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
//       const ID_GENERADO = `Edificio_${areaAbbr}_SW000${ts}`;

//       const doc = new jsPDF('p', 'mm', 'a4'); const pw = doc.internal.pageSize.getWidth(); const margin = 10; let yPos = 10; const hFila = 6.5;
      
//       if (logosPdf.suterm) doc.addImage(logosPdf.suterm, 'PNG', margin, yPos, 15, 15);
//       if (logosPdf.cfe) doc.addImage(logosPdf.cfe, 'PNG', pw - margin - 28, yPos + 2, 28, 10);
      
//       doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.text("COMISION FEDERAL DE ELECTRICIDAD", pw / 2, yPos + 6, { align: 'center' });
//       doc.setFontSize(10); doc.text("GUÍA DE INSPECCIÓN: EDIFICIO", pw / 2, yPos + 16, { align: 'center' });
      
//       yPos += 22; doc.setFontSize(9); doc.text(`ÁREA:`, margin, yPos); doc.setFont('helvetica', 'normal'); doc.text(datosForm.area || '', margin + 15, yPos);
//       doc.setFont('helvetica', 'bold'); doc.text(`DIRECCIÓN:`, margin + 95, yPos); doc.setFont('helvetica', 'normal'); doc.text(datosForm.direccion || '', margin + 118, yPos);
      
//       yPos += 8; const wNo = 6; const wIdent = 45; const wCheck = 5; const wObs = 20; 
//       doc.setFillColor(220, 220, 220); doc.rect(margin, yPos, pw - (margin*2), hFila * 1.5, 'FD');
//       doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.text("No.", margin + 1, yPos + 6); doc.text("IDENTIFICACIÓN", margin + wNo + 2, yPos + 6);
      
//       let x1 = margin + wNo + wIdent; doc.text("SI", x1 + 1, yPos + 6); doc.text("NO", x1 + wCheck + 1, yPos + 6); doc.text("MPC", x1 + (wCheck*2) + 0.5, yPos + 7); doc.text("OBS 1", x1 + (wCheck*3) + 2, yPos + 6);
//       let x2 = x1 + (wCheck*3) + wObs; doc.text("SI", x2 + 1, yPos + 6); doc.text("NO", x2 + wCheck + 1, yPos + 6); doc.text("MPC", x2 + (wCheck*2) + 0.5, yPos + 7); doc.text("OBS 2", x2 + (wCheck*3) + 2, yPos + 6);
      
//       yPos += hFila * 1.5; doc.setFont('helvetica', 'normal');
//       itemsEdificio.forEach((item, index) => {
//         const fy = yPos + (index * hFila);
//         const r1 = checklistGlobal.quincena1?.[item] || {}; const r2 = checklistGlobal.quincena2?.[item] || {};
        
//         doc.rect(margin, fy, wNo, hFila); doc.rect(margin+wNo, fy, wIdent, hFila);
//         doc.rect(x1, fy, wCheck, hFila); doc.rect(x1+wCheck, fy, wCheck, hFila); doc.rect(x1+(wCheck*2), fy, wCheck, hFila); doc.rect(x1+(wCheck*3), fy, wObs, hFila);
//         doc.rect(x2, fy, wCheck, hFila); doc.rect(x2+wCheck, fy, wCheck, hFila); doc.rect(x2+(wCheck*2), fy, wCheck, hFila); doc.rect(x2+(wCheck*3), fy, wObs, hFila);
        
//         doc.text(`${index + 1}.-`, margin + 1, fy + 4.5); doc.text(item, margin + wNo + 1, fy + 4.5);
        
//         doc.setFont('helvetica', 'bold');
//         if(r1.estado === "SI") doc.text("X", x1+1.5, fy+4.5); if(r1.estado === "NO") doc.text("X", x1+wCheck+1.5, fy+4.5); if(r1.estado === "MPC") doc.text("X", x1+(wCheck*2)+1.5, fy+4.5);
//         if(r2.estado === "SI") doc.text("X", x2+1.5, fy+4.5); if(r2.estado === "NO") doc.text("X", x2+wCheck+1.5, fy+4.5); if(r2.estado === "MPC") doc.text("X", x2+(wCheck*2)+1.5, fy+4.5);
//         doc.setFont('helvetica', 'normal');
//         if(r1.obs) doc.text(r1.obs.substring(0, 16), x1+(wCheck*3)+1, fy+4.5);
//         if(r2.obs) doc.text(r2.obs.substring(0, 16), x2+(wCheck*3)+1, fy+4.5);
//       });
      
//       yPos = yPos + (24 * hFila) + 5; const xR = pw / 2 + 10;
//       doc.setFont('helvetica', 'bold'); doc.text("MARCAR CON X EL MES", xR + 20, yPos); yPos += 2;
//       MESES_LETRAS.forEach((m, i) => { doc.rect(xR + (i * 6), yPos, 6, hFila); doc.text(m, xR + (i * 6) + 2, yPos + 4); if (datosForm.mes === m) doc.text("X", xR + (i * 6) + 1.5, yPos + 4.5); });
      
//       yPos += hFila + 2; doc.text(`TIPO: ORDINARIA (${datosForm.tipoInspeccion === "ORDINARIA" ? "X" : " "})  EXTRA (${datosForm.tipoInspeccion === "EXTRAORDINARIA" ? "X" : " "})`, xR, yPos + 3);
//       yPos += 15; if (firma) doc.addImage(firma, 'PNG', xR + 10, yPos, 40, 15);
//       doc.line(xR, yPos + 18, pw - margin, yPos + 18); doc.text("FIRMA COLABORADOR", xR + 15, yPos + 22);
      
//       doc.save(`${ID_GENERADO}.pdf`);
//       showNotification('✅ PDF de Edificio generado', 'success');
//     } catch (e) { showNotification('❌ Error al generar', 'error'); } finally { setEnviando(false); }
//   };

//   return (
//     <div className="card text-center">
//       <h2>🎉 Inspección Lista</h2>
//       <button onClick={generarPDFEdificio} disabled={enviando} className="btn btn-success btn-large">{enviando ? '⏳ Generando...' : '📄 Descargar Documento'}</button>
//     </div>
//   );
// };

// // ==========================================
// // COMPONENTE PRINCIPAL (MEGA-ARCHIVO EDIFICIOS)
// // ==========================================
// export default function EdificiosApp({ onVolver }) {
//   const [paso, setPaso] = useState(1);
//   const [datosForm, setDatosForm] = useState({ quincenaActiva: "quincena1" });
//   const [checklistGlobal, setChecklistGlobal] = useState({ quincena1: {}, quincena2: {} });
//   const [firma, setFirma] = useState(null);
//   const [notification, setNotification] = useState(null);
//   const [confirmarSalir, setConfirmarSalir] = useState(false);
//   const [logosPdf, setLogosPdf] = useState({ suterm: null, cfe: null });

//   useEffect(() => {
//     const loadLogos = async () => {
//       const toB64 = async (u) => { const r = await fetch(u); const b = await r.blob(); return new Promise(res => { const rd = new FileReader(); rd.onloadend = () => res(rd.result); rd.readAsDataURL(b); }); };
//       try { setLogosPdf({ suterm: await toB64(logoSutermImg), cfe: await toB64(logoCfeImg) }); } catch (e) {}
//     }; loadLogos();
//   }, []);

//   const showNotification = (msg, type = 'error') => { setNotification({ message: msg, type }); setTimeout(() => setNotification(null), 4000); };

//   const siguientePaso = () => {
//     if (paso === 1) { if (!datosForm.area || !datosForm.fecha1 || !datosForm.nombrePatron) { showNotification('Faltan campos obligatorios', 'warning'); return; } setPaso(2); return; }
//     if (paso === 2) { const cont = Object.keys(checklistGlobal[datosForm.quincenaActiva] || {}).length; if (cont < 24) { showNotification('Llena los 24 puntos de esta quincena', 'warning'); return; } setPaso(3); return; }
//     if (paso === 3) { if (!firma) { showNotification('Guarda tu firma', 'warning'); return; } setPaso(4); return; }
//   };

//   return (
//     <div className="app">
//       {notification && <div className={`notificacion-centro notif-${notification.type}`}>{notification.message}</div>}
//       <header style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px 0', marginBottom: '25px' }}>
//         <button onClick={() => setConfirmarSalir(true)} style={{ background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}> 🏠 </button>
//         <div style={{ textAlign: 'center', flex: 1 }}>
//           <h1 style={{ color: '#1a365d', fontSize: '1.6rem', margin: 0 }}>SeguridApp</h1>
//           <p className="subtitulo" style={{ margin: 0 }}>Módulo Edificios</p>
//         </div>
//       </header>

//       <div className="progreso-container" style={{ marginBottom: '20px' }}>
//         <div className="progreso">
//           {[1,2,3,4].map(i => <div key={i} className={`paso ${paso >= i ? 'activo' : ''}`}>{i}. {i===1?'Datos':i===2?'Lista':i===3?'Firma':'Fin'}</div>)}
//         </div>
//       </div>
      
//       <main className="contenido">
//         {paso === 1 && <DatosEdificio datos={datosForm} onChange={(n) => setDatosForm(p => ({...p, ...n}))} />}
//         {paso === 2 && <ChecklistEdificio quincenaActiva={datosForm.quincenaActiva} datosPrevios={checklistGlobal[datosForm.quincenaActiva]} onChange={(n) => setChecklistGlobal(p => ({ ...p, [datosForm.quincenaActiva]: n }))} />}
//         {paso === 3 && <Firma onFirmaCompletada={setFirma} showNotification={showNotification} />}
//         {paso === 4 && <ReporteEdificio datosForm={datosForm} checklistGlobal={checklistGlobal} firma={firma} showNotification={showNotification} logosPdf={logosPdf} />}

//         <div className="navegacion" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//           {paso > 1 && paso < 4 && <button onClick={() => setPaso(p => p - 1)} className="btn btn-secondary">← Regresar</button>}
//           {paso < 4 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
//         </div>
//       </main>

//       {confirmarSalir && (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
//           <div style={{ background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
//             <h3 style={{ color: '#d32f2f' }}>⚠️ ¿Salir al menú?</h3>
//             <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
//               <button onClick={() => setConfirmarSalir(false)} className="btn btn-secondary">Cancelar</button>
//               <button onClick={onVolver} className="btn btn-primary" style={{ background: '#d32f2f' }}>Sí, salir</button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Estilos globales heredados */}
//       <style>{`
//         body { background-color: #f0f4f8 !important; color: #333 !important; font-family: sans-serif; margin: 0; padding: 0; }
//         .app { padding: 15px; max-width: 800px; margin: 0 auto; min-height: 100vh; }
//         .progreso { display: flex; gap: 6px; background: #e2e8f0; padding: 6px; border-radius: 40px; }
//         .paso { flex: 1; padding: 8px 4px; text-align: center; border-radius: 30px; font-size: 0.8rem; font-weight: 600; background: white; color: #2d3748; }
//         .paso.activo { background: #2196F3; color: white; }
//         .contenido { background: white; padding: 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
//         .card { padding: 10px 0; } .card-title { font-size: 1.4rem; color: #1a365d; border-left: 5px solid #2196F3; padding-left: 15px; margin-bottom: 15px; }
//         .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; } .form-group { display: flex; flex-direction: column; } .full-width { grid-column: 1 / -1; }
//         input, select { padding: 10px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 1rem; }
//         .btn { padding: 12px 20px; border: none; border-radius: 40px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
//         .btn-primary { background: #2196F3; color: white; } .btn-secondary { background: #e2e8f0; color: #2d3748; } .btn-success { background: #4CAF50; color: white; }
//         .notificacion-centro { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; color: white; padding: 20px 40px; border-radius: 12px; font-weight: bold; font-size: 1.2rem; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.4); width: 80%; max-width: 400px; }
//         .notif-error { background-color: #f44336; } .notif-warning { background-color: #ff9800; } .notif-success { background-color: #4CAF50; }
//         .signature-pad { border: 2px dashed #2196F3; border-radius: 12px; background: #f8fafc; margin-bottom: 15px; width: 100%; height: 200px; position: relative; } .signature-canvas { width: 100% !important; height: 100% !important; position: absolute; }
//         @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
//       `}</style>
//     </div>
//   );
// }



import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument } from 'pdf-lib';
import { jsPDF } from 'jspdf';

const ABREVIATURAS = {
  "Recursos Humanos": "RH", "Notificaciones": "NA", "Cobranza": "COB",
  "Facturación": "FAC", "CAC Conkal": "CKL", "CAC Poniente": "PTE",
  "CAC Centro": "CNO", "CAC Progreso": "PPO", "CAC Sur": "SUR",
  "CAC Norte": "NTE", "CAC Acanceh": "AAH", "CAC Caucel": "CCL",
  "T.I.": "TI", "CAC Uman": "UMA", "CAC Hunucma": "HUN",
  "CAC Oriente": "OT", "Otros": "OTROS"
};
const AREAS_CFE = Object.keys(ABREVIATURAS).filter(a => a !== "Otros");
const DIRECCIONES_CFE = { "CAC Centro": "C.59 #488 x 58 y 56, Centro", "CAC Norte": "Calle 42 #123 x 45, Francisco de Montejo", "Notificaciones": "C.59 #488 x 58 y 56, Centro", "Cobranza": "C.59 #488 x 58 y 56, Centro" };
const MESES_COMPLETOS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MESES_LETRAS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// ==========================================
// 1. DATOS EDIFICIO
// ==========================================
const DatosEdificio = ({ datos, onChange, onCargarDatos, showNotification }) => {
  const [mostrarOtro, setMostrarOtro] = useState(() => datos.area && !AREAS_CFE.includes(datos.area));
  const [cargandoPDF, setCargandoPDF] = useState(false);

  useEffect(() => {
    if (!datos.fecha1 || !datos.fecha2) {
      const hoy = new Date().toISOString().split('T')[0];
      const nombreMes = MESES_COMPLETOS[new Date().getMonth()];
      onChange({ fecha1: hoy, fecha2: hoy, mes: nombreMes, tipoInspeccion: "ORDINARIA", quincenaActiva: "quincena1" });
    }
  }, []);

  const handleChange = (e) => {
    let nuevos = { [e.target.name]: e.target.value };
    if (e.target.name === "area" && e.target.value !== "Otros") nuevos.direccion = DIRECCIONES_CFE[e.target.value] || "";
    if (e.target.name === "area") setMostrarOtro(e.target.value === "Otros");
    onChange(nuevos);
  };

  const handleSubirPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCargandoPDF(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      let metadatosOcultos = pdfDoc.getKeywords();
      if (metadatosOcultos) {
        metadatosOcultos = metadatosOcultos.trim();
        const datosExtraidos = JSON.parse(decodeURIComponent(metadatosOcultos));
        onCargarDatos(datosExtraidos);
        showNotification('✅ Reporte de edificio cargado', 'success');
      } else { showNotification('⚠️ Este PDF no contiene datos compatibles', 'warning'); }
    } catch (error) { showNotification('❌ Error al leer el PDF', 'error'); }
    setCargandoPDF(false); e.target.value = null;
  };

  return (
    <div className="card">
      <div style={{ background: '#E3F2FD', padding: '20px', borderRadius: '12px', marginBottom: '30px', textAlign: 'center', border: '2px dashed #2196F3' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1565C0', fontSize: '1.2rem' }}>📂 ¿Continuar inspección de la 1ra Quincena?</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '15px' }}>Sube tu PDF anterior para cargar los datos del edificio y llenar la 2da Quincena.</p>
        <label style={{ background: '#2196F3', color: 'white', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block' }}>
          {cargandoPDF ? 'Leyendo documento...' : '📄 Subir PDF Anterior'}
          <input type="file" accept="application/pdf" onChange={handleSubirPDF} style={{ display: 'none' }} disabled={cargandoPDF} />
        </label>
      </div>

      <h2 className="card-title">🏢 Datos del Edificio</h2>
      <div className="form-grid">
        <div className="form-group full-width" style={{ background: '#E3F2FD', padding: '15px', borderRadius: '10px', border: '2px dashed #2196F3' }}>
          <label style={{ color: '#1565C0', fontWeight: 'bold' }}>¿Qué recorrido estás realizando?</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <button type="button" onClick={() => onChange({ quincenaActiva: "quincena1" })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.quincenaActiva === "quincena1" ? '#2196F3' : '#fff', color: datos.quincenaActiva === "quincena1" ? 'white' : 'black', fontWeight: 'bold' }}>1ra Quincena</button>
            <button type="button" onClick={() => onChange({ quincenaActiva: "quincena2" })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: datos.quincenaActiva === "quincena2" ? '#2196F3' : '#fff', color: datos.quincenaActiva === "quincena2" ? 'white' : 'black', fontWeight: 'bold' }}>2da Quincena</button>
          </div>
        </div>
        <div className="form-group full-width">
          <label>Área de Trabajo:</label>
          <select name="area" value={datos.area || ''} onChange={handleChange}>
            <option value="" disabled>Selecciona...</option>
            {AREAS_CFE.map(a => <option key={a} value={a}>{a}</option>)}
            <option value="Otros">Otros (Especificar)</option>
          </select>
        </div>
        {mostrarOtro && <div className="form-group full-width"><label style={{ color: '#E65100' }}>Especificar:</label><input type="text" name="areaEspecifica" value={datos.areaEspecifica || ''} onChange={handleChange} /></div>}
        <div className="form-group full-width"><label>Dirección:</label><input type="text" name="direccion" value={datos.direccion || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Tipo Inspección:</label><select name="tipoInspeccion" value={datos.tipoInspeccion || ''} onChange={handleChange}><option value="ORDINARIA">ORDINARIA</option><option value="EXTRAORDINARIA">EXTRAORDINARIA</option></select></div>
        <div className="form-group"><label>Fecha de tu Recorrido:</label><input type="date" name={datos.quincenaActiva === "quincena1" ? "fecha1" : "fecha2"} value={datos[datos.quincenaActiva === "quincena1" ? "fecha1" : "fecha2"] || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Nombre del Patrón:</label><input type="text" name="nombrePatron" value={datos.nombrePatron || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Nombre del Colaborador:</label><input type="text" name="nombreColaborador" value={datos.nombreColaborador || ''} onChange={handleChange} /></div>
      </div>
    </div>
  );
};

// ==========================================
// 2. CHECKLIST EDIFICIO
// ==========================================
const itemsEdificio = [ "AVISOS DE SEGURIDAD", "PISOS EN BUEN ESTADO", "VENTANAS EN BUEN ESTADO", "PUERTAS DE ACCESO", "TECHOS SIN FILTRACIONES", "PLAFONES SIN MANCHAS", "ILUMINACIÓN", "ESCALERAS", "PASAMANOS", "PASILLOS SIN OBSTÁCULOS", "INTERRUPTOR GENERAL", "APAGADORES", "CONTACTOS (no saturados)", "SANITARIOS LIMPIOS", "SURTIDOR DE AGUA", "VENTILACION (A/A)", "ORDEN Y LIMPIEZA (5'S)", "SILLAS EN BUEN ESTADO", "ESCRITORIOS ORDENADOS", "ARCHIVEROS FUNCIONALES", "RUTAS DE EVACUACIÓN", "SISTEMA DE EMERGENCIA", "PLAGA DE ANIMALES", "OTROS" ];
const SECCIONES = [ { titulo: "Estructura y Accesos", rango: [0, 8] }, { titulo: "Instalaciones y Servicios", rango: [8, 16] }, { titulo: "Orden y Emergencia", rango: [16, 24] } ];

const ChecklistEdificio = ({ onChange, datosPrevios, quincenaActiva }) => {
  const [respuestas, setRespuestas] = useState(datosPrevios || {});
  const [seccionActiva, setSeccionActiva] = useState(0);
  
  useEffect(() => { setRespuestas(datosPrevios || {}); }, [datosPrevios]);

  const marcar = (item, val) => { const n = { ...respuestas, [item]: { ...respuestas[item], estado: val } }; setRespuestas(n); onChange(n); };
  const manejarObs = (item, txt) => { const n = { ...respuestas, [item]: { ...respuestas[item], obs: txt } }; setRespuestas(n); onChange(n); };

  const currentSec = SECCIONES[seccionActiva];
  const itemsAct = itemsEdificio.slice(currentSec.rango[0], currentSec.rango[1]);
  const contestados = itemsEdificio.filter(i => respuestas[i]?.estado).length;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#1a365d' }}>Inspección de Edificio</h2>
      <div style={{ textAlign: 'center', marginBottom: '15px', fontWeight: 'bold', color: '#FF9800' }}> Evaluando: {quincenaActiva === "quincena1" ? "1ra Quincena" : "2da Quincena"} </div>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
        {SECCIONES.map((s, i) => <button key={i} onClick={() => setSeccionActiva(i)} style={{ flex: 1, padding: '10px', borderRadius: '20px', border: 'none', background: seccionActiva === i ? '#2196F3' : '#e0e0e0', color: seccionActiva === i ? 'white' : 'black' }}> Paso {i+1} </button>)}
      </div>
      <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ borderBottom: '2px solid #2196F3', paddingBottom: '5px' }}>{currentSec.titulo}</h3>
        {itemsAct.map(item => (
          <div key={item} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item}</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                {["SI", "NO", "MPC"].map(opt => ( <button key={opt} onClick={() => marcar(item, opt)} style={{ padding: '6px 10px', borderRadius: '5px', border: '1px solid #ccc', background: respuestas[item]?.estado === opt ? (opt === 'SI' ? '#4CAF50' : opt === 'NO' ? '#F44336' : '#FF9800') : '#f5f5f5', color: respuestas[item]?.estado === opt ? 'white' : 'black', fontSize: '0.75rem', fontWeight: 'bold' }}> {opt} </button> ))}
              </div>
            </div>
            {(respuestas[item]?.estado === "NO" || respuestas[item]?.estado === "MPC") && ( <input type="text" placeholder="Falla..." value={respuestas[item]?.obs || ""} onChange={(e) => manejarObs(item, e.target.value)} style={{ width: '100%', padding: '8px', border: '2px solid #FF9800', borderRadius: '6px' }} /> )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={() => setSeccionActiva(seccionActiva - 1)} disabled={seccionActiva === 0} className="btn btn-secondary">← Anterior</button>
        {seccionActiva < 2 ? ( <button onClick={() => setSeccionActiva(seccionActiva + 1)} className="btn btn-primary">Siguiente →</button> ) : ( <span style={{ color: contestados === 24 ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>{contestados === 24 ? '✓ Completo' : '⚠️ Faltan respuestas'}</span> )}
      </div>
    </div>
  );
};

// ==========================================
// 3. CAMARA EDIFICIO
// ==========================================
const CamaraEdificio = ({ onCapture, fotosRequeridas }) => {
  const webcamRef = useRef(null);
  const [capturas, setCapturas] = useState({});
  const [fotoActiva, setFotoActiva] = useState(fotosRequeridas ? fotosRequeridas[0] : '');

  useEffect(() => {
    if (fotosRequeridas && (!fotoActiva || !fotosRequeridas.includes(fotoActiva))) {
      const faltantes = fotosRequeridas.filter(f => !capturas[f]);
      setFotoActiva(faltantes.length > 0 ? faltantes[0] : fotosRequeridas[0]);
    }
  }, [fotosRequeridas]);

  const capture = () => {
    const video = webcamRef.current?.video;
    if (!video) return;
    const vw = video.videoWidth; const vh = video.videoHeight;
    const targetRatio = 16 / 9;
    let cropWidth = vw; let cropHeight = vw / targetRatio;
    if (cropHeight > vh) { cropHeight = vh; cropWidth = vh * targetRatio; }
    const cropX = (vw - cropWidth) / 2; const cropY = (vh - cropHeight) / 2;
    const canvas = document.createElement('canvas');
    canvas.width = cropWidth; canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    
    const imageSrc = canvas.toDataURL('image/jpeg');
    const nuevasCapturas = { ...capturas, [fotoActiva]: imageSrc };
    setCapturas(nuevasCapturas);
    const faltantes = fotosRequeridas.filter(f => !nuevasCapturas[f]);
    if (faltantes.length > 0) setFotoActiva(faltantes[0]);
    onCapture(nuevasCapturas);
  };

  const eliminarFoto = (nombre) => {
    const nuevas = { ...capturas }; delete nuevas[nombre];
    setCapturas(nuevas); setFotoActiva(nombre);
    onCapture(nuevas);
  };

  if (!fotosRequeridas || fotosRequeridas.length === 0) return <div>Cargando cámara...</div>;
  const progreso = Math.round((Object.keys(capturas).length / fotosRequeridas.length) * 100);

  return (
    <div className="card">
      <h2 className="card-title"> 📸 Evidencia de Instalaciones ({progreso}%)</h2>
      <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {fotosRequeridas.map(req => {
          const tomada = !!capturas[req];
          return (
            <button key={req} onClick={() => setFotoActiva(req)} style={{ padding: '8px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', border: 'none', background: fotoActiva === req ? '#2196F3' : (tomada ? '#4CAF50' : '#e0e0e0'), color: fotoActiva === req || tomada ? 'white' : '#333', fontWeight: fotoActiva === req ? 'bold' : 'normal' }}>
              {tomada ? '✅ ' : '📷 '} {req}
            </button>
          )
        })}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="camera-preview" style={{ position: 'relative', background: '#000', borderRadius: '8px', overflow: 'hidden', width: '100%', aspectRatio: '16/9' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 10px', borderRadius: '20px', zIndex: 10 }}>Tomando foto: <strong>{fotoActiva}</strong></div>
            {capturas[fotoActiva] ? ( <img src={capturas[fotoActiva]} alt="Captura" className="w-full h-full rounded-lg" style={{ display: 'block', objectFit: 'cover' }} /> ) : ( <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-full rounded-lg" videoConstraints={{ facingMode: 'environment' }} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} /> )}
          </div>
          <div className="mt-4 flex gap-4">
            {!capturas[fotoActiva] ? ( <button onClick={capture} className="btn btn-primary flex-1">📸 Capturar {fotoActiva}</button> ) : ( <button onClick={() => eliminarFoto(fotoActiva)} className="btn btn-secondary flex-1">🔄 Retomar Foto</button> )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. FIRMA
// ==========================================
const Firma = ({ onFirmaCompletada, showNotification }) => {
  const firmaRef = useRef(null);
  const [firmaData, setFirmaData] = useState(null);
  const guardarFirma = () => {
    if (!firmaRef.current || firmaRef.current.isEmpty()) { showNotification('Firma requerida', 'warning'); return; }
    const fb64 = firmaRef.current.getCanvas().toDataURL('image/png'); setFirmaData(fb64); onFirmaCompletada(fb64); showNotification('✅ Firma guardada', 'success');
  };
  return (
    <div className="card">
      <h2 className="card-title">✍️ Firma</h2>
      <div className="signature-pad"><SignatureCanvas ref={firmaRef} canvasProps={{ className: 'signature-canvas' }} penColor="black" backgroundColor="white" /></div>
      <div className="flex gap-4"><button onClick={() => { firmaRef.current.clear(); setFirmaData(null); }} className="btn btn-secondary flex-1">🧹 Borrar</button><button onClick={guardarFirma} className="btn btn-primary flex-1">💾 Guardar</button></div>
    </div>
  );
};

// ==========================================
// 5. REPORTE Y PDF EDIFICIOS (CORREGIDO Y SIN LOGOS QUE CRASHEN)
// ==========================================
const ReporteEdificio = ({ datosForm, checklistGlobal, historicoFotos, firma, showNotification }) => {
  const [enviando, setEnviando] = useState(false);

  const generarPDFEdificio = async () => {
    try {
      setEnviando(true);
      const areaAbbr = ABREVIATURAS[datosForm.area] || "OTROS";
      const now = new Date(); const ts = `${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
      const ID_GENERADO = `Edificio_${areaAbbr}_SW000${ts}`;

      // Formato Horizontal
      const doc = new jsPDF('l', 'mm', 'a4'); 
      const pageWidth = 297; 
      const margin = 10; 
      
      // ENCABEZADOS DE TEXTO (Sin imágenes para evitar crashes de wrong PNG signature)
      doc.setFontSize(10); doc.setFont('helvetica', 'bold'); 
      doc.text("CFE DIVISIÓN DE DISTRIBUCIÓN PENINSULAR", margin + 10, 12);
      doc.text("GUÍA DE INSPECCIÓN: EDIFICIO", pageWidth - margin - 10, 12, { align: 'right' });
      doc.setLineWidth(0.6); doc.line(margin, 16, pageWidth - margin, 16); 

      // ÁREA Y DIRECCIÓN
      doc.setFontSize(9);
      doc.text(`ÁREA DE TRABAJO:`, margin + 15, 23); 
      doc.setFont('helvetica', 'normal'); doc.text(datosForm.area === "Otros" ? (datosForm.areaEspecifica || '') : (datosForm.area || ''), margin + 50, 23);
      doc.setLineWidth(0.3); doc.line(margin + 48, 24, margin + 120, 24);
      
      doc.setFont('helvetica', 'bold'); doc.text(`DIRECCIÓN:`, margin + 125, 23);
      doc.setFont('helvetica', 'normal'); doc.text(datosForm.direccion || '', margin + 148, 23);
      doc.line(margin + 146, 24, pageWidth - margin - 15, 24);

      // ========================================================
      // MATEMÁTICAS DE LA CUADRÍCULA (Tabla más ancha ~80%)
      // ========================================================
      let yPos = 29;
      const hFila = 5.3; 
      
      // Anchos de columnas ajustados
      const wNo = 8;
      const wIdent = 72; // Mucho más ancho para el texto
      const wChk = 7;
      const wObs = 47; // Más espacio para escribir
      const wTotalTabla = wNo + wIdent + ((wChk*3) + wObs) * 2; // = 216 mm
      
      // ================== ENCABEZADOS GRISES CON TEXTO NEGRO ==================
      doc.setFillColor(220, 220, 220); // Gris 
      doc.rect(margin, yPos, wTotalTabla, hFila * 1.5, 'FD'); // Fill & Draw
      
      doc.setTextColor(0, 0, 0); // Texto negro original
      doc.setFontSize(7); doc.setFont('helvetica', 'bold'); 
      
      doc.text("No.", margin + 1.5, yPos + 4.5);
      doc.rect(margin + wNo, yPos, wIdent, hFila * 1.5); doc.text("IDENTIFICACIÓN", margin + wNo + 22, yPos + 3.5); doc.text("EDIFICIO", margin + wNo + 26, yPos + 6.5);
      
      let x = margin + wNo + wIdent;
      doc.rect(x, yPos, wChk, hFila * 1.5); doc.text("SI", x + 2, yPos + 5);
      doc.rect(x + wChk, yPos, wChk, hFila * 1.5); doc.text("NO", x + wChk + 1.5, yPos + 5);
      doc.rect(x + (wChk*2), yPos, wChk, hFila * 1.5); doc.setFontSize(4.5); doc.text("REQ.", x + (wChk*2) + 0.5, yPos + 3); doc.text("MPC", x + (wChk*2) + 0.5, yPos + 6); doc.setFontSize(7);
      doc.rect(x + (wChk*3), yPos, wObs, hFila * 1.5); doc.text("OBSERVACIONES", x + (wChk*3) + 10, yPos + 5);
      
      x = x + (wChk*3) + wObs;
      doc.rect(x, yPos, wChk, hFila * 1.5); doc.text("SI", x + 2, yPos + 5);
      doc.rect(x + wChk, yPos, wChk, hFila * 1.5); doc.text("NO", x + wChk + 1.5, yPos + 5);
      doc.rect(x + (wChk*2), yPos, wChk, hFila * 1.5); doc.setFontSize(4.5); doc.text("REQ.", x + (wChk*2) + 0.5, yPos + 3); doc.text("MPC", x + (wChk*2) + 0.5, yPos + 6); doc.setFontSize(7);
      doc.rect(x + (wChk*3), yPos, wObs, hFila * 1.5); doc.text("OBSERVACIONES", x + (wChk*3) + 10, yPos + 5);
      
      // Dibujar los 24 Items
      let yItem = yPos + (hFila * 1.5);
      doc.setFont('helvetica', 'normal');
      
      itemsEdificio.forEach((item, i) => {
        const r1 = checklistGlobal.quincena1?.[item] || {}; 
        const r2 = checklistGlobal.quincena2?.[item] || {};
        
        doc.rect(margin, yItem, wNo, hFila); doc.text(`${i + 1}.-`, margin + 1.5, yItem + 3.5);
        doc.rect(margin + wNo, yItem, wIdent, hFila); doc.setFontSize(6); doc.text(item, margin + wNo + 1, yItem + 3.5); doc.setFontSize(7);
        
        let cx = margin + wNo + wIdent;
        doc.rect(cx, yItem, wChk, hFila); doc.rect(cx + wChk, yItem, wChk, hFila); doc.rect(cx + (wChk*2), yItem, wChk, hFila); doc.rect(cx + (wChk*3), yItem, wObs, hFila);
        
        doc.setFont('helvetica', 'bold');
        if(r1.estado === "SI") doc.text("X", cx + 2.5, yItem + 3.5); if(r1.estado === "NO") doc.text("X", cx + wChk + 2.5, yItem + 3.5); if(r1.estado === "MPC") doc.text("X", cx + (wChk*2) + 2.5, yItem + 3.5);
        doc.setFont('helvetica', 'normal'); if(r1.obs) doc.text(r1.obs.substring(0, 42), cx + (wChk*3) + 1, yItem + 3.5);
        
        cx = cx + (wChk*3) + wObs;
        doc.rect(cx, yItem, wChk, hFila); doc.rect(cx + wChk, yItem, wChk, hFila); doc.rect(cx + (wChk*2), yItem, wChk, hFila); doc.rect(cx + (wChk*3), yItem, wObs, hFila);
        
        doc.setFont('helvetica', 'bold');
        if(r2.estado === "SI") doc.text("X", cx + 2.5, yItem + 3.5); if(r2.estado === "NO") doc.text("X", cx + wChk + 2.5, yItem + 3.5); if(r2.estado === "MPC") doc.text("X", cx + (wChk*2) + 2.5, yItem + 3.5);
        doc.setFont('helvetica', 'normal'); if(r2.obs) doc.text(r2.obs.substring(0, 42), cx + (wChk*3) + 1, yItem + 3.5);

        yItem += hFila;
      });

      doc.rect(margin, yItem, wNo + wIdent, hFila); doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.text("OBSERVACIONES", margin + 1.5, yItem + 3.5);
      doc.rect(margin + wNo + wIdent, yItem, ((wChk*3)+wObs)*2, hFila);

      // ========================================================
      // PANEL DERECHO (Angosto)
      // ========================================================
      const xDer = margin + wTotalTabla; // = 226
      const wDer = pageWidth - margin - xDer; // = 61 mm
      let yDer = yPos;

      // Meses (CORRECCIÓN A ÍNDICE EXACTO Y GRIS SÓLIDO)
      doc.rect(xDer, yDer, wDer, hFila); doc.setFontSize(7); doc.text("MARCAR EL MES", xDer + 16, yDer + 3.5);
      yDer += hFila;
      const wMesBox = wDer / 12; // = 5.08 mm
      const indexMesSeleccionado = MESES_COMPLETOS.indexOf(datosForm.mes);

      MESES_LETRAS.forEach((m, i) => {
         if (i === indexMesSeleccionado) {
           doc.setFillColor(180, 180, 180); // Relleno Gris
           doc.rect(xDer + (i*wMesBox), yDer, wMesBox, hFila, 'FD'); // Fill & Draw
         } else {
           doc.rect(xDer + (i*wMesBox), yDer, wMesBox, hFila);
         }
         doc.setFont('helvetica', 'bold'); doc.setTextColor(0, 0, 0); 
         doc.text(m, xDer + (i*wMesBox) + 1.5, yDer + 3.5);
      });

      // Tipo Inspección
      yDer += hFila;
      doc.rect(xDer, yDer, wDer, hFila); doc.text("TIPO DE INSPECCIÓN", xDer + 15, yDer + 3.5);
      yDer += hFila;
      doc.rect(xDer, yDer, wDer/2, hFila); doc.setFont('helvetica', 'normal'); doc.setFontSize(5); doc.text("ORDINARIA", xDer + 2, yDer + 3.5); if (datosForm.tipoInspeccion === "ORDINARIA") doc.text("X", xDer + 25, yDer + 3.5);
      doc.rect(xDer + (wDer/2), yDer, wDer/2, hFila); doc.text("EXTRAORDINARIA", xDer + (wDer/2) + 2, yDer + 3.5); if (datosForm.tipoInspeccion === "EXTRAORDINARIA") doc.text("X", xDer + (wDer/2) + 25, yDer + 3.5);

      // Fechas
      yDer += hFila;
      const wFechaTexto = 28; const wAnio = 11; const wMes = 11; const wDia = 11;
      
      doc.rect(xDer, yDer, wFechaTexto, hFila); doc.setFont('helvetica', 'bold'); doc.text("FECHA 1er. RECORRIDO", xDer + 1, yDer + 3.5);
      doc.rect(xDer + wFechaTexto, yDer, wAnio, hFila); doc.text("AÑO", xDer + wFechaTexto + 2, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio, yDer, wMes, hFila); doc.text("MES", xDer + wFechaTexto + wAnio + 2, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio + wMes, yDer, wDia, hFila); doc.text("DIA", xDer + wFechaTexto + wAnio + wMes + 3, yDer + 3.5);
      yDer += hFila;
      
      let a1="", m1="", d1=""; if(datosForm.fecha1){ const p = datosForm.fecha1.split('-'); a1=p[0].slice(-2); m1=p[1]; d1=p[2]; }
      doc.rect(xDer, yDer, wFechaTexto, hFila); 
      doc.rect(xDer + wFechaTexto, yDer, wAnio, hFila); doc.setFont('helvetica','normal'); doc.text(a1, xDer + wFechaTexto + 3, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio, yDer, wMes, hFila); doc.text(m1, xDer + wFechaTexto + wAnio + 3, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio + wMes, yDer, wDia, hFila); doc.text(d1, xDer + wFechaTexto + wAnio + wMes + 3, yDer + 3.5);
      yDer += hFila;
      
      doc.rect(xDer, yDer, wFechaTexto, hFila); doc.setFont('helvetica', 'bold'); doc.text("FECHA 2do. RECORRIDO", xDer + 1, yDer + 3.5);
      doc.rect(xDer + wFechaTexto, yDer, wAnio, hFila); doc.text("AÑO", xDer + wFechaTexto + 2, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio, yDer, wMes, hFila); doc.text("MES", xDer + wFechaTexto + wAnio + 2, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio + wMes, yDer, wDia, hFila); doc.text("DIA", xDer + wFechaTexto + wAnio + wMes + 3, yDer + 3.5);
      yDer += hFila;
      
      let a2="", m2="", d2=""; if(datosForm.fecha2){ const p = datosForm.fecha2.split('-'); a2=p[0].slice(-2); m2=p[1]; d2=p[2]; }
      doc.rect(xDer, yDer, wFechaTexto, hFila); 
      doc.rect(xDer + wFechaTexto, yDer, wAnio, hFila); doc.setFont('helvetica','normal'); doc.text(a2, xDer + wFechaTexto + 3, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio, yDer, wMes, hFila); doc.text(m2, xDer + wFechaTexto + wAnio + 3, yDer + 3.5);
      doc.rect(xDer + wFechaTexto + wAnio + wMes, yDer, wDia, hFila); doc.text(d2, xDer + wFechaTexto + wAnio + wMes + 3, yDer + 3.5);

      // Comisión Local
      yDer += hFila;
      doc.rect(xDer, yDer, wDer, hFila * 4); // Caja
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.text("COMISIÓN LOCAL", xDer + 15, yDer + 8); doc.text("DE SEGURIDAD E HIGIENE", xDer + 10, yDer + 13);

      // Revisiones y Firmas
      yDer += (hFila * 4);
      doc.rect(xDer, yDer, wDer, hFila); doc.setFontSize(7); doc.text("PRIMERA REVISIÓN", xDer + 15, yDer + 3.5);
      yDer += hFila;
      doc.rect(xDer, yDer, wDer, hFila * 4.5);
      if (datosForm.quincenaActiva === "quincena1" && firma) doc.addImage(firma, 'PNG', xDer + 10, yDer + 1, 40, 15);
      doc.setFontSize(5); doc.text("NOMBRE Y FIRMA PATRÓN", xDer + 2, yDer + 20); doc.text("NOMBRE FIRMA COLABORADOR", xDer + 30, yDer + 20);
      
      yDer += (hFila * 4.5);
      doc.rect(xDer, yDer, wDer, hFila); doc.setFontSize(7); doc.text("SEGUNDA REVISIÓN", xDer + 15, yDer + 3.5);
      yDer += hFila;
      doc.rect(xDer, yDer, wDer, hFila * 4.5);
      if (datosForm.quincenaActiva === "quincena2" && firma) doc.addImage(firma, 'PNG', xDer + 10, yDer + 1, 40, 15);
      doc.setFontSize(5); doc.text("NOMBRE Y FIRMA PATRÓN", xDer + 2, yDer + 20); doc.text("NOMBRE FIRMA COLABORADOR", xDer + 30, yDer + 20);

      // Comentarios Finales Derecha
      yDer += (hFila * 4.5);
      doc.rect(xDer, yDer, wDer, hFila * 4); doc.setFontSize(6); doc.text("COMENTARIOS:", xDer + 2, yDer + 4);

      // FOOTER
      const yFooter = yItem + 5;
      doc.setLineWidth(0.5); doc.line(margin, yFooter, pageWidth - margin, yFooter);
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      doc.text("SUBGERENCIA DE TRABAJO Y SERVICIOS ADMINISTRATIVOS", pageWidth / 2, yFooter + 4, { align: 'center' });
      doc.text("DEPARTAMENTO DE SEGURIDAD E HIGIENE", pageWidth / 2, yFooter + 8, { align: 'center' });
      doc.setFontSize(6); doc.text("FORMA SH-210", margin, yFooter + 10);
      
      // INCORPORACIÓN DE FOTOS AL PDF (¡AHORA SÍ LLEGARÁ HASTA AQUÍ Y SE VERÁN!)
      ['quincena1', 'quincena2'].forEach((q) => {
        const fotosQuincena = historicoFotos[q];
        if (fotosQuincena && Object.keys(fotosQuincena).length > 0) {
          let currentY = 20;
          const nombresFotos = Object.keys(fotosQuincena);
          nombresFotos.forEach((nombre, index) => {
             if (index % 4 === 0) {
                doc.addPage();
                doc.setFontSize(14); doc.setFont('helvetica','bold'); 
                doc.text(`ANEXO FOTOGRÁFICO - ${q === 'quincena1' ? '1ra QUINCENA' : '2da QUINCENA'}`, margin, 20);
                currentY = 32; 
              }
              const indexEnHoja = index % 4; const columna = indexEnHoja % 2; const fila = Math.floor(indexEnHoja / 2); 
              const xPos = margin + (columna * 140); const yPosF = currentY + (fila * 85);  
              doc.setFontSize(10); doc.text(nombre, xPos, yPosF);
              doc.addImage(fotosQuincena[nombre], 'JPEG', xPos, yPosF + 3, 130, 73);
          });
        }
      });

      // BLINDAJE JSON OCULTO
      const fotosLigeras = JSON.parse(JSON.stringify(historicoFotos));
      const estadoParaGuardar = encodeURIComponent(JSON.stringify({ form: datosForm, checklistGlobal, historicoFotos: fotosLigeras, idActual: ID_GENERADO }));
      doc.setProperties({ title: ID_GENERADO, keywords: estadoParaGuardar });

      doc.save(`${ID_GENERADO}.pdf`);
      showNotification('✅ PDF de Edificio generado', 'success');
    } catch (e) { console.error(e); showNotification('❌ Error al generar', 'error'); } finally { setEnviando(false); }
  };

  return (
    <div className="card text-center">
      <h2>🎉 Inspección Lista</h2>
      <button onClick={generarPDFEdificio} disabled={enviando} className="btn btn-success btn-large">{enviando ? '⏳ Generando...' : '📄 Descargar Documento Oficial'}</button>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function EdificiosApp({ onVolver }) {
  const [paso, setPaso] = useState(1);
  const [datosForm, setDatosForm] = useState({ quincenaActiva: "quincena1" });
  const [checklistGlobal, setChecklistGlobal] = useState({ quincena1: {}, quincena2: {} });
  const [historicoFotos, setHistoricoFotos] = useState({ quincena1: {}, quincena2: {} });
  const [fotosRequeridas, setFotosRequeridas] = useState([]);
  const [firma, setFirma] = useState(null);
  const [notification, setNotification] = useState(null);
  const [confirmarSalir, setConfirmarSalir] = useState(false);

  const showNotification = (msg, type = 'error') => { setNotification({ message: msg, type }); setTimeout(() => setNotification(null), 4000); };

  const calcularFotosRequeridas = () => {
    let req = ["Fachada Principal", "Área General"];
    const currentList = checklistGlobal[datosForm.quincenaActiva] || {};
    Object.keys(currentList).forEach(item => {
      if (currentList[item].estado === "NO" || currentList[item].estado === "MPC") req.push(`Falla: ${item}`);
    });
    setFotosRequeridas(req);
  };

  const siguientePaso = () => {
    if (paso === 1) { if (!datosForm.area || !datosForm.nombrePatron) { showNotification('Faltan campos obligatorios', 'warning'); return; } setPaso(2); return; }
    if (paso === 2) { const cont = Object.keys(checklistGlobal[datosForm.quincenaActiva] || {}).length; if (cont < 24) { showNotification('Llena los 24 puntos de esta quincena', 'warning'); return; } calcularFotosRequeridas(); setPaso(3); return; }
    if (paso === 3) { const tomadas = Object.keys(historicoFotos[datosForm.quincenaActiva] || {}).length; if (tomadas < fotosRequeridas.length) { showNotification(`Faltan fotos (${tomadas}/${fotosRequeridas.length})`, 'warning'); return; } setPaso(4); return; }
    if (paso === 4) { if (!firma) { showNotification('Guarda tu firma', 'warning'); return; } setPaso(5); return; }
  };

  return (
    <div className="app">
      {notification && <div className={`notificacion-centro notif-${notification.type}`}>{notification.message}</div>}
      <header style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px 0', marginBottom: '25px' }}>
        <button onClick={() => setConfirmarSalir(true)} style={{ background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}> 🏠 </button>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1 style={{ color: '#1a365d', fontSize: '1.6rem', margin: 0 }}>SeguridApp</h1>
          <p className="subtitulo" style={{ margin: 0 }}>Módulo Edificios</p>
        </div>
      </header>

      <div className="progreso-container" style={{ marginBottom: '20px' }}>
        <div className="progreso">
          {[1,2,3,4,5].map(i => <div key={i} className={`paso ${paso >= i ? 'activo' : ''}`}>{i}. {i===1?'Datos':i===2?'Lista':i===3?'Foto':i===4?'Firma':'Fin'}</div>)}
        </div>
      </div>
      
      <main className="contenido">
        {paso === 1 && <DatosEdificio datos={datosForm} 
          onChange={(n) => setDatosForm(p => ({...p, ...n}))} 
          showNotification={showNotification}
          onCargarDatos={(extr) => {
            const hoy = new Date().toISOString().split('T')[0];
            setDatosForm(p => ({...p, ...(extr.form || {}), quincenaActiva: "quincena2", fecha2: hoy }));
            setChecklistGlobal(extr.checklistGlobal || { quincena1: {}, quincena2: {} });
            setHistoricoFotos(extr.historicoFotos || { quincena1: {}, quincena2: {} });
          }} 
        />}
        {paso === 2 && <ChecklistEdificio quincenaActiva={datosForm.quincenaActiva} datosPrevios={checklistGlobal[datosForm.quincenaActiva]} onChange={(n) => setChecklistGlobal(p => ({ ...p, [datosForm.quincenaActiva]: n }))} />}
        {paso === 3 && <div className="fade-in"><div className="alerta-foto">📸 Toma 2 fotos generales del edificio y evidencia de las fallas marcadas.</div><CamaraEdificio fotosRequeridas={fotosRequeridas} onCapture={(caps) => setHistoricoFotos(p => ({ ...p, [datosForm.quincenaActiva]: caps }))} /></div>}
        {paso === 4 && <Firma onFirmaCompletada={setFirma} showNotification={showNotification} />}
        {paso === 5 && <ReporteEdificio datosForm={datosForm} checklistGlobal={checklistGlobal} historicoFotos={historicoFotos} firma={firma} showNotification={showNotification} logosPdf={{}} />}

        <div className="navegacion" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {paso > 1 && paso < 5 && <button onClick={() => setPaso(p => p - 1)} className="btn btn-secondary">← Regresar</button>}
          {paso < 5 && <button onClick={siguientePaso} className="btn btn-primary">Siguiente →</button>}
        </div>
      </main>

      {confirmarSalir && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
            <h3 style={{ color: '#d32f2f' }}>⚠️ ¿Salir al menú?</h3>
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button onClick={() => setConfirmarSalir(false)} className="btn btn-secondary">Cancelar</button>
              <button onClick={onVolver} className="btn btn-primary" style={{ background: '#d32f2f' }}>Sí, salir</button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        body { background-color: #f0f4f8 !important; color: #333 !important; font-family: sans-serif; margin: 0; padding: 0; }
        .app { padding: 15px; max-width: 800px; margin: 0 auto; min-height: 100vh; }
        .progreso { display: flex; gap: 6px; background: #e2e8f0; padding: 6px; border-radius: 40px; }
        .paso { flex: 1; padding: 8px 4px; text-align: center; border-radius: 30px; font-size: 0.8rem; font-weight: 600; background: white; color: #2d3748; }
        .paso.activo { background: #2196F3; color: white; }
        .contenido { background: white; padding: 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .card { padding: 10px 0; } .card-title { font-size: 1.4rem; color: #1a365d; border-left: 5px solid #2196F3; padding-left: 15px; margin-bottom: 15px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; } .form-group { display: flex; flex-direction: column; } .full-width { grid-column: 1 / -1; }
        input, select { padding: 10px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 1rem; }
        .btn { padding: 12px 20px; border: none; border-radius: 40px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: #2196F3; color: white; } .btn-secondary { background: #e2e8f0; color: #2d3748; } .btn-success { background: #4CAF50; color: white; }
        .notificacion-centro { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10000; color: white; padding: 20px 40px; border-radius: 12px; font-weight: bold; font-size: 1.2rem; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.4); width: 80%; max-width: 400px; }
        .notif-error { background-color: #f44336; } .notif-warning { background-color: #ff9800; } .notif-success { background-color: #4CAF50; }
        .signature-pad { border: 2px dashed #2196F3; border-radius: 12px; background: #f8fafc; margin-bottom: 15px; width: 100%; height: 200px; position: relative; } .signature-canvas { width: 100% !important; height: 100% !important; position: absolute; }
        .alerta-foto { background: #fff3cd; color: #856404; padding: 12px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #ffeeba; font-weight: 500; }
        @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}