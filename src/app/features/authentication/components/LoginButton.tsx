"use client";

import { useConnect, useModal } from "@particle-network/connectkit";

type Props = {
  label?: string;
  voidCallback?: () => void;
};

const LoginButton = ({ label = "Connect", voidCallback }: Props) => {
  const { isOpen, setOpen } = useModal();

  const { connectAsync } = useConnect();

  const onConnectButtonClicked = () => {
    setOpen(!isOpen);
  };

  const onMobileLoginClicked = (e: React.FormEvent) => {
    voidCallback?.();

    onConnectButtonClicked();
  };

  return (
    <>
      <div className="hidden md:inline-block">
        <button
          className="h-48px] md:h-[56px] md:flex justify-center items-center text-black"
          onClick={onConnectButtonClicked}
        >
          {label}
        </button>
      </div>
      <div className="md:hidden inline-block">
        <button onClick={onMobileLoginClicked}>{label}</button>
      </div>
    </>
  );
};

export default LoginButton;
