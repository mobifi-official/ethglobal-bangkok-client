'use client'

import { Tabs, Tab } from "@nextui-org/react"
import glasses from "../../../../public/glasses_1.svg"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { gql, request } from "graphql-request"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react"
import { Dialog, DialogContent } from "@mui/material"
import { useState } from "react"
import HotelDetail from "./components/HotelDetail"
import WithdrawPrizeButton from "./components/WithdrawPrize"
// import WithdrawPrizeButton from './withdraw-prize-button'

export interface HackathonData {
  totalPrize: number;
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
      totalPrize
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/94957/ethbangkok/version/latest";
export interface SponsorFundedData {
  hacker: string;
  sponsor: string;
}
export default function HackerDashboard() {
  const [open, setOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery<{
    sponsorFundeds: SponsorFundedData[];
    hackerRegistereds: HackathonData[];
  }>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleWithdrawSuccess = () => {
    refetch()
  }
  console.log("data here---------------", data);

  if (!data || !data.hackerRegistereds || !data.sponsorFundeds)
    return <div>No data available</div>

  const filteredSponsorFundeds = (hackerAddress: string) =>
    data?.sponsorFundeds?.filter(
      (sponsorFunded) => sponsorFunded.hacker === hackerAddress
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
            {isLoading ? (
              <div>Loading....</div>
            ) : (
              <Table
                aria-label="Hackathon details table"
                className="mt-4 bg-white"
              >
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
                {data && (
                  <TableBody>
                    {data &&
                      data?.hackerRegistereds?.map((row, index) => (
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
                              disabled={
                                row.receivedAmount / row.requestedAmount < 100
                              }
                              onClick={handleOpen}
                            >
                              Book my Trip
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
            )}
          </Tab>
          <Tab
            key="sponsors"
            title="My Sponsored Hackathons"
            className="font-londrina"
          >
            <Table
              aria-label="Hackathon details table"
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
                  TRAVEL BUDGET
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  MY SPONSORSHIP
                </TableColumn>
                <TableColumn className="table-title lowercase">
                  REWARD AMOUNT
                </TableColumn>
                <TableColumn aria-label="Withdraw Prize Column">{""}</TableColumn>
              </TableHeader>
              <TableBody>
                {data.hackerRegistereds.map((row, index) => (
                  <TableRow key={index} className="table-body">
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.competitionName}</TableCell>
                    <TableCell>{row.requestedAmount}</TableCell>
                    <TableCell>{row.receivedAmount}</TableCell>
                    <TableCell>{row.totalPrize}</TableCell>
                    <TableCell>
                      <WithdrawPrizeButton
                        disabled={row.totalPrize < 1}
                        totalPrize={row.totalPrize}
                        onWithdrawSuccess={handleWithdrawSuccess}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        <DialogContent>
          <div className="flex flex-col justify-between h-80">
            <HotelDetail />
            <div className="flex justify-center">
              <Button
                size="sm"
                className={`shadow-md bg-white rounded-full px-8 font-londrina w-auto`}
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}