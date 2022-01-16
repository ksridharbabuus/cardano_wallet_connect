import { useEffect, useState } from 'react';
import { Button, InputLabel } from '@material-ui/core';

import logo from './logo.svg';
import './App.css';


const ConnectNamiWallet = () => {

  const [isWaletConnected, setWalletConnectStatus] = useState(false);
  const [networkId, setNetworkId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);


  useEffect(async () => {

    if(window.cardano) {
      let cardano = window.cardano;

      setNetworkId(cardano.getNetworkId())
      setWalletAddress(await cardano.getUsedAddresses());
      setWalletBalance(parseInt(await cardano.getBalance(), 16));
    }
    


  }, [isWaletConnected]);


  const connectWallet = async () => {
    if(window.cardano) {

      // Enable the Nami Wallet
      let cardano = window.cardano;
      await cardano.enable();
      setWalletConnectStatus(true);
    }
  }

  const WalletDetails = () => {

    if(isWaletConnected) {
  
      return (
      <>
        <InputLabel>Network: {networkId === "1" ? "Mainnet" : "Testnet"}</InputLabel>
        <InputLabel>Wallet: {walletAddress}</InputLabel>
        <InputLabel>Balance: {walletBalance} </InputLabel>
      </>);
      
    }
    return (<Button onClick={connectWallet} >Connect</Button>);
  
  }

  return (<WalletDetails></WalletDetails>);


}





function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        
        <ConnectNamiWallet />
      </header>
    </div>
  );
}

export default App;
