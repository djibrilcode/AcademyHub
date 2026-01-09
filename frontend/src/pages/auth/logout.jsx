import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
      // Appeler l'API de déconnexion
      axios.post('http://localhost:5000/api/auth/logout');

      // Utiliser la fonction logout du contexte
      logout();

      // Rediriger vers la page de connexion
      navigate('/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :',error.message);
        setError('Erreur lors de la déconnexion. Rédirection en cours...');

        // Même en cas d'erreur, utiliser logout et rédiriger après un délai
        logout();
        setTimeout(()=> navigate('/login'), 2000);
      }
    }
    
    performLogout();
  }, [navigate, logout]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px'
    }}>
      {error ? (
        <>
          <p>{error}</p>
          <p>Vous serez redirigé vers la page de connexion.</p>
        </>
      ) : (
        <p>Déconnexion en cours...</p>
      )}
    </div>
  );
};

export default Logout;