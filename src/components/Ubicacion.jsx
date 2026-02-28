import React, { useState } from 'react';

const Ubicacion = ({ onUbicacionObtenida }) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerUbicacion = () => {
    setCargando(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocalización no soportada por el navegador');
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
            {
              headers: {
                'Accept-Language': 'es',
                'User-Agent': 'SeguriApp/1.0'
              }
            }
          );
          
          const data = await response.json();
          const direccion = data.display_name || 'Dirección no disponible';
          
          onUbicacionObtenida(
            `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`,
            direccion,
            coordenadas
          );
        } catch (err) {
          console.error('Error obteniendo dirección:', err);
          onUbicacionObtenida(
            `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`,
            'Error al obtener dirección detallada',
            coordenadas
          );
        }
        
        setCargando(false);
      },
      (err) => {
        console.error('Error de geolocalización:', err);
        setError('No se pudo obtener la ubicación. Verifica los permisos.');
        setCargando(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4" style={{ color: '#1a365d' }}>4. Registrar Ubicación</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Para registrar la ubicación exacta del incidente, necesitamos tu permiso de GPS.
        </p>
        
        <button
          onClick={obtenerUbicacion}
          disabled={cargando}
          style={{ 
            width: '100%', padding: '12px', borderRadius: '6px', border: 'none', 
            fontWeight: 'bold', cursor: cargando ? 'not-allowed' : 'pointer',
            background: cargando ? '#ccc' : '#4CAF50', color: 'white', marginBottom: '15px'
          }}
        >
          {cargando ? 'Obteniendo ubicación...' : '📍 Obtener Ubicación Actual'}
        </button>
      </div>

      {error && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ background: '#e3f2fd', border: '1px solid #90caf9', padding: '15px', borderRadius: '8px' }}>
        <h3 style={{ color: '#1565c0', marginTop: 0 }}>¿Por qué necesitamos tu ubicación?</h3>
        <ul style={{ color: '#0d47a1', fontSize: '0.9rem', paddingLeft: '20px', margin: 0 }}>
          <li>Registro exacto del lugar del reporte.</li>
          <li>Cumplimiento de requisitos del formato oficial.</li>
          <li>Evidencia georreferenciada de las revisiones.</li>
        </ul>
      </div>
    </div>
  );
};

export default Ubicacion;