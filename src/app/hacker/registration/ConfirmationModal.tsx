import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Fireworks } from "@fireworks-js/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ConfirmationModal({
  isOpen,
  onOpenChange,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {/* Fireworks overlay */}
      {isOpen && (
        <Fireworks
          options={{
            rocketsPoint: {
              min: 50,
              max: 50,
            },
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        />
      )}

      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody className="flex flex-row items-center">
              <p className="text-2xl">Yay, your trip is submitted!</p>
              <Image
                src="/hacker_confirmation.svg"
                alt="Founding Detail"
                width={200}
                height={200}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                <Link href="/hacker/dashboard">Cool!</Link>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
