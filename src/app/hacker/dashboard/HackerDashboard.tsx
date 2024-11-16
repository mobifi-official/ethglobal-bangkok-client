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
  email?: string;
  hacker: string;
  githubLink: number;
  competitionName: string;
  requestedAmount: number;
  receivedAmount: number;
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
      prizePercentageForSponsor
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/94957/ethbangkok/version/latest";

export default function HackerDashboard() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery<{
    sponsorFundeds: SponsorFundedData[];
    hackerRegistereds: HackathonData[];
  }>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  if (!data || !data.hackerRegistereds || !data.sponsorFundeds) return null;

  const filteredSponsorFundeds = (hackerAddress: string) =>
    data.sponsorFundeds.filter(
      (sponsorFunded) => sponsorFunded.hacker === hackerAddress
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-row gap-2 items-center justify-start p-4">
        <Image src={glasses} height={18} width={30} alt="glasses" />
        <h1 className="table-title">Trip and Sponsorships</h1>
      </div>

      <Tabs aria-label="Hackathon tabs" className="w-full bg-white" fullWidth>
        <Tab key="fundraising" title="My Fundraising Trip">
          <Table aria-label="Hackathon details table" className="mt-4 bg-white">
            <TableHeader className="table-title">
              <TableColumn className="table-title lowercase">
                HACKER NAME
              </TableColumn>
              <TableColumn className="table-title lowercase">
                COMPETITION NAME
              </TableColumn>
              <TableColumn className="table-title lowercase">
                TRAVEL BUDGET
              </TableColumn>
              <TableColumn className="table-title lowercase">
                COMPLETENESS
              </TableColumn>
              <TableColumn className="table-title lowercase">
                NUMBER OF SPONSORS
              </TableColumn>
              <TableColumn aria-label="Book Trip Column">{""}</TableColumn>
            </TableHeader>
            <TableBody>
              {data.hackerRegistereds.map((row, index) => (
                <TableRow key={index} className="table-body">
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.competitionName}</TableCell>
                  <TableCell>{row.requestedAmount}</TableCell>
                  <TableCell>
                    {row.receivedAmount / row.requestedAmount}%
                  </TableCell>
                  <TableCell>
                    {filteredSponsorFundeds(row.hacker).length}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className={` shadow-md bg-white ${
                        row.receivedAmount / row.requestedAmount < 100
                          ? "table-button-text-disabled"
                          : "table-button-text"
                      }`}
                      disabled={row.receivedAmount / row.requestedAmount < 100}
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
      <style jsx>{`
        :global(.nextui-tabs-panel) {
          width: 100%;
        }
        :global(.nextui-tabs-tablist) {
          width: 100%;
        }
        :global(.nextui-tabs-tab[data-selected="true"]) {
          background-color: white !important;
        }
        :global(.nextui-tabs-tab) {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
