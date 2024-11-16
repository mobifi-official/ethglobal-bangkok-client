"use client";

import { useState, useEffect, useMemo, SetStateAction } from "react";
import { ImageSize, replaceSizeInUrl } from "@/app/features/utils/url-utlis";
import HotelDetailsRoomGroupCard from "./HotelDetailsRoomGroupCard";
import { groupRatesByRoomType, integrateImagesIntoRates } from "@/app/features/utils/hotel-rooms-utils";

interface Props {
  roomGroups: any[];
  hotelId: string;
  additionalHotelDetails?: { [key: string]: any };
  searchType: string;
  accessLocation?: "general" | "modal";
  addTopPadding?: boolean;
  rates: []
}

interface RateHawkHotelSearchSpecifications {
    checkin?: string | null;
    checkout?: string | null;
    guests?: { [key: string]: any }[];
    currency?: string;
    region_id?: number;
    name?: string;
  }

const HotelDetailsRoomsSection = ({
  roomGroups,
  hotelId,
  additionalHotelDetails,
  searchType,
  addTopPadding = true,
  accessLocation = "general",
  rates
}: Props) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [filteredRates, setFilteredRates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [childAges, setChildAges] = useState<number[]>([]);
  const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
  const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
  const [checkInDate, setCheckInDate] = useState<string | null>();
  const [checkOutDate, setCheckOutDate] = useState<string | null>();
  const [numberOfRooms, setNumberOfRooms] = useState<number>(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  console.log("rates data", rates)


  useEffect(() => {
    const getRooms = async () => {
      // setIsLoading(true);
      const ratesWithImages = integrateImagesIntoRates(rates, roomGroups);
      // setIsLoading(false);
      setRooms(ratesWithImages);
    };

    const { guests }: RateHawkHotelSearchSpecifications =
      {checkin: "2024-11-20",
        checkout: "2024-11-24",
        region_id: 6308866,
        currency: "USD",
        guests: [{ adults: 1, children: [] }],
        name: "Test Hotel (Do Not Book)"};

    const childrenAges: SetStateAction<number[]> =  [];
    const n_adults =  1;

    setChildAges(childrenAges);
    setNumberOfAdults(n_adults);
    setCheckInDate("2024-11-20");
    setCheckOutDate("2024-11-24");

    getRooms();
  }, [ roomGroups, rates]);




  // Filter rates based on selected filters
  useEffect(() => {
    let filtered = rooms;

    setFilteredRates(filtered);
  }, [selectedFilters, rooms]);


  const groupedRates = groupRatesByRoomType(filteredRates);


  return (
    <div className="flex flex-col w-full">
      <div className={`${addTopPadding ? `pt-[40px]` : `pt-0`}`}></div>
      <div className="h-[20px]"></div>
      <div className="flex flex-col gap-[8px]">
        {
        // Object.keys(groupedRates)
        Object.keys(groupedRates).length > 0 &&
        Object.keys(groupedRates).map((roomType, index) => (
            <HotelDetailsRoomGroupCard
              key={index}
              roomGroup={groupedRates[roomType]}
            //   hotelStayDescription={descriptionOnHotelStay}
              metadata={{
                // ...rateHawkSearchSpecifications,
                checkin: checkInDate,
                checkout: checkOutDate,
                hotelId: hotelId,
                hotelName: additionalHotelDetails?.name,
                hotelAddress: additionalHotelDetails?.address,
                thumbnail: replaceSizeInUrl(
                  additionalHotelDetails?.images.at(0),
                  ImageSize.Fit1024x768,
                ),
                hotelContacts: {
                  phone: additionalHotelDetails?.phone,
                  email: additionalHotelDetails?.email,
                },
              }}
            />
          ))}
        {/* {!isLoading && Object.keys(groupedRates).length === 0 && (
          <ItemNotFoundContainer message={t("details.noRooms")} />
        )} */}
        {/* {isLoading &&
          Array.from({ length: 4 }, (_, index) => (
            <HotelDetailsRoomGroupCardSkeleton key={index} />
          ))} */}
      </div>
    </div>
  );
};

export default HotelDetailsRoomsSection;
