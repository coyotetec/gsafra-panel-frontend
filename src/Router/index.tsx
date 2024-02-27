import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<h1 className="text-5xl  text-primary960">Gsafra Panel</h1>}
          path="/"
        />
      </Routes>
    </BrowserRouter>
  );
}
