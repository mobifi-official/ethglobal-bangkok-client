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

export default function HackerDashboard() {
  const fundraisingData = [
    {
      hackathonName: "ETHGlobal BangKok",
      travelBudget: "$500",
      completeness: 100,
      completenessProgress: 100,
      numberOfSponsors: 4
    },
    {
        hackathonName: "ETHGlobal BangKok",
        travelBudget: "$400",
        completeness: 100,
        completenessProgress: 70,
        numberOfSponsors: 1
      },
      {
        hackathonName: "ETHGlobal BangKok",
        travelBudget: "$500",
        completeness: 100,
        completenessProgress: 20,
        numberOfSponsors: 0
      },
  ]

  const sponsoredData = [
    {
      hackathonName: "Example Hackathon",
      travelBudget: "$300",
      completeness: 75,
      completenessProgress: 75,
      numberOfSponsors: 8
    },
  ]

  const renderTable = (data: typeof fundraisingData) => (
    <Table aria-label="Hackathon details table" className="mt-4 table-title bg-white">
      <TableHeader className="table-title">
        <TableColumn>HACKATHON NAME</TableColumn>
        <TableColumn>TRAVEL BUDGET</TableColumn>
        <TableColumn>COMPLETENESS</TableColumn>
        <TableColumn>NUMBER OF SPONSORS</TableColumn>
        <TableColumn aria-label="Book Trip Column">{""}</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.hackathonName}</TableCell>
            <TableCell>{row.travelBudget}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span>{row.completenessProgress}%</span>
              </div>
            </TableCell>
            <TableCell>{row.numberOfSponsors}</TableCell>
            <TableCell>
              <Button  size="sm" className="table-button-text shadow-md bg-white">
                Book my Trip
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
            <h1 className="table-title">Trip and Sponsorships</h1>
        </div>
      
      <Tabs aria-label="Hackathon tabs" className="w-full">
        <Tab key="fundraising" title="My Fundraising Trip">
          {renderTable(fundraisingData)}
        </Tab>
        <Tab key="sponsored" title="My Sponsored Hackathon">
          {renderTable(sponsoredData)}
        </Tab>
      </Tabs>
    </div>
  )
}