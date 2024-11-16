"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  getSponsoredHackerFunctionsConsumer,
  SPONSORED_HACKER_CONTRACT_ABI,
} from "../lib/chainlink/contracts/sponsored-hacker-contract";

import { useEthersSigner } from "../features/web3/hooks/useEthersSigner";
import { useAccount } from "@particle-network/connectkit";
import LoginButton from "../features/authentication/components/LoginButton";
import LoginStatusComponent from "../features/authentication/components/LoginStatusComponent";
import { fetchSource } from "../lib/chainlink/utils/chainlink-utils";

const Home: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const { signer } = useEthersSigner();
  const { address } = useAccount();
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

       await contract.sendRequest(source, subscriptionID, [
        "1",
      ]);
   
    } catch (error: any) {
      console.error("Error calling smart contract:", error);
      alert(error.message);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#F6F6F6]">
      <p className="text-black">Smart Contract Interaction</p>
      <LoginStatusComponent />
      <p className="text-black">{`Connected To: ${address}`}</p>

      {address && (
        <button onClick={callExternalAPI} className="text-black">
          Call Function
        </button>
      )}
      {address && result && <p className="text-black">Result: {result}</p>}
    </main>
  );
};

export default Home;
