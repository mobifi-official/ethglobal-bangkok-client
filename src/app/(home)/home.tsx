"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  getSponsoredHackerFunctionsConsumer,
  SPONSORED_HACKER_CONTRACT_ABI,
} from "../lib/chainlink/contracts/sponsored-hacker-contract";

import LoginStatusComponent from "../features/authentication/components/LoginStatusComponent";
import { fetchSource } from "../lib/chainlink/utils/chainlink-utils";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../features/web3/wagmi/hooks/useEthersSigner";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const signer = useEthersSigner();
  const { address } = useAccount();
  22;

  const router = useRouter();

  useEffect(() => {
    const listenToResponseEvent = async () => {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
      );

      const contractAddress =
        process.env.NEXT_PUBLIC_SPONSORED_HACKER_CONTRACT_ADDRESS!;

      const contract = new ethers.Contract(
        contractAddress,
        SPONSORED_HACKER_CONTRACT_ABI,
        provider
      );

      contract.on("Response", (requestId, response, err) => {
        alert(`SOME RESPONSE RECEIVED!`);
        console.log("Event Received:");
        console.log("Request ID:", requestId);

        console.log("RAW-RESPONSE", ethers.toUtf8String(response));
        console.log("Error:", ethers.toUtf8String(err));
      });

      console.log("Listening to Response events...");
    };

    listenToResponseEvent();

    // Cleanup listener on unmount
    return () => {
      // provider.removeAllListeners("Response");
    };
  }, []);

  const callExternalAPI = async () => {
    try {
      // Get contract instance
      const contract = getSponsoredHackerFunctionsConsumer(signer!);

      const subscriptionID = Number(
        process.env.NEXT_PUBLIC_CHAINLINK_SEPOLIA_SUBSCRIPTION_ID
      );

      const source = await fetchSource({ fileName: "test-get-source.js" });
      console.log("Fetched source:", source);

      await contract.sendRequest(source, subscriptionID, ["1"]);
    } catch (error: any) {
      console.error("Error calling smart contract:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen -mt-[170px] items-center justify-center">
      <Card className="w-full max-w-md" isHoverable isPressable>
        <CardHeader>
          <p className="text-center">Smart Contract Interaction</p>
        </CardHeader>
        <CardBody>
          <LoginStatusComponent />
          <p className="mt-4">{`Connected To: ${
            address || "Not connected"
          }`}</p>
          {address && (
            <>
              <Button className="mt-4" size="lg" onClick={callExternalAPI}>
                Call Function
              </Button>
              <Button
                className="mt-4"
                size="lg"
                color="primary"
                onClick={() => router.push("hacker/registration")}
              >
                Register Hacker
              </Button>
            </>
          )}
        </CardBody>
        <CardFooter className="flex justify-center">
          <p>Powered by Chainlink & Ethers.js</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
