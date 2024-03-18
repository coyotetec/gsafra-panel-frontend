import { Toaster } from 'react-hot-toast';
import { Router } from './Router';
import { AuthProvider } from './app/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
