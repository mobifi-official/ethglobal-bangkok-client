"use client";

import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

// import { buildFormattedCurrency } from "@/app/features/local-currency/utils/local-currency-utils";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from "@nextui-org/react";
import { ImageSize, replaceSizeInUrl } from "@/app/features/utils/url-utlis";
import axios from "axios";

interface Props {
  roomGroup: {
    roomType: string;
    rates: any[];
  };
  hotelStayDescription?: string;
  searchSpecifications?: { [key: string]: any };
  metadata: { [key: string]: any };
}

const HotelDetailsRoomGroupCard = (props: Props) => {
  const { roomGroup } = props;
  const { rates, roomType } = roomGroup;
  const images = rates.length > 0 ? rates[0].images : [];
  const thumbnail = images.at(0) ?? `/image-not-found.png`;
  const[additionalHotelDetails, setAdditionalHotelDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const hotelId = 'test_hotel';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dev-api.mobifi.info/api/v2"

useEffect(() => {
  const fetchHotelDetails = async () => {
    try {
      // GET request
      const infoResponse = await axios.get(`${baseUrl}/hotel/detail/${hotelId}/info`)

      setAdditionalHotelDetails({
        info: infoResponse.data,
        // availability: availabilityResponse.data
      })
    } catch (error) {
      console.error("Error fetching hotel details:", error)
    }
  }

  fetchHotelDetails()
}, [baseUrl, hotelId])

  console.log(
    `=======>[[ADDITIONAL-HOTEL-DETAILS]]<=======`,
    additionalHotelDetails,
  );

//   const router = useRouter();


  const [showAllRates, setShowAllRates] = useState(false);

  const visibleRates = useMemo(() => {
    return showAllRates ? rates : rates.slice(0, 2);
  }, [rates, showAllRates]);

  return (
    <div className="flex flex-col p-[32px] bg-[rgb(234,239,230)] bg-opacity-50 rounded-[24px] gap-[24px]">
      <div className="flex flex-col gap-[16px]">
        <p className="hotel-details-room-name">{roomType}</p>
        {/* TODO: Amenities section */}
        {/* <div className="flex flex-row justify-start gap-[12px]">
          <div className="flex flex-row gap-[4px] items-center bg-[rgb(234,239,230)] rounded-[8px] py-[4px] px-[8px]">
            <ResponsiveIcon icon="icon-wifi" sizeDesktop={16} sizeMobile={16} />
            <p className="hotel-details-room-amenity">{t("details.wifi")}</p>
          </div>
        </div> */}
      </div>
      <div className="flex flex-row justify-start">
        <div className="relative rounded-[8px] overflow-hidden w-[240px] h-[190px]">
          <img
            src={replaceSizeInUrl(thumbnail, ImageSize.Fit1024x768)}
            alt={roomGroup.roomType}
            style={{ objectFit: "contain" }}
            className="!rounded-[8px]"
          />
        </div>
        <div className="ml-[20px] flex flex-col justify-start w-full">
          {visibleRates.map((rate, index) => {
            

            const taxData = rate.tax_data_mobifi ?? [];
            const allTaxesNotIncludedInFinalPrice = taxData.filter(
              (tax: { included_by_supplier: boolean; }) => tax.included_by_supplier === false,
            );

            const rateHasSurcharges =
              allTaxesNotIncludedInFinalPrice.length > 0;
            const freeCancellationBefore = rate.free_cancellation_before;

            const showCurrencyCode = rate.show_currency_code;
            const showCurrencyAmount = rate.show_total_price;

            // const formattedAmount = buildFormattedCurrency({
            //   locale,
            //   currency: showCurrencyCode,
            //   amount: showCurrencyAmount,
            // });

            const breakfastIsAvailable = rate.meal_data.has_breakfast;

            return (
              <div
                key={index}
                className="transition-all duration-500 ease-in-out"
              >
                {index > 0 && (
                  <div className="h-[0.5px] bg-secondary-neutral my-[24px]" />
                )}

                <div className="grid grid-cols-3 w-full gap-[24px]">
                  {/* Room Name Column */}
                  <div>
                    <p className="hotel-details-room-card-body text-primary-black">
                      {rate.room_name}
                    </p>
                  </div>

                  {/* <div className="flex flex-col items-start">
                    <div className="flex flex-row justify-start items-center gap-[4px]">
                      <ResponsiveIcon
                        icon={
                          breakfastIsAvailable
                            ? "icon-fast-food"
                            : "icon-no-meals"
                        }
                        color={breakfastIsAvailable ? "#1A1A1A" : "#BB563A"}
                        sizeDesktop={16}
                        sizeMobile={16}
                      />
                      <p
                        className={`hotel-details-room-card-body ${breakfastIsAvailable ? `text-primary-black` : `text-secondary-error`}`}
                      >
                        {breakfastIsAvailable
                          ? `Breakfast is provided`
                          : `No free breakfast`}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-[4px]">
                      <ResponsiveIcon
                        icon="icon-repeat"
                        sizeDesktop={16}
                        sizeMobile={16}
                      />
                      <p className="hotel-details-room-card-body text-primary-black">
                        {!freeCancellationBefore
                          ? t("details.noFreeCancellation")
                          : `${t("details.freeCancellationBefore", {
                              date: format(
                                new Date(freeCancellationBefore),
                                "dd/MM/yyyy",
                              ),
                            })}`}
                      </p>
                    </div>
                  </div> */}

                  {/* Price and Action Column */}
                  <div className="flex flex-col items-end gap-[4px]">
                    <p className="hotel-details-room-price">
                      {/* {formattedAmount} */} $100
                    </p>
                    <p className="hotel-details-room-card-body-small">
                      {rateHasSurcharges
                        ? "taxes"
                        : "no tax included"}
                    </p>
                    <p className="hotel-details-room-card-body-small">
                      {props.hotelStayDescription}
                    </p>
                    <div className="h-[8px]" />
                    <Button
                      onClick={async () => {
                        // const searchSpecifications = props.searchSpecifications;
                        // const targetGuests = (
                        //   searchSpecifications.guests as Array<{
                        //     [key: string]: any;
                        //   }>
                        // )[0];
                        // const numberOfAdults = targetGuests.adults;
                        // const numberOfChildren = (
                        //   targetGuests.children as Array<number>
                        // ).length;
                        // const childrenAges = targetGuests.children.join(",");

                      }}
                      type="button"
                      className="rounded-full bg-primary-brand"
                    >
                      Support
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          {rates.length > 2 && (
            <div className="flex justify-end mt-[24px]">
              <Button
                onClick={() => setShowAllRates(!showAllRates)}
                type="button"
                className="rounded-full hotel-details-room-text-button"
              >
                <div className="flex flex-row items-center gap-[4px]">
                  <p className="hotel-details-room-text-button">
                    {showAllRates
                      ? "Collapse"
                      : "Show more"}
                  </p>
                  <motion.div
                    animate={{ rotate: showAllRates ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {<KeyboardArrowDownIcon className="text-[#89A373]" />}
                  </motion.div>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsRoomGroupCard;
