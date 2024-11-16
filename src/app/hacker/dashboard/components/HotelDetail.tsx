import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HotelImageGallery from './HotelImageCarousel';
import HotelDetailsRoomsSection from './HotelRoomGroupSection';
import { ImageSize, replaceSizeInUrl } from '@/app/features/utils/url-utlis';

interface HotelDetails {
  info?: any;
  availability?: any;
}

const HotelDetail = () => {
  const [details, setDetails] = useState<HotelDetails>({})
  const hotelId = 'test_hotel'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dev-api.mobifi.info/api/v2"

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        // GET request
        const infoResponse = await axios.get(`${baseUrl}/hotel/detail/${hotelId}/info`)
        
        // POST request
        const availabilityResponse = await axios.post(`${baseUrl}/hotel/detail/${hotelId}/price`, {
          checkin: "2024-11-20",
          checkout: "2024-11-24",
          region_id: 6308866,
          currency: "USD",
          guests: [{ adults: 1, children: [] }],
          name: "Test Hotel (Do Not Book)"
        })

        setDetails({
          info: infoResponse.data,
          availability: availabilityResponse.data
        })
      } catch (error) {
        console.error("Error fetching hotel details small change:", error)
      }
    }

    fetchHotelDetails()
  }, [baseUrl, hotelId])

  console.log("info details", details?.info)

  if (!details.info || !details.availability) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Hotel Details</h1>
      <p className="text-[18px]">{details.info?.name}<span className="text-[12px] text-gray-500">{details.info?.address}</span></p>
      <HotelImageGallery isLoading={!details.info || !details.availability} hotelImages={details?.info?.images.map((image: string) =>
      replaceSizeInUrl(image, ImageSize.Fit1024x768),
    )} />
      <HotelDetailsRoomsSection hotelId='test_hotel' searchType='hotel' roomGroups={details?.info?.roomGroups || details?.info?.room_groups} />
    </div>
  )
}

export default HotelDetail