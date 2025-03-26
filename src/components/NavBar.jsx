import { useState } from "react";
import { useLocation } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import "../styles/components/NavBar.css";

export const ColorBlindnessLogo = () => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/tests", label: "Take Test" },
    { path: "/about", label: "About Us" },
    { path: "/faq", label: "FAQ" }
  ];

  return (
    <div className="navbar-container">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <ColorBlindnessLogo />
          <p className="text-logo font-bold text-inherit">ColorVision</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.path} isActive={isActive(item.path)}>
              <Link
                size="sm"
                color={isActive(item.path) ? "primary" : "foreground"}
                href={item.path}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="flex sm:hidden" justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu className="navbar-menu">
          {menuItems.map((item) => (
            <NavbarMenuItem key={`mobile-${item.path}`}>
              <Link
                size="sm"
                color={isActive(item.path) ? "primary" : "foreground"}
                href={item.path}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>

  );
}
