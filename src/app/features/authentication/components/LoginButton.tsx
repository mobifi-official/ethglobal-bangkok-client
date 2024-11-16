"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type Props = {
  label?: string;
  voidCallback?: () => void;
};

const LoginButton = ({ label = "Connect", voidCallback }: Props) => {
  const { connectors, connectAsync } = useConnect();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="inline-block">
        {!address && (
          <button
            className="h-48px] md:h-[56px] md:flex justify-center items-center text-black"
            onClick={onOpen}
          >
            {label}
          </button>
        )}
        {address && (
          <Button
            color="primary"
            onPress={(e) => {
              disconnectAsync();
            }}
          >
            Action
          </Button>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "bg-[#F6F6F6] rounded-[24px]",
          body: " px-[20px] py-[20px] gap-[32px]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-black"> Connect Wallet</p>
              </ModalHeader>
              <ModalBody>
                {connectors.map((connector, _) => {
                  return (
                    <Button
                      key={connector.id}
                      onClick={async (e) => {
                        try {
                          await connectAsync({ connector });
                          onClose();
                        } catch (error) {}
                      }}
                    >
                      <p>{connector.name}</p>
                    </Button>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginButton;
