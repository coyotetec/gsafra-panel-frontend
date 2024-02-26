import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<h1 className="text-primary960  text-5xl">Gsafra Panel</h1>}
          path="/"
        />
      </Routes>
    </BrowserRouter>
  );
}
