import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../view/pages/Login';
import { CreatePassword } from '../view/pages/CreatePassword';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-senha" element={<CreatePassword />} />
        <Route path="recuperar-senha" element={<h1>Recuperar senha</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
