"use client";

import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { getHackathonCrowdFundingContract } from "@/app/lib/chainlink/contracts/hackathon-crowd-funding";
import { useEthersSigner } from "@/app/features/web3/wagmi/hooks/useEthersSigner";
import { ethers } from "ethers";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import ConfirmationModal from "./ConfirmationModal";

const HackerRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    githubLink: "",
    email: "",
    foundingGoal: "",
    rewardSharingRatio: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const signer = useEthersSigner();

  const registerHacker = async () => {
    try {
      // Get contract instance
      const contract = getHackathonCrowdFundingContract(signer!);

      // Convert uint256 fields to appropriate format
      const foundingGoal = ethers.toBigInt(form.foundingGoal);
      const rewardSharingRatio = ethers.toBigInt(form.rewardSharingRatio);

      await contract.registerHacker(
        form.name,
        form.githubLink,
        form.email,
        foundingGoal,
        rewardSharingRatio
      );

      console.log(`===>[[SUCCESSFULLY-CALLED-REGISTER-HACKER]]<===`);
    } catch (error: any) {
      console.error("Error calling smart contract:", error);
      alert(error.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.githubLink ||
      !form.email ||
      !form.foundingGoal ||
      !form.rewardSharingRatio
    ) {
      alert("Please fill in all fields!");
      return;
    }

    // Send form data (replace with your API call or handling logic)
    console.log("Form submitted:", form);

    registerHacker();
    onOpen();
  };

  return (
    <div className="m-auto p-[20px] max-w-5xl bg-white">
      {/* <h1 className="text-3xl mb-10 font-bold">Hacker Registration</h1> */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <Image
            src="/glasses_1.svg"
            alt="Hacker Detail"
            width={50}
            height={50}
          />
          <h2 className="font-londrina text-2xl">Hacker Detail</h2>
        </div>
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="GitHub Link"
          name="githubLink"
          placeholder="Enter your GitHub link"
          value={form.githubLink}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <div className="flex items-center gap-2">
          <Image
            src="/glasses_2.svg"
            alt="Founding Detail"
            width={50}
            height={50}
          />
          <h2 className="font-londrina text-2xl">Founding Detail</h2>
        </div>

        <Input
          label="Founding Goal (in USD)"
          type="number"
          name="foundingGoal"
          placeholder="Enter the requested amount"
          value={form.foundingGoal}
          onChange={handleChange}
          required
        />
        <Input
          label="Reward Sharing Ratio (%)"
          type="number"
          name="rewardSharingRatio"
          placeholder="Enter percentage for sponsor"
          value={form.rewardSharingRatio}
          onChange={handleChange}
          required
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
        <ConfirmationModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </form>
    </div>
  );
};

export default HackerRegistration;
