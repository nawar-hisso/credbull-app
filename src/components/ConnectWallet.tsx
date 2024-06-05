import React from "react";
import { ethers } from "ethers";

interface Props {
  setSigner: (signer: any) => void;
  setAddress: (address: string) => void;
  address: string;
}

const ConnectWallet: React.FC<Props> = ({ setSigner, setAddress, address }) => {
  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={connectWallet}>
      {address ? address : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;
