import { ethers, type Eip1193Provider } from "ethers";
import { useEffect, useState } from "react";
import { useWallets } from "@particle-network/connectkit";

/**
 * useEthersSigner - A custom hook to obtain an ethers.js signer from a Particle Network wallet.
 * 
 * @returns {object} An object containing the ethers.js signer (if available).
 */
export function useEthersSigner() {
    // Retrieve the connected wallets from the Particle ConnectKit
    const wallets = useWallets();
    
    // State to store the ethers.js signer
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>();

    /**
     * Effect hook to process and set the ethers.js signer whenever the wallets array changes.
     */
    useEffect(() => {
        // If there are no connected wallets, reset the signer state to undefined
        if (wallets.length === 0) {
            setSigner(undefined);
            return;
        }

        // Get the first wallet in the list (primary wallet)
        const [primaryWallet] = wallets;

        /**
         * Asynchronous function to process and set the ethers.js signer from the primary wallet.
         */
        const processSigner = async () => {
            try {
                // Retrieve the provider (EIP1193Provider) from the primary wallet
                const EOAprovider = await primaryWallet.connector.getProvider();
                
                // Create a custom ethers.js provider using the BrowserProvider and the wallet's provider
                const customProvider = new ethers.BrowserProvider(EOAprovider as Eip1193Provider, 'any');
                
                // Obtain the signer (EOA) from the custom ethers provider
                const newSigner = await customProvider.getSigner();
                
                // Update the state with the new signer
                setSigner(newSigner);
            } catch (error) {
                // Log any errors that occur during the signer creation process
                                
                // Reset the signer state to undefined if an error occurs
                setSigner(undefined);
            }
        };

        // Call the processSigner function to set up the signer
        processSigner();
    }, [wallets]); // Re-run this effect whenever the `wallets` array changes

    // Return an object containing the ethers.js signer
    return {
        signer
    };
}
