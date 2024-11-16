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
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const { address } = useAccount();
  const router = useRouter();

  return (
    <Navbar className="h-[100px]">
      <NavbarBrand>
        <Link href="/">
          <Image src="/glasses_0.svg" alt="logo" width={170} height={170} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg font-londrina text-[25px]"
            onClick={() => router.push("/sponsor/dashboard")}
          >
            Distribute Rewards
          </Button>
        </NavbarItem>
      <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg font-londrina text-[25px]"
            onClick={() => router.push("/hacker/dashboard")}
          >
            Dashboard
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg font-londrina text-[25px]"
            onClick={() => router.push("/sponsor/dashboard")}
          >
            Sponsor Hacker
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            className="font-bold bg-white drop-shadow-lg font-londrina text-[25px]"
            onClick={() => router.push("/hacker/registration")}
          >
            Fund My Trip
          </Button>
        </NavbarItem>
        {address && (
        <NavbarItem>
          <NotificationModal userAddress={address} />
        </NavbarItem>
        )}
        <NavbarItem>
          <LoginStatusComponent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
