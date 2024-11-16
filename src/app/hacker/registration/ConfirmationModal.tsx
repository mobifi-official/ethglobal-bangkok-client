import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";

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
                Cool
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
