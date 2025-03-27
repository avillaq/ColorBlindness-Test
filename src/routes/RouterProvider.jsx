import { BrowserRouter, Routes, Route, useNavigate, useHref } from 'react-router-dom';
import { routes } from './routes';
import { Layout } from '../components/Layout';
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";

export const RouterProvider = () => {
  const navigate = useNavigate();

  return (
    <BrowserRouter>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        <ToastProvider />
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

    </BrowserRouter>
  );
};