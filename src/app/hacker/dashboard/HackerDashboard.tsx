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
import { 
  IconButton, 
  Badge, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Divider 
} from '@mui/material'
import { useState } from "react"
import HotelDetail from "./components/HotelDetail"

export default function HackerDashboard() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const [open, setOpen] = useState(false);
  const { data } = useQuery<{
    sponsorFundeds: SponsorFundedData[];
    hackerRegistereds: HackathonData[];
  }>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  console.log("data here", data)


  // if (!data || !data.hackerRegistereds || !data.sponsorFundeds) return null;

  const filteredSponsorFundeds = (hackerAddress: string) =>
    data?.sponsorFundeds?.filter(
      (sponsorFunded) => sponsorFunded.hacker === hackerAddress
    );


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const status = 
    {funded: "Funded", in_progress: "Trip booked and hacking in progress", reward_distributed: "Reward distributed", not_funded: "Not funded"}
  
  const fundraisingData = [
    {
      hackathonName: "ETHGlobal BangKok",
      travelBudget: "$500",
      completeness: 100,
      completenessProgress: 100,
      status: status.funded,
      numberOfSponsors: 4
    },
    {
      hackathonName: "ETHGlobal New York",
      travelBudget: "$400",
      completeness: 100,
      completenessProgress: 70,
      status: status.in_progress,
      numberOfSponsors: 1
    },
    {
      hackathonName: "ETHGlobal Paris",
      travelBudget: "$500",
      completeness: 100,
      completenessProgress: 20,
      status: status.not_funded,
      numberOfSponsors: 0
    },
  ]

  const sponsorsData = [
    {
      hackathonName: "ETHGlobal BangKok",
      hackerName: "Alice Johnson",
      travelBudget: "$500",
      mySponsorship: "$100",
      completeness: 80,
      status: "In Progress",
      // status: status.reward_distributed,
      rewardAmount: 50
    },
    {
      hackathonName: "ETHGlobal New York",
      hackerName: "Bob Smith",
      travelBudget: "$400",
      mySponsorship: "$200",
      completeness: 100,
      status: "Completed",
      rewardAmount: 100
    },
    {
      hackathonName: "ETHGlobal Paris",
      hackerName: "Charlie Brown",
      travelBudget: "$600",
      mySponsorship: "$150",
      completeness: 50,
      status: "In Progress",
      rewardAmount: 0
    },
  ]

  const renderFundraisingTable = (data: typeof fundraisingData) => (
    <Table aria-label="Fundraising details table" className="mt-4 bg-white">
      <TableHeader className="table-title">
        <TableColumn className="table-title lowercase">HACKATHON NAME</TableColumn>
        <TableColumn className="table-title lowercase">TRAVEL BUDGET</TableColumn>
        <TableColumn className="table-title lowercase">COMPLETENESS</TableColumn>
        <TableColumn className="table-title lowercase">STATUS</TableColumn>
        <TableColumn className="table-title lowercase">NUMBER OF SPONSORS</TableColumn>
        <TableColumn aria-label="Book Trip Column">{""}</TableColumn>
      </TableHeader>
      <TableBody>
        {data?.map((row, index) => (
          <TableRow key={index} className="table-body">
            <TableCell>{row.hackathonName}</TableCell>
            <TableCell>{row.travelBudget}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span>{row.completenessProgress}%</span>
              </div>
            </TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.numberOfSponsors}</TableCell>
            <TableCell>
              {row.status ===status.funded || row.status === status.not_funded ? (
              <Button size="sm" className={`shadow-md bg-white ${row.completenessProgress !== 100 ? "table-button-text-disabled" : "table-button-text"}`}  onClick={handleOpen}> 
              {/* disabled={row.completenessProgress !== 100} */}
                Book the Trip
              </Button>
              ) : (
              <Button size="sm" className={`shadow-md bg-white ${row.completenessProgress !== 100 ? "table-button-text-disabled" : "table-button-text"}`} disabled={row.completenessProgress !== 100}>
                Claim
              </Button>
              )}
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderSponsorsTable = (data: typeof sponsorsData) => (
    <Table aria-label="Sponsors details table" className="mt-4 bg-white">
      <TableHeader className="table-title">
        <TableColumn className="table-title lowercase">HACKATHON NAME</TableColumn>
        <TableColumn className="table-title lowercase">HACKER NAME</TableColumn>
        <TableColumn className="table-title lowercase">TRAVEL BUDGET</TableColumn>
        <TableColumn className="table-title lowercase">MY SPONSORSHIP</TableColumn>
        <TableColumn className="table-title lowercase">COMPLETENESS</TableColumn>
        <TableColumn className="table-title lowercase">STATUS</TableColumn>
        <TableColumn className="table-title lowercase">REWARD AMOUNT</TableColumn>
        <TableColumn aria-label="Claim Column">{""}</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index} className="table-body">
            <TableCell>{row.hackathonName}</TableCell>
            <TableCell>{row.hackerName}</TableCell>
            <TableCell>{row.travelBudget}</TableCell>
            <TableCell>{row.mySponsorship}</TableCell>
            <TableCell>{row.completeness}%</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>${row.rewardAmount}</TableCell>
            <TableCell>
              <Button size="sm" className={`shadow-md bg-white rounded-full px-8 ${row.rewardAmount < 1 ? "table-button-text-disabled" : "table-button-text"}`} disabled={row.rewardAmount < 1}>
                Claim
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <>
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
                    {filteredSponsorFundeds(row.hacker)?.length}
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
                      onClick={handleOpen}
                    >
                      Book my Trip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Tab>
        <Tab key="sponsors" title="My Sponsored Hackathons" className="font-londrina">
          {renderSponsorsTable(sponsorsData)}
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {/* <DialogTitle className="text-[18px] font-londrina">Trips and Sponsorships</DialogTitle> */}
        <DialogContent>
          <div className="flex flex-col justify-between h-80">
            {/* <p className="text-[100px] font-bold font-londrina whitespace-nowrap">Test Hotel Info</p> */}
            <HotelDetail />
            <div className="flex justify-center">
              <Button size="sm" className={`shadow-md bg-white rounded-full px-8 font-londrina w-auto`}>
                Confirm
              </Button>
            </div>
            
          </div>
        </DialogContent>
      </Dialog>
    </>

  )
}
