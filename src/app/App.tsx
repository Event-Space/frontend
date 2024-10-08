import './style.css';

import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

// import router from './router/Router';
import GitRouter from './router/GitRouter';

export default function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <RouterProvider router={GitRouter} />
    </Suspense>
  );
}
