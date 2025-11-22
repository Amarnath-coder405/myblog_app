import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}
