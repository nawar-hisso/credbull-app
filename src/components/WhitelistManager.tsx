import React, { useState } from "react";
import { ethers } from "ethers";
import { abi as vaultAbi } from "../abi/CredBullVault.json";

interface Props {
  signer: any;
}

const WhitelistManager: React.FC<Props> = ({ signer }) => {
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const contractAddress =
    import.meta.env.VITE_CREDBULL_TOKEN_ADDRESS ||
    "0x09a49ed78643439531B1D344EdEa5FfDD92cA6eF";
  const vaultContract = new ethers.Contract(contractAddress, vaultAbi, signer);

  const addToWhitelist = async () => {
    try {
      const tx = await vaultContract.addToWhitelist(address);
      await tx.wait();
      setStatus("Address added to whitelist");
    } catch (error) {
      console.error(error);
      setStatus("Error adding to whitelist");
    }
  };

  const removeFromWhitelist = async () => {
    try {
      const tx = await vaultContract.removeFromWhitelist(address);
      await tx.wait();
      setStatus("Address removed from whitelist");
    } catch (error) {
      console.error(error);
      setStatus("Error removing from whitelist");
    }
  };

  return (
    <div>
      <h2>Whitelist Manager</h2>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={addToWhitelist}>Add to Whitelist</button>
      <button onClick={removeFromWhitelist}>Remove from Whitelist</button>
      <p>{status}</p>
    </div>
  );
};

export default WhitelistManager;
