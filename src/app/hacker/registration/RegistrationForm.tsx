"use client";

import React, { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { getHackathonCrowdFundingContract } from "@/app/lib/chainlink/contracts/hackathon-crowd-funding";
import { useEthersSigner } from "@/app/features/web3/wagmi/hooks/useEthersSigner";
import { ethers } from "ethers";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import ConfirmationModal from "./ConfirmationModal";
import { signIn, signOut } from "next-auth/react";

const RegistrationForm = ({ username }: { username?: string }) => {
  const [form, setForm] = useState({
    name: "",
    competitionName: "",
    githubLink: "",
    email: "",
    requestedAmount: "",
    prizePercentageForSponsor: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        form.competitionName,
        form.githubLink,
        form.email,
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
      !form.competitionName ||
      !form.githubLink ||
      !form.email ||
      !form.requestedAmount ||
      !form.prizePercentageForSponsor
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
        label="Your Name"
        type="text"
        name="name"
        placeholder="What's your name?"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Competition Name"
        type="text"
        name="competitionName"
        placeholder="What competition are you entering?"
        value={form.competitionName}
        onChange={handleChange}
        required
      />

      <div className="flex items-center">
        <Input
          label="GitHub Link"
          name="githubLink"
          placeholder="Please login to your GitHub"
          value={username ? "github.com/" + username : ""}
          onChange={handleChange}
          disabled
          required
        />
        <button
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.238-.008-.868-.013-1.704-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.53 1.031 1.53 1.031.892 1.529 2.341 1.087 2.91.831.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.11-4.555-4.94 0-1.091.39-1.983 1.03-2.681-.103-.254-.447-1.274.098-2.656 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.845c.853.004 1.71.115 2.51.337 1.91-1.294 2.75-1.025 2.75-1.025.545 1.382.202 2.402.1 2.656.64.698 1.029 1.59 1.029 2.681 0 3.841-2.337 4.683-4.566 4.932.359.31.678.923.678 1.86 0 1.344-.012 2.426-.012 2.754 0 .267.18.576.688.478A10.015 10.015 0 0022 12c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with GitHub
        </button>
      </div>
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
        name="requestedAmount"
        placeholder="Enter the requested amount"
        value={form.requestedAmount}
        onChange={handleChange}
        required
      />
      <Input
        label="Reward Sharing Ratio (%)"
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
      <ConfirmationModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </form>
  );
};

export default RegistrationForm;
