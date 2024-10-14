import { BrowserProvider, Signer } from 'ethers';

export const connectEthereum = async (): Promise<Signer | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      console.log('Ethereum account:', await signer.getAddress());
      return signer;
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
      return null;
    }
  } else {
    console.error('Ethereum wallet not found');
    return null;
  }
};
