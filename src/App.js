import logo from './logo.svg';
import './App.css';
import ConnectNamiWallet from "./Components/WalletConnect";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Click to connect to Nami Wallet:</h3>
        <ConnectNamiWallet />
      </header>
    </div>
  );
}

export default App;
