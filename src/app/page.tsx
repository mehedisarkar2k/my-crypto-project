'use client';

import { useEffect, useState } from 'react';
import { connectSolana, SolanaAccount } from './lib/solana';
import { connectEthereum } from './lib/ethereum';
import WarningModal from '@/components/WarningModal';
import Loader from '@/components/Loader';

export default function Home() {
  const [ethAccount, setEthAccount] = useState<string | null>(null);
  const [solAccount, setSolAccount] = useState<SolanaAccount | null>(null);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connectWallets = async () => {
      setLoading(true);
      if (typeof window.ethereum === 'undefined') {
        setIsMetaMaskAvailable(false);
        setLoading(false);
        return;
      }

      const ethSigner = await connectEthereum();
      if (ethSigner) {
        setEthAccount(await ethSigner.getAddress());
      }

      const solData = await connectSolana();
      setSolAccount(solData);

      setLoading(false);
    };

    connectWallets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      {!isMetaMaskAvailable && <WarningModal />}

      {loading ? (
        <Loader />
      ) : (
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-8">Multi-Chain Wallet</h1>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {/* Ethereum Card */}
            <div className="glassmorphism-card">
              <h2 className="text-2xl font-semibold mb-4">Ethereum</h2>
              {ethAccount ? (
                <p className="text-lg">Account: {ethAccount}</p>
              ) : (
                <p className="text-lg">Not connected</p>
              )}
            </div>

            {/* Solana Card */}
            <div className="glassmorphism-card">
              <h2 className="text-2xl font-semibold mb-4">Solana</h2>
              {solAccount ? (
                <p className="text-lg">
                  Balance: {solAccount.balance} lamports
                </p>
              ) : (
                <p className="text-lg">Not connected</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
