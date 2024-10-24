import './style.css';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import GitRouter from './router/GitRouter';
import { UserProvider } from './provider/UserProvider';

export default function App() {
  return (
    <UserProvider>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={GitRouter} />
      </Suspense>
    </UserProvider>
  );
}
