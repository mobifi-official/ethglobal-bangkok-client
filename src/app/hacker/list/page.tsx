"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { useEthersSigner } from "@/app/features/web3/wagmi/hooks/useEthersSigner";
import {
  fetchHackerDetails,
  getListOfAllHackers,
} from "@/app/lib/chainlink/contracts/hackathon-crowd-funding";
import { useEthersProvider } from "@/app/features/web3/wagmi/providers/useEthersProvider";

const HackersPage: React.FC = () => {
  const [hackers, setHackers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const provider = useEthersProvider();

  useEffect(() => {
    const fetchHackers = async () => {
      try {
        // Fetch the list of all hacker addresses
        const hackerAddresses = await getListOfAllHackers(provider!);

        // Fetch details for each hacker
        const hackerDetails = await Promise.all(
          hackerAddresses.map((address: string) =>
            fetchHackerDetails(address, provider!)
          )
        );

        setHackers(hackerDetails);
      } catch (error) {
        console.error("Error fetching hackers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#E0E7FF] to-[#F6F6F6] p-8 text-black">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Hackathon Participants
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner color="primary" size="lg" />
        </div>
      ) : hackers.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg">No hackers registered yet!</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-[32px] text-black">
          {hackers.map((hacker, index) => (
            <Card
              key={index}
              isHoverable
              className="m-4 w-full max-w-[320px]"
              classNames={{ body: "text-black", header: "text-black" }}
            >
              <CardHeader>
                <h3 className="text-lg font-bold text-black">{hacker.name}</h3>
              </CardHeader>
              <CardBody>
                <p>
                  <strong>Email:</strong> {hacker.email}
                </p>
                <p>
                  <strong>Project Description:</strong>{" "}
                  {hacker.projectDescription}
                </p>
                <p>
                  <strong>Requested Amount:</strong> {`${ethers.parseUnits(hacker.requestedAmount)} ETH`}
                </p>
                <p>
                  <strong>Prize Percentage for Sponsors:</strong>{" "}
                  {hacker.prizePercentageForSponsor}%
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HackersPage;
