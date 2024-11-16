"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
} from "@nextui-org/react";

interface HotelImageGalleryProps {
  hotelImages: string[];
  isLoading: boolean;
}

const HotelImageGallery: React.FC<HotelImageGalleryProps> = ({
  hotelImages,
  isLoading,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const maxPreviewImages = 5;
  const previewImages = hotelImages.slice(0, maxPreviewImages);
  const additionalImagesCount = hotelImages.length - maxPreviewImages;

  return (
    <div className="min-w-full">
      <div className="flex gap-2 w-full h-[400px]">
        {isLoading ? (
          <>
            {/* Main large image skeleton */}
            <Skeleton className="w-[65%] h-full rounded-lg" />

            {/* Two columns of smaller skeletons */}
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-[196px] rounded-lg" />
              <Skeleton className="h-[196px] rounded-lg" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-[196px] rounded-lg" />
              <Skeleton className="h-[196px] rounded-lg" />
            </div>
          </>
        ) : (
          <>
            {/* Main large image */}
            <div
              className="w-[65%] relative cursor-pointer h-full"
              onClick={() => openModal(0)}
            >
              <Image
                src={previewImages[0]}
                alt="Hotel Image 1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>

            {/* First column of smaller images */}
            <div className="flex flex-1 flex-col gap-2">
              {previewImages.slice(1, 3).map((image, index) => (
                <div
                  key={index + 1}
                  className="relative cursor-pointer h-[196px]"
                  onClick={() => openModal(index + 1)}
                >
                  <Image
                    src={image}
                    alt={`Hotel Image ${index + 2}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Second column of smaller images */}
            <div className="flex flex-1 flex-col gap-2">
              {previewImages.slice(3, 5).map((image, index) => (
                <div
                  key={index + 3}
                  className="relative cursor-pointer h-[196px]"
                  onClick={() => openModal(index + 3)}
                >
                  <Image
                    src={image}
                    alt={`Hotel Image ${index + 4}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  {index === 1 && additionalImagesCount > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold rounded-lg">
                      +{additionalImagesCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        scrollBehavior="inside"
        isDismissable
        hideCloseButton
        classNames={{
          wrapper: "z-[99999]",
          base: ["hotel-gallery-modal-base"],
          header:
            "flex flex-row justify-between w-full px-0 gap-0",
          body: "p-0",
          footer: "p-0",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="hotel-gallery-modal-title">Photos</p>
                <NeumorphicIconButton
                  icon={<IconClose size={16} />}
                  variant="secondary"
                  className="flex w-[32px] h-[32px] rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  aria-label="Menu icon"
                  type="button"
                />
              </ModalHeader>
              <ModalBody>
                <HotelImagesCarousel images={hotelImages} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </div>
  );
};

export default HotelImageGallery;
