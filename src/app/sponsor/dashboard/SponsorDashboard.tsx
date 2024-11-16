'use client'

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react"
import glasses from '../../../../public/glasses_1.svg'
import Image from "next/image"

export default function SponsorDashboard() {
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
        {data.map((row, index) => (
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
              <Button size="sm" className={`shadow-md bg-white ${row.completenessProgress === 100 ? "table-button-text-disabled" : "table-button-text"}`} disabled={row.completenessProgress !== 100}>
                Support
              </Button>
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
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex flex-row gap-2 items-center justify-start p-4">
        <Image src={glasses} height={18} width={30} alt="glasses" />
        <h1 className="table-title">Hackers that need your help!</h1>
      </div>
      <div>
                  {renderFundraisingTable(fundraisingData)}
      </div>
      
      {/* <Tabs aria-label="Hackathon tabs" className="w-full bg-white" fullWidth>
        <Tab key="fundraising" title="My Fundraising Trip" className="font-londrina">

        </Tab>
        {/* <Tab key="sponsors" title="My Sponsored Hackathons" className="font-londrina">
          {renderSponsorsTable(sponsorsData)}
        </Tab> */}
      {/* </Tabs> */}
    </div>
  )
}