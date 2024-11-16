"use client";

import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { getHackathonCrowdFundingContract } from "@/app/lib/chainlink/contracts/hackathon-crowd-funding";
import { useEthersSigner } from "@/app/features/web3/wagmi/hooks/useEthersSigner";
import { ethers } from "ethers";

const HackerRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectDescription: "",
    requestedAmount: "",
    prizePercentageForSponsor: "",
  });

  const signer = useEthersSigner();

  const registerHacker = async () => {
    try {
      // Get contract instance
      const contract = getHackathonCrowdFundingContract(signer!);

      // Convert uint256 fields to appropriate format
      const requestedAmount = ethers.toBigInt(form.requestedAmount);
      const prizePercentageForSponsor = ethers.toBigInt(
        form.prizePercentageForSponsor
      );

      await contract.registerHacker(
        form.name,
        form.email,
        form.projectDescription,
        requestedAmount,
        prizePercentageForSponsor
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
      !form.email ||
      !form.projectDescription ||
      !form.requestedAmount ||
      !form.prizePercentageForSponsor
    ) {
      alert("Please fill in all fields!");
      return;
    }

    // Send form data (replace with your API call or handling logic)
    console.log("Form submitted:", form);

    registerHacker();
  };

  return (
    <div className="min-h-screen m-auto p-[20px] max-w-[600px] bg-black">
      <h1>Hacker Registration</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
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
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Project Description"
          name="projectDescription"
          placeholder="Describe your project"
          value={form.projectDescription}
          onChange={handleChange}
          required
        />
        <Input
          label="Requested Amount (in USD)"
          type="number"
          name="requestedAmount"
          placeholder="Enter the requested amount"
          value={form.requestedAmount}
          onChange={handleChange}
          required
        />
        <Input
          label="Prize Percentage for Sponsor (%)"
          type="number"
          name="prizePercentageForSponsor"
          placeholder="Enter percentage for sponsor"
          value={form.prizePercentageForSponsor}
          onChange={handleChange}
          required
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default HackerRegistration;
