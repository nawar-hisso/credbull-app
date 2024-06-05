import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { abi as vaultAbi } from "../abi/CredBullVault.json";
import { abi as tokenAbi } from "../abi/CredBullToken.json";

interface Props {
  signer: any;
  address: string;
}

const Deposit: React.FC<Props> = ({ signer, address }) => {
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [buttonTitle, setButtonTitle] = useState<string>("Deposit");
  const [allowance, setAllowance] = useState<number>(0);

  const tokenContractAddress =
    import.meta.env.VITE_CREDBULL_TOKEN_ADDRESS ||
    "0xE5a25C884834abC78B031DdAdc169481E0D06173";
  const vaultContractAddress =
    import.meta.env.VITE_CREDBULL_VAULT_ADDRESS ||
    "0x09a49ed78643439531B1D344EdEa5FfDD92cA6eF";

  const tokenContract = useMemo(
    () => new ethers.Contract(tokenContractAddress, tokenAbi, signer),
    [tokenContractAddress, signer]
  );

  const vaultContract = new ethers.Contract(
    vaultContractAddress,
    vaultAbi,
    signer
  );

  useEffect(() => {
    const checkAllowance = async () => {
      const _allowance = await tokenContract.allowance(
        address,
        vaultContractAddress
      );

      setAllowance(Number(ethers.formatEther(_allowance)));
    };

    checkAllowance();
  }, [address, tokenContract]);

  useEffect(() => {
    if (allowance < amount) {
      setButtonTitle("Approve");
    } else {
      setButtonTitle("Deposit");
    }
  }, [allowance, amount]);

  const deposit = async () => {
    try {
      if (allowance < amount) {
        const approveTx = await tokenContract.approve(
          vaultContractAddress,
          ethers.parseEther(amount.toString())
        );
        await approveTx.wait();
      }

      const depositTx = await vaultContract.deposit(
        ethers.parseEther(amount.toString()),
        address
      );
      await depositTx.wait();

      setStatus("Deposit successful");
    } catch (error) {
      console.error(error);
      setStatus("Error making deposit");
    }
  };

  return (
    <div>
      <h2>Deposit</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={deposit}>{buttonTitle}</button>
      <p>{status}</p>
    </div>
  );
};

export default Deposit;
