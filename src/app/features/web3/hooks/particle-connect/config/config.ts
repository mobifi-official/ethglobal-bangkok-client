import { createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { sepolia, type Chain } from "@particle-network/connectkit/chains";
// aa start
import { aa } from "@particle-network/connectkit/aa";
// aa end

//evm wallet start

import {
  coinbaseWallet,
  evmWalletConnectors,
  injected,
  walletConnect,
} from "@particle-network/connectkit/evm";

// evm wallet end

const PROJECT_ID = process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string;
const CLIENT_KEY = process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string;
const APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string;
const WALLETCONNECT_PROJECT_ID = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_ID as string;

const APP_IS_ON_MAINNET = process.env.NEXT_PUBLIC_NETWORK_IS_MAINNET === "true";

// Use the below object to specify the AA wallet provider we are going
// to use. Specify the name, as well as version used
const AA_PROVIDER_CONFIG = {
  name: "BICONOMY",
  version: "2.0.0",
};

if (!PROJECT_ID || !CLIENT_KEY || !APP_ID) {
  throw new Error("Please configure the Particle project in .env first!");
}

const supportChains: Chain[] = [sepolia];

// evm end

const config = createConfig({
  projectId: PROJECT_ID,
  clientKey: CLIENT_KEY,
  appId: APP_ID,
  appearance: {
    mode: "light",
    logo: "/detrip-logo.webp",

    //  optional, sort wallet connectors
    connectorsOrder: ["email", "phone", "social", "wallet"],
    splitEmailAndPhone: true,
    recommendedWallets: [
      { walletId: "metaMask", label: "Recommended" },
      { walletId: "coinbaseWallet", label: "Popular" },
      { walletId: "okxWallet", label: "Popular" },
    ],
    language: "en-US",
  },

  walletConnectors: [
    authWalletConnectors({
      // Optional, configure this if you're using social logins
      authTypes: ["email", "google", "apple", "twitter"],
      fiatCoin: "USD",
    }),

    // evm start
    evmWalletConnectors({
      metadata: {
        name: "DeTrip",
        icon:
          typeof window !== "undefined"
            ? `${window.location.origin}/favicon.ico`
            : "",
        description:
          "DeTrip invites crypto users and digital nomads to explore the world with ease. As a leading Web3 company supporting crypto payments, we offer access to over 2.4 million hotels worldwide at the best prices. Enjoy seamless, secure transactions, exclusive deals, and the opportunity to support local businesses. Embark on your next adventure with DeTrip and experience the convenience of booking with cryptocurrency today!",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
      // Optional, defines specific wallet connectors to be supported
      connectorFns: [
        // Most popular and reliable
        injected({ target: "metaMask" }),
        // Highly reliable, widely used
        coinbaseWallet(),
        // Growing with OKX users
        injected({ target: "okxWallet" }),
        // Popular for multi-chain support
        injected({ target: "trustWallet" }),
        // Widely used, supports many wallets
        walletConnect({
          projectId: WALLETCONNECT_PROJECT_ID,
          showQrModal: true,
        }),
        // Popular with Solana users
        injected({ target: "phantom" }),
        // Known for security, Binance endorsed
        injected({ target: "safePal" }),
        // Ethereum-focused, known for UX
        injected({ target: "rainbow" }),
        // Privacy-focused, gaining popularity
        injected({ target: "braveWallet" }),
        // Reliable for multi-chain support
        injected({ target: "exodus" }),
        // Popular in Asia, multi-chain support
        injected({ target: "mathWallet" }),
        // Popular in Asia, multi-chain
        injected({ target: "tokenPocket" }),
        // Security-focused, used in DeFi
        injected({ target: "imToken" }),
        // Integrated into Opera browser
        injected({ target: "opera" }),
        // Popular with KuCoin exchange users
        injected({ target: "kuCoinWallet" }),
        // Popular in the Asian market
        injected({ target: "bitKeep" }),
        // Gaining traction from Gamestop community
        injected({ target: "gamestop" }),
        // Known for multi-chain support
        injected({ target: "portal" }),
        // Specialized in DeFi
        injected({ target: "oneInchAndroidWallet" }),
        // Specialized in DeFi
        injected({ target: "oneInchIOSWallet" }),
        // Growing in popularity
        injected({ target: "apexWallet" }),
        // Niche developer circles
        injected({ target: "rabby" }),
        // Supports DeFi, multi-chain
        injected({ target: "xDEFI" }),
        // DeFi and investment tracking
        injected({ target: "zerion" }),
        // Growing in Asian market
        injected({ target: "coin98" }),
        // Specialized DeFi wallet
        injected({ target: "bifrost" }),
        // Security-focused, less popular
        injected({ target: "blockWallet" }),
        // DeFi and NFTs focused
        injected({ target: "backpack" }),
        // Regional growth, specific markets
        injected({ target: "hyperPay" }),
        // Still growing, less known
        injected({ target: "tally" }),
        // Specialized hardware and mobile wallet
        injected({ target: "onekey" }),
        // Bybit exchange users
        injected({ target: "bybitWallet" }),
        // Focused on DeFi users
        injected({ target: "frontier" }),
        // NFT-focused
        injected({ target: "bitski" }),
        // Niche, growing
        injected({ target: "dawn" }),
        // Privacy-focused, niche
        injected({ target: "status" }),
      ],
      // EIP-6963: Multi Injected Provider Discovery, default true.
      multiInjectedProviderDiscovery: true,
    }),
    // evm end
  ],
  plugins: [
    // embedded wallet start
    // wallet({
    //   visible: false,
    //   entryPosition: EntryPosition.BR,
    // }),
    // embedded wallet end

    // aa config start
    // With Passkey auth use Biconomy or Coinbase
    aa({
      name: AA_PROVIDER_CONFIG.name,
      version: AA_PROVIDER_CONFIG.version,
    }),
    // aa config end
  ],
  chains: supportChains as unknown as readonly [Chain, ...Chain[]],
});

export { config as particleConfig, AA_PROVIDER_CONFIG };
