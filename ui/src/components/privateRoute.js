import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUserQuery } from '../api';

export function PrivateRoute({ children }) {
  const location = useLocation();
  const { isLoading, isSuccess } = useCurrentUserQuery();
  if (isLoading) {
    return null;
  }
  return isSuccess ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
    />
  );
}
