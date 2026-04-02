// // Notification.js
// import React, { useEffect } from 'react';

// const Notification = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 4000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50';

//   return (
//     <div style={{
//       position: 'fixed',
//       top: '20px',
//       left: '50%',
//       transform: 'translateX(-50%)',
//       backgroundColor: bgColor,
//       color: 'white',
//       padding: '12px 24px',
//       borderRadius: '50px',
//       boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
//       zIndex: 1000,
//       fontSize: '1rem',
//       fontWeight: 'bold',
//       animation: 'slideDown 0.3s ease-out',
//       maxWidth: '90%',
//       textAlign: 'center'
//     }}>
//       {message}
//     </div>
//   );
// };

// export default Notification;




import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4caf50';

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: bgColor,
      color: 'white',
      padding: '12px 24px',
      borderRadius: '50px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      zIndex: 1000,
      fontSize: '1rem',
      fontWeight: 'bold',
      animation: 'slideDown 0.3s ease-out',
      maxWidth: '90%',
      textAlign: 'center'
    }}>
      {message}
    </div>
  );
};

export default Notification;