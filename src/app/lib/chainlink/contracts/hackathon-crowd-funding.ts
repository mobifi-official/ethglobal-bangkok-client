import { ethers } from "ethers";

// Contract ABI and Address
export const HACKATHON_CROWDFUNDING_CONTRACT_ABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "bookingAccommodation",
    inputs: [{ name: "args", type: "string[]", internalType: "string[]" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "bookingStatus",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "claimPrize",
    inputs: [
      {
        name: "_hackerAddress",
        type: "address",
        internalType: "address payable",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositPrize",
    inputs: [
      { name: "_hackerAddress", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "fundHacker",
    inputs: [
      { name: "_hackerAddress", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getAllHackers",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hackers",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "email", type: "string", internalType: "string" },
      { name: "projectDescription", type: "string", internalType: "string" },
      { name: "hackerAddress", type: "address", internalType: "address" },
      { name: "requestedAmount", type: "uint256", internalType: "uint256" },
      { name: "receivedAmount", type: "uint256", internalType: "uint256" },
      {
        name: "prizePercentageForSponsor",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "exists", type: "bool", internalType: "bool" },
      { name: "lastRequestId", type: "bytes32", internalType: "bytes32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "handleOracleFulfillment",
    inputs: [
      { name: "requestId", type: "bytes32", internalType: "bytes32" },
      { name: "response", type: "bytes", internalType: "bytes" },
      { name: "err", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerHacker",
    inputs: [
      { name: "_name", type: "string", internalType: "string" },
      { name: "_email", type: "string", internalType: "string" },
      { name: "_projectDescription", type: "string", internalType: "string" },
      { name: "_requestedAmount", type: "uint256", internalType: "uint256" },
      {
        name: "_prizePercentageForSponsor",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestToHacker",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sponsorBalances",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "to", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BookingRequestSent",
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BookingResponseReceived",
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      { name: "success", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FundsWithdrawn",
    inputs: [
      {
        name: "hacker",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "HackerRegistered",
    inputs: [
      {
        name: "hacker",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "name", type: "string", indexed: false, internalType: "string" },
      {
        name: "requestedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferRequested",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PrizeDeposited",
    inputs: [
      {
        name: "hacker",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestFulfilled",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "bytes32" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestSent",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "bytes32" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SponsorFunded",
    inputs: [
      {
        name: "sponsor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "hacker",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "EmptyArgs", inputs: [] },
  { type: "error", name: "EmptySource", inputs: [] },
  { type: "error", name: "NoInlineSecrets", inputs: [] },
  { type: "error", name: "OnlyRouterCanFulfill", inputs: [] },
];

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_HACKER_CROWD_FUNDING_CONTRACT_ADDRESS!;

// Function to get the contract instance
export const getHackathonCrowdFundingContract = (
  signerOrProvider: ethers.Signer | ethers.Provider
) => {
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    HACKATHON_CROWDFUNDING_CONTRACT_ABI,
    signerOrProvider
  );
};

export const getListOfAllHackers = async (
  signerOrProvider: ethers.Signer | ethers.Provider
) => {
    let hackerAddresses = [];
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      HACKATHON_CROWDFUNDING_CONTRACT_ABI,
      signerOrProvider
    );
    hackerAddresses = await contract.getAllHackers();
    console.log("All Hackers:", hackerAddresses);

    return hackerAddresses;
  } catch (error) {
    console.log(`-->[[[ERROR-HACKER-LIST]]]<--`, error)
  }
};

export const fetchHackerDetails = async (
  hackerAddress: string,
  signerOrProvider: ethers.Signer | ethers.Provider
) => {
  try {
    // Create a contract instance
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      HACKATHON_CROWDFUNDING_CONTRACT_ABI,
      signerOrProvider
    );
    // Call the `hackers` getter with the user's address
    const hacker = await contract.hackers(hackerAddress);

    console.log("Hacker Details:", hacker);

    return {
      name: hacker.name,
      email: hacker.email,
      projectDescription: hacker.projectDescription,
      requestedAmount: ethers.formatUnits(hacker.requestedAmount, 18),
      prizePercentageForSponsor: hacker.prizePercentageForSponsor.toString(),
    };
  } catch (error) {
    console.error("Error fetching hacker details:", error);
    throw error;
  }
};
