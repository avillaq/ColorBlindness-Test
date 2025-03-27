import { BrowserRouter, Routes, Route, useNavigate, useHref } from 'react-router-dom';
import { routes } from './routes';
import { Layout } from '../components/Layout';
import { HeroUIProvider } from '@heroui/react'

const AppWithRouter = () => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={<Element />}
            />
          ))}
        </Route>
      </Routes>
    </HeroUIProvider>
  );
};

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  );
};