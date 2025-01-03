"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import glasses from "../../../../public/glasses_1.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { weiToEth } from "@/utils/converter";

export interface HackathonData {
  name: string;
  email?: string;
  hacker: string;
  githubLink: number;
  competitionName: string;
  requestedAmount: number;
  receivedAmount: number;
  totalPrize: number;
  prizePercentageForSponsor: number;
  sponsorList: any[];
}

export interface SponsorFundedData {
  hacker: string;
  sponsor: string;
}

const query = gql`
  {
    sponsorFundeds {
      hacker
      sponsor
    }
    hackerRegistereds(first: 5) {
      id
      hacker
      competitionName
      name
      requestedAmount
      receivedAmount
      totalPrize
      prizePercentageForSponsor
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/94957/ethbangkok/version/latest";

export default function SponsorDashboard() {
  const { data, isLoading } = useQuery<{
    sponsorFundeds: SponsorFundedData[];
    hackerRegistereds: HackathonData[];
  }>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [sponsoredHackers, setSponsoredHackers] = useState<HackathonData[]>([]);
  const [donations, setDonations] = useState<{ [key: string]: number }>({});

  // Handle input change for donation amount
  const handleInputChange = (hacker: string, value: string) => {
    setDonations((prev) => ({
      ...prev,
      [hacker]: parseFloat(value) || 0,
    }));
  };

  // Handle donation submission
  const handleDonate = async (hacker: string) => {
    const amount = donations[hacker];
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      // Implement donation logic here
      // e.g., interacting with a smart contract or updating the backend
      console.log(`Donating ${amount} ETH to ${hacker}`);
      alert(`Successfully donated ${amount} ETH to ${hacker}`);
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Failed to process the donation. Please try again.");
    }
  };

  // Connect Wallet and Fetch Address
  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const provider = new Web3Provider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setWalletAddress(accounts[0].toLowerCase());
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      }
    };
    fetchWalletAddress();
  }, []);

  // Filter Sponsored Hackers
  useEffect(() => {
    if (data && walletAddress) {
      const hackerAddresses = data.sponsorFundeds
        .filter((item) => item.sponsor.toLowerCase() === walletAddress)
        .map((item) => item.hacker);

      const filteredHackers = data.hackerRegistereds.filter((hacker) =>
        hackerAddresses.includes(hacker.hacker)
      );

      setSponsoredHackers(filteredHackers);
    }
  }, [data, walletAddress]);

  if (!data || !data.hackerRegistereds || !data.sponsorFundeds)
    return <div>No data available</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-row gap-2 items-center justify-start p-4">
        <Image src={glasses} height={18} width={30} alt="glasses" />
        <h1 className="table-title">Hackers that need your help!</h1>
      </div>

      <Tabs aria-label="Hackathon tabs" className="w-full bg-white" fullWidth>
        <Tab key="stillNeed" title="Need Help">
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <Table
              aria-label="Hackers that need help"
              className="mt-4 bg-white"
            >
              <TableHeader className="table-title">
                <TableColumn className="table-title lowercase">
                  HACKER NAME
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  HACKATHON NAME
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  REQUESTED AMOUNT
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  RECEIVED AMOUNT
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  REWARD AMOUNT FOR YOU
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  DONATION AMOUNT
                </TableColumn>
                <TableColumn aria-label="Submit Column">{""}</TableColumn>
              </TableHeader>
              <TableBody>
                {data.hackerRegistereds.map((row, index) => (
                  <TableRow key={index} className="table-body">
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.competitionName}</TableCell>
                    <TableCell>
                      {weiToEth(row.requestedAmount.toString())} ETH
                    </TableCell>
                    <TableCell>
                      {weiToEth(row.receivedAmount.toString())} ETH
                    </TableCell>
                    <TableCell>
                      {row.prizePercentageForSponsor}% of the prize
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="border px-2 py-1 rounded-md w-full"
                        onChange={(e) =>
                          handleInputChange(row.hacker, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="shadow-md bg-white rounded-full px-8 table-button-text"
                        onClick={() => handleDonate(row.hacker)}
                      >
                        Donate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Tab>

        <Tab key="sponsored" title="Sponsored Hackers">
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <Table aria-label="Sponsored hackers" className="mt-4 bg-white">
              <TableHeader className="table-title">
                <TableColumn className="table-title lowercase">
                  HACKER NAME
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  HACKATHON NAME
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  REQUESTED AMOUNT
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  REWARD AMOUNT
                </TableColumn>
              </TableHeader>
              <TableBody>
                {sponsoredHackers.map((row, index) => (
                  <TableRow key={index} className="table-body">
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.competitionName}</TableCell>
                    <TableCell>{row.requestedAmount}</TableCell>
                    <TableCell>
                      {(row.totalPrize *
                        (row.prizePercentageForSponsor / 100)) /
                        Math.pow(10, 18)}{" "}
                      ETH
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
