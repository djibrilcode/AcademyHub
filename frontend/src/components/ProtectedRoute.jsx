import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Afficher un loader pendant le vérification
    if(loading){
        return <div>Chargement...</div>;
    }

    // Rediriger vers login si pas connecté
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    // Afficher la page si connecté
    return children
};

export default ProtectedRoute;