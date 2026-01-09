import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');

      if (accessToken) {
        // Set the token in axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        try {
          // Fetch user data - assuming there's a /me endpoint
          const response = await axios.get('http://localhost:5000/api/auth/me');
          const userData = response.data.user;

          // Login with the token and user data
          login(userData, accessToken);

          // Redirect to dashboard
          navigate('/dashboard-etudiant');
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
          navigate('/login?error=oauth');
        }
      } else {
        navigate('/login?error=oauth');
      }
    };

    handleOAuth();
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 text-lg">Connexion en cours...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;