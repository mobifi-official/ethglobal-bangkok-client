import React from "react";
import HackerDashboard from "./HackerDashboard";
import { gql, request } from "graphql-request";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
      <HackerDashboard />
    </HydrationBoundary>
  );
};

export default page;
