import React, { useState } from 'react';

const Login = ({ onLogin, showNotification }) => {
  const [correo, setCorreo] = useState('');
  const [verificando, setVerificando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!correo.trim()) {
      showNotification('Por favor ingresa tu correo institucional', 'warning');
      return;
    }

    setVerificando(true);

    try {
      // Simulación temporal mientras configuras Power Automate
      setTimeout(() => {
        if (correo.toLowerCase() === "javier.pool@cfe.mx" || correo.toLowerCase().includes("@cfe.mx")) {
          onLogin(correo);
        } else {
          showNotification('⛔ Acceso denegado. Tu correo no está en la lista de OneDrive.', 'error');
        }
        setVerificando(false);
      }, 1500);

    } catch (error) {
      showNotification('❌ Error de conexión al verificar', 'error');
      setVerificando(false);
    }
  };

  return (
    <div className="card text-center" style={{ maxWidth: '400px', width: '100%', padding: '40px 20px', animation: 'fadeIn 0.5s' }}>
      <h1 style={{ color: '#1a365d', fontSize: '2rem', marginBottom: '10px' }}>SeguridApp CFE</h1>
      <p style={{ color: '#718096', marginBottom: '30px' }}>Acceso exclusivo para personal autorizado</p>
      
      <form onSubmit={handleLogin}>
        <div className="form-group" style={{ textAlign: 'left', marginBottom: '25px' }}>
          <label style={{ color: '#4a5568', fontWeight: 'bold' }}>Correo Electrónico Institucional:</label>
          <input 
            type="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            placeholder="Correo Empresarial" 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #cbd5e0', marginTop: '8px', fontSize: '1rem' }}
          />
        </div>
        <button type="submit" disabled={verificando} className="btn btn-primary btn-large w-full" style={{ opacity: verificando ? 0.7 : 1 }}>
          {verificando ? '⏳ Verificando en OneDrive...' : '🔐 Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;