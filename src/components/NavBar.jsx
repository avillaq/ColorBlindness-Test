import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import 'boxicons';
import "../styles/components/NavBar.css";

export const AcmeLogo = () => {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#E0E0E0" />

      <circle cx="7" cy="7" r="2" fill="#FF5733" />
      <circle cx="12" cy="5" r="2" fill="#33FF57" />
      <circle cx="17" cy="7" r="2" fill="#3357FF" />
      <circle cx="5" cy="12" r="2" fill="#FF33A8" />
      <circle cx="19" cy="12" r="2" fill="#FFC300" />
      <circle cx="7" cy="17" r="2" fill="#DAF7A6" />
      <circle cx="12" cy="19" r="2" fill="#900C3F" />
      <circle cx="17" cy="17" r="2" fill="#C70039" />

      <ellipse cx="12" cy="12" rx="4.5" ry="2.5" fill="white" stroke="black" strokeWidth="0.6" />
      <circle cx="12" cy="12" r="1.5" fill="black" />
      <circle cx="12" cy="11.5" r="0.5" fill="white" />
    </svg>
  );
};

export const NavBar = () => {
  return (
    <div className="navbar-container">
      <Navbar>
        <NavbarBrand>
          <AcmeLogo />
          <p className="text-logo font-bold text-inherit">ColorVision</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link size="sm" color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link size="sm" color="foreground" href="#">
              Take Test
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link size="sm" color="foreground" href="#">
              Education
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} size="sm" isIconOnly color="primary" href="#" variant="flat">
              <box-icon name='accessibility'></box-icon>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>

  );
}
