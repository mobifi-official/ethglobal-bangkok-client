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
    {
        hackathonName: "Example Hackathon",
        travelBudget: "$300",
        completeness: 75,
        completenessProgress: 75,
        numberOfSponsors: 8
      },
      {
        hackathonName: "Example Hackathon",
        travelBudget: "$300",
        completeness: 75,
        completenessProgress: 75,
        numberOfSponsors: 8
      },
  ]

  const renderTable = (data: typeof fundraisingData) => (
    <Table aria-label="Hackathon details table" className="mt-4  bg-white">
      <TableHeader className="table-title">
        <TableColumn className="table-title lowercase">HACKATHON NAME</TableColumn>
        <TableColumn className="table-title lowercase">TRAVEL BUDGET</TableColumn>
        <TableColumn className="table-title lowercase">COMPLETENESS</TableColumn>
        <TableColumn className="table-title lowercase">NUMBER OF SPONSORS</TableColumn>
        <TableColumn aria-label="Book Trip Column">{""}</TableColumn>
      </TableHeader>
      <TableBody >
        {data.map((row, index) => (
          <TableRow key={index} className="table-body">
            <TableCell>{row.hackathonName}</TableCell>
            <TableCell>{row.travelBudget}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span>{row.completenessProgress}%</span>
              </div>
            </TableCell>
            <TableCell>{row.numberOfSponsors}</TableCell>
            <TableCell>
              <Button  size="sm" className={` shadow-md bg-white ${row.completenessProgress !== 100 ? "table-button-text-disabled" : "table-button-text"}`} disabled={row.completenessProgress !== 100}>
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
      
        <Tabs aria-label="Hackathon tabs" className="w-full bg-white" fullWidth >
        <Tab key="fundraising" title="My Fundraising Trip" className="font-londrina">
          {renderTable(fundraisingData)}
        </Tab>
        <Tab key="sponsored" title="My Sponsored Hackathon" className="font-londrina">
          {renderTable(sponsoredData)}
        </Tab>
      </Tabs>
      <style jsx>{`
        :global(.nextui-tabs-panel) {
          width: 100%;
        }
        :global(.nextui-tabs-tablist) {
          width: 100%;
        }
        :global(.nextui-tabs-tab[data-selected=true]) {
          background-color: white !important;
        }
        :global(.nextui-tabs-tab) {
          flex: 1;
        }
      `}</style>
    </div>
  )
}