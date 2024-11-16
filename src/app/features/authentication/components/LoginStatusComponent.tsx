"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
} from "@particle-network/connectkit";
import LoginButton from "./LoginButton";

export default function LoginStatusComponent() {
  const { isConnected } = useAccount();

  const { disconnectAsync } = useDisconnect();

  

  return (
    <>
      <div className="flex flex-row items-center gap-[8px] md:gap-[16px]">
        <div className="flex flex-row items-center gap-[8px] md:gap-[12px]"></div>
      </div>
      {isConnected && (
        <button
          className="text-black"
          onClick={(e) => {
            disconnectAsync();
          }}
        >
          Logout
        </button>
      )}
      <div
        className={`${isConnected ? `md:hidden` : `md:inline-block`} hidden`}
      >
        <LoginButton label={"Connect Wallet"} />
      </div>
    </>
  );
}
