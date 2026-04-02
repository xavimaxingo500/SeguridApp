// import React, { useState } from 'react';

// const Ubicacion = ({ onUbicacionObtenida, showNotification }) => {
//   const [cargando, setCargando] = useState(false);

//   const obtenerUbicacion = () => {
//     setCargando(true);
//     if (!navigator.geolocation) {
//       showNotification('Geolocalización no soportada por el navegador', 'error');
//       setCargando(false);
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const coordenadas = { lat: latitude, lng: longitude };
//         try {
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
//             { headers: { 'Accept-Language': 'es', 'User-Agent': 'SeguriApp/1.0' } }
//           );
//           const data = await response.json();
//           const direccion = data.display_name || 'Dirección no disponible';
//           onUbicacionObtenida(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, direccion, coordenadas);
//           showNotification('📍 Ubicación obtenida correctamente', 'success');
//         } catch (err) {
//           console.error(err);
//           onUbicacionObtenida(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, 'Error al obtener dirección', coordenadas);
//           showNotification('⚠️ Error al obtener dirección detallada', 'warning');
//         }
//         setCargando(false);
//       },
//       (err) => {
//         console.error(err);
//         showNotification('No se pudo obtener la ubicación. Verifica los permisos.', 'error');
//         setCargando(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   return (
//     <div className="card">
//       <h2 className="card-title">📍 Registrar Ubicación</h2>
//       <p className="text-gray-600 mb-4">Para registrar la ubicación exacta del incidente, necesitamos tu permiso de GPS.</p>
//       <button onClick={obtenerUbicacion} disabled={cargando} className="btn btn-success btn-large w-full">
//         {cargando ? '⏳ Obteniendo ubicación...' : '📍 Obtener Ubicación Actual'}
//       </button>
//       <div className="info-box mt-6">
//         <h3>¿Por qué necesitamos tu ubicación?</h3>
//         <ul>
//           <li>Registro exacto del lugar del reporte.</li>
//           <li>Cumplimiento de requisitos del formato oficial.</li>
//           <li>Evidencia georreferenciada de las revisiones.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Ubicacion;




import React, { useState } from 'react';

const Ubicacion = ({ onUbicacionObtenida, showNotification }) => {
  const [cargando, setCargando] = useState(false);

  const obtenerUbicacion = () => {
    setCargando(true);
    if (!navigator.geolocation) {
      showNotification('Geolocalización no soportada por el navegador', 'error');
      setCargando(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordenadas = { lat: latitude, lng: longitude };
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { headers: { 'Accept-Language': 'es', 'User-Agent': 'SeguriApp/1.0' } }
          );
          const data = await response.json();
          const direccion = data.display_name || 'Dirección no disponible';
          onUbicacionObtenida(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, direccion, coordenadas);
          showNotification('📍 Ubicación obtenida correctamente', 'success');
        } catch (err) {
          console.error(err);
          onUbicacionObtenida(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`, 'Error al obtener dirección', coordenadas);
          showNotification('⚠️ Error al obtener dirección detallada', 'warning');
        }
        setCargando(false);
      },
      (err) => {
        console.error(err);
        showNotification('No se pudo obtener la ubicación. Verifica los permisos.', 'error');
        setCargando(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="card">
      <h2 className="card-title">📍 Registrar Ubicación</h2>
      <p className="text-gray-600 mb-4">Para registrar la ubicación exacta del incidente, necesitamos tu permiso de GPS.</p>
      <button onClick={obtenerUbicacion} disabled={cargando} className="btn btn-success btn-large w-full">
        {cargando ? '⏳ Obteniendo ubicación...' : '📍 Obtener Ubicación Actual'}
      </button>
      <div className="info-box mt-6">
        <h3>¿Por qué necesitamos tu ubicación?</h3>
        <ul>
          <li>Registro exacto del lugar del reporte.</li>
          <li>Cumplimiento de requisitos del formato oficial.</li>
          <li>Evidencia georreferenciada de las revisiones.</li>
        </ul>
      </div>
    </div>
  );
};

export default Ubicacion;