import { useEffect, useState } from 'react';
import { DashboardPage } from '@/routes/dashboard';
import { CheckInPage } from '@/routes/check-in';
import { CheckOutPage } from '@/routes/check-out';
import { RootLayout } from '@/routes/__root';

type Route = 'dashboard' | 'check-in' | 'check-out' | 'booking';

function getRoute(pathname: string): Route {
  if (pathname === '/check-in') return 'check-in';
  if (pathname === '/check-out') return 'check-out';
  if (pathname === '/booking') return 'booking';
  return 'dashboard';
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (path === '/') window.history.replaceState({}, '', '/dashboard');
  }, [path]);

  const route = getRoute(path);

  if (route === 'check-in') {
    return (
      <RootLayout active="check-in">
        <CheckInPage />
      </RootLayout>
    );
  }

  if (route === 'check-out') {
    return (
      <RootLayout active="check-out">
        <CheckOutPage />
      </RootLayout>
    );
  }

  return (
    <RootLayout active={route}>
      <DashboardPage isBooking={route === 'booking'} />
    </RootLayout>
  );
}

export default App;
