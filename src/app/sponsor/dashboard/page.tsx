import React from "react";
import { gql, request } from "graphql-request";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SponsorDashboard from "./SponsorDashboard";

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
      receivedAmount
      requestedAmount
      totalPrize
      prizePercentageForSponsor
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/94957/ethbangkok/version/latest";

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SponsorDashboard />
    </HydrationBoundary>
  );
};

export default page;
