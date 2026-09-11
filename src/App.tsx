import { useEffect, useState } from 'react';
import { DashboardPage } from '@/routes/dashboard';
import { CheckInPage } from '@/routes/check-in';
import { CheckOutPage } from '@/routes/check-out';
import { RootLayout } from '@/routes/__root';

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { if (path === '/') window.history.replaceState({}, '', '/dashboard'); }, [path]);
  const navigateToDashboard = () => setPath('/dashboard');
  if (path === '/check-in') return <RootLayout active="check-in"><CheckInPage /></RootLayout>;
  if (path === '/check-out') return <RootLayout active="check-out"><CheckOutPage /></RootLayout>;
  return <RootLayout active={path === '/booking' ? 'booking' : 'dashboard'}><DashboardPage onQuickBooking={navigateToDashboard} isBooking={path === '/booking'} /></RootLayout>;
}

export default App;
