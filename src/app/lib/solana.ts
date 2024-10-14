import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';

const keypair = Keypair.generate();

export interface SolanaAccount {
  publicKey: PublicKey;
  balance: number;
}

export const connectSolana = async (): Promise<SolanaAccount> => {
  const key = keypair.publicKey.toBase58();
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const publicKey = new PublicKey(key);

  const balance = await connection.getBalance(publicKey);
  console.log('Solana balance:', balance);

  return { publicKey, balance };
};
