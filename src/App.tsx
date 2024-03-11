import { Router } from './Router';
import { AuthProvider } from './app/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
