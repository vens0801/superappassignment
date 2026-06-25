import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies'; // Added the missing semicolon here

// Added this comment to stop your editor from throwing a prop-types error
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  
  // If there is no user name, redirect them back to the registration/login page
  if (!user.name) return <Navigate to="/" />;
  
  // Otherwise, let them see the protected page
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Register />} />
        
        {/* Protected Routes - Wrapping pages that require a login */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}