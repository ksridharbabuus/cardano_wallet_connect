import { useEffect, useState } from 'react';
import { Button, InputLabel } from '@material-ui/core';
let CBOR = require('cbor-sync');

const ConnectNamiWallet = () => {

    const [isWaletConnected, setWalletConnectStatus] = useState(false);
    const [networkId, setNetworkId] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [walletUnUsedAddress, setWalletUnUsedAddress] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
  
  
    useEffect(() => {
  
       async function setWalletState() {
        if(window.cardano) {
            let cardano = window.cardano;
      
            setNetworkId(cardano.getNetworkId())
            setWalletAddress(await cardano.getUsedAddresses());
            setWalletUnUsedAddress(await cardano.getUnusedAddresses());
            setWalletBalance(await cardano.getBalance());
          }
       }
       setWalletState();
  
  
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
          <InputLabel>Wallet (UnUsed): {walletUnUsedAddress}</InputLabel>
          <InputLabel>Balance: {CBOR.decode(walletBalance, 'hex')} ({walletBalance})</InputLabel>
        </>);
        
      }
      return (<Button onClick={connectWallet} >Connect</Button>);
    
    }
  
    return (<WalletDetails></WalletDetails>);
  
  
  }


export default ConnectNamiWallet;