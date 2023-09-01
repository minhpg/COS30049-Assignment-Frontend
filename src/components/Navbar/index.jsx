import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

import Prices from "./Prices";
import Logo from "../Logo";
import UserDropdown from "./UserDropdown";

export default () => {
  const menuItems = [
    "Dashboard",
    "Activity",
    "Analytics",
    "Settings",
    "Help & Feedback",
  ];

  return (
    <>
      <Prices />
      <Navbar position="sticky">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          {menuItems.slice(0, 4).map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link className="w-full hover:underline" color={"foreground"}>
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <UserDropdown />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" color="foreground" href="#" size="lg">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};
