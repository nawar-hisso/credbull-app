import React, { useState } from "react";
import { ethers } from "ethers";
import { abi as vaultAbi } from "../abi/CredBullVault.json";

interface Props {
  signer: any;
  address: string;
}

const Withdraw: React.FC<Props> = ({ signer, address }) => {
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const contractAddress = "0x09a49ed78643439531B1D344EdEa5FfDD92cA6eF";
  const vaultContract = new ethers.Contract(contractAddress, vaultAbi, signer);

  const withdraw = async () => {
    try {
      const tx = await vaultContract.withdraw(
        ethers.parseEther(amount.toString()),
        address,
        address
      );
      await tx.wait();
      setStatus("Withdrawal successful");
    } catch (error) {
      console.error(error);
      setStatus("Error making withdrawal");
    }
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={withdraw}>Withdraw</button>
      <p>{status}</p>
    </div>
  );
};

export default Withdraw;
