"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import glasses from "../../../../public/glasses_1.svg";
import Image from "next/image";
import { useState } from "react";

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
      totalPrize
      prizePercentageForSponsor
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/94957/ethbangkok/version/latest";

export default function SponsorDashboard() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data, isLoading } = useQuery<{
    sponsorFundeds: SponsorFundedData[];
    hackerRegistereds: HackathonData[];
  }>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  if (!data || !data.hackerRegistereds || !data.sponsorFundeds)
    return <div>No data available</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-row gap-2 items-center justify-start p-4">
        <Image src={glasses} height={18} width={30} alt="glasses" />
        <h1 className="table-title">Hackers that need your help!</h1>
      </div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Table aria-label="Sponsors details table" className="mt-4 bg-white">
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
            <TableColumn aria-label="Claim Column">{""}</TableColumn>
          </TableHeader>
          {data && (
            <TableBody>
              {data &&
                data?.hackerRegistereds?.map((row, index) => (
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
                    <TableCell>
                      <Button
                        size="sm"
                        className={`shadow-md bg-white rounded-full px-8 ${
                          row.totalPrize < 1
                            ? "table-button-text-disabled"
                            : "table-button-text"
                        }`}
                        disabled={row.totalPrize < 1}
                      >
                        Claim
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      )}
    </div>
  );
}
