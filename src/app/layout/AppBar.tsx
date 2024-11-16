"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import LoginStatusComponent from "../features/authentication/components/LoginStatusComponent";

export default function AppBar() {
  return (
    <Navbar className="h-[170px]">
      <NavbarBrand>
        <Image src="/glasses_0.svg" alt="logo" width={170} height={170} />
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg"
            href="/hacker/registration"
          >
            Fund My Trip
          </Button>
        </NavbarItem>
        <NavbarItem>
          <LoginStatusComponent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
