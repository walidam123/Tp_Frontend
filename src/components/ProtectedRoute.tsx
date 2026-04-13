import { Navigate, useLocation } from 'react-router-dom';
// Remplacement de useAuth par Redux
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface Props { children: React.ReactNode; }

export default function ProtectedRoute({ children }: Props) {
    // Lecture de l'utilisateur dans le store Redux 
    const { user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!user) {
        // Redirection vers login si non connecté 
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return <>{children}</>;
}