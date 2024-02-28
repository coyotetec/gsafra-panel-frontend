import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../view/pages/Login';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}
