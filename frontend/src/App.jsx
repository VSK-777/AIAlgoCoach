import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AiInsights from './pages/AiInsights';
import Analytics from './pages/Analytics';
import AboutDeveloper from './pages/AboutDeveloper';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:handle" element={<Dashboard />} />
        <Route path="/ai-insights" element={<AiInsights />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<AboutDeveloper />} />
      </Route>
    </Routes>
  );
}

export default App;
