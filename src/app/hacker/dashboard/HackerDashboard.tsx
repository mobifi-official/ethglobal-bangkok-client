"use client";

import { Tabs, Tab } from "@nextui-org/react";
import glasses from "../../../../public/glasses_1.svg";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

export interface HackathonData {
  name: string;
  email: string;
  githubLink: number;
  competitionName: string;
  requestedAmount: number;
  receivedAmount: number;
  prizePercentageForSponsor: number;
  sponsorList: any[];
}

const query = gql`
  {
    hackerRegistereds(first: 5) {
      id
      hacker
      competitionName
      name
      requestedAmount
      receivedAmount
      prizePercentageForSponsor
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/94957/ethbangkok/version/latest";

export default function HackerDashboard() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery<{ hackerRegistereds: HackathonData[] }>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  if (!data || !data.hackerRegistereds) return null;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-row gap-2 items-center justify-start p-4">
        <Image src={glasses} height={18} width={30} alt="glasses" />
        <h1 className="table-title">Trip and Sponsorships</h1>
      </div>

      <Tabs aria-label="Hackathon tabs" className="w-full">
        <Tab key="fundraising" title="My Fundraising Trip">
          <Table
            aria-label="Hackathon details table"
            className="mt-4 table-title bg-white"
          >
            <TableHeader className="table-title">
              <TableColumn>HACKER NAME</TableColumn>
              <TableColumn>COMPETITION NAME</TableColumn>
              <TableColumn>TRAVEL BUDGET</TableColumn>
              <TableColumn>COMPLETENESS</TableColumn>
              <TableColumn>NUMBER OF SPONSORS</TableColumn>
              <TableColumn aria-label="Book Trip Column">{""}</TableColumn>
            </TableHeader>
            <TableBody>
              {data.hackerRegistereds.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.competitionName}</TableCell>
                  <TableCell>{row.requestedAmount}</TableCell>
                  <TableCell>
                    {row.receivedAmount / row.requestedAmount}%
                  </TableCell>
                  <TableCell>{row.sponsorList?.length}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="table-button-text shadow-md bg-white"
                    >
                      Book my Trip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Tab>
        <Tab key="sponsored" title="My Sponsored Hackathon">
          {/* <DataTable data={sponsoredData} /> */}
        </Tab>
      </Tabs>
    </div>
  );
}
