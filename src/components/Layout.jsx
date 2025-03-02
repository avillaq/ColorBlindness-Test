import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import '../styles/components/Layout.css';

export const Layout = () => {
  return (
    <>
      <header className='header-container'>
        <NavBar />
      </header>
      <main className='main-container'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};