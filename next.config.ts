import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "imgur.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "ipfs.filebase.io",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace.s3-eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace.s3.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace-new.s3.eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace.s3.eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace-prod.s3.eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace-staging.s3.eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "secure.meetupstatic.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-marketplace-uat.s3.eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "mobifi-images.s3.eu-north-1.amazonaws.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "cdn.worldota.net",
        pathname: "**"
      } // Images from RateHawk Hotel API
    ],
  },
};

export default nextConfig;
