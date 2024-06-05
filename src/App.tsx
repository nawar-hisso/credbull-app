import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import WhitelistManager from "./components/WhitelistManager";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";

function App() {
  const [signer, setSigner] = useState<any>(null);
  const [address, setAddress] = useState<string>("");

  return (
    <div className="App">
      <h1>CredBull Vault</h1>
      <ConnectWallet
        setSigner={setSigner}
        setAddress={setAddress}
        address={address}
      />
      {signer && <WhitelistManager signer={signer} />}
      {signer && <Deposit signer={signer} address={address} />}
      {signer && <Withdraw signer={signer} address={address} />}
    </div>
  );
}

export default App;
