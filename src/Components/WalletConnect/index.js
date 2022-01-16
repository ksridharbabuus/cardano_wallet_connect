import { useEffect, useState } from 'react';
import { Button, InputLabel } from '@material-ui/core';
import cbor from 'cbor';
// import * as wasm from '@emurgo/cardano-serialization-lib-browser';
// let CBOR = require('cbor-sync');

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

            // Get the Ada Balance & Other Asset Balances
            let balEncoded = await cardano.getBalance();
            let balArray = cbor.decode(await cardano.getBalance());
            console.log("balArray -- ", balArray);
            setWalletBalance(balArray[0]);

console.log("Keys - ", balArray[1]);


            // cardano.getBalance().then(res => {
            //     const balance = wasm.Value.from_bytes(Buffer.from(res, 'hex'));
            //     const lovelaces = balance.coin().to_str();
             
            //     console.log(lovelaces);
            //  });

// console.log("getCollateral -- ", await cardano.getCollateral());

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
          <InputLabel>Balance: {walletBalance}</InputLabel>
        </>);
        
      }
      return (<Button onClick={connectWallet} >Connect</Button>);
    
    }
  
    return (<WalletDetails></WalletDetails>);
  
  
  }


export default ConnectNamiWallet;