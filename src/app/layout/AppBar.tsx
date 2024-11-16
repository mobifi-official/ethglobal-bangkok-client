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
import NotificationModal from "./NotificationList";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function AppBar() {
  const { address } = useAccount();

  return (
    <Navbar className="h-[170px]">
      <NavbarBrand>
        <Image src="/glasses_0.svg" alt="logo" width={170} height={170} />
      </NavbarBrand>

      <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg font-londrina text-[25px]"
            href="/hacker/dashboard"
          >
            Sponsor Hacker
          </Button>
          
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg font-londrina text-[25px]"
            href="/hacker/registration"
          >
            Fund My Trip
          </Button>
          
        </NavbarItem>
        <NavbarItem>
          <NotificationModal userAddress={address} />
        </NavbarItem>
        <NavbarItem>
          <LoginStatusComponent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
