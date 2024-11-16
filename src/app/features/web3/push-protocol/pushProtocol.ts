import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";


const CHANNEL_ADDRESS = '0xaad4aCF57b7b438Fa607255aaFb183664f80cE14';

export const sendNotification = async (
  signer: ethers.Signer,
  recipientAddress: string,
  title: string,
  body: string
) => {
  try {
    if (!signer || typeof signer.getAddress !== 'function') {
      throw new Error('Invalid signer object');
    }

    const userAddress = await signer.getAddress();
    console.log('Sender address:', userAddress);

    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title,
        body
      },
      payload: {
        title,
        body,
        cta: '',
        img: ''
      },
      recipients: `eip155:11155111:${recipientAddress}`, // recipient address
      channel: `eip155:11155111:${CHANNEL_ADDRESS}`, // your channel address
      env: PushAPI.CONSTANTS.ENV.STAGING
    });

    return apiResponse;
  } catch (err) {
    console.error('Error in sendNotification:', err);
    throw err;
  }
};

export const getNotifications = async (userAddress: string) => {
  try {
    const notifications = await PushAPI.user.getFeeds({
      user: `eip155:11155111:${userAddress}`, // user address in CAIP
      env: PushAPI.CONSTANTS.ENV.STAGING
    });

    return notifications;
  } catch (err) {
    console.error('Error in getNotifications:', err);
    throw err;
  }
};

// New function to opt-in to the channel
export const optInToChannel = async (signer: ethers.Signer) => {
  try {
    const userAddress = await signer.getAddress();
    
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: `eip155:11155111:${CHANNEL_ADDRESS}`, // channel address in CAIP
      userAddress: `eip155:11155111:${userAddress}`, // user address in CAIP
      onSuccess: () => {
        console.log('opt in success');
      },
      onError: () => {
        console.error('opt in error');
      },
      env: PushAPI.CONSTANTS.ENV.STAGING
    });

    console.log('Successfully opted in to the channel');
  } catch (err) {
    console.error('Error in optInToChannel:', err);
    throw err;
  }
};

// New function to check if a user is subscribed to the channel
// export const isSubscribed = async (userAddress: string) => {
//   try {
//     const subscriptions = await PushAPI.user.getSubscriptions({
//       user: `eip155:11155111:${userAddress}`, // user address in CAIP
//       env: PushAPI.CONSTANTS.ENV.STAGING
//     });

//     return subscriptions.some(sub => sub.channel.toLowerCase() === CHANNEL_ADDRESS.toLowerCase());
//   } catch (err) {
//     console.error('Error in isSubscribed:', err);
//     throw err;
//   }
// };