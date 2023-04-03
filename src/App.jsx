//rainbowkit
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

//others
import merge from 'lodash.merge';
import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from 'react-router';

//components
import PrizePools from "./components/PrizePools.jsx"
import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"

//styles:
import './styles/index.css';

//ens

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

//rainbowkit theme:
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#8c52ff',
    accentColorForeground: '#8c52ff',
    connectButtonBackground:'#8c52ff',
    standby:'#8c52ff'
  },
} );

const App = () => {

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains} theme={myTheme}>
      <Navbar/>
        <Routes>
        <Route path="/PrizePools" element={<PrizePools />}> </Route>
        <Route path="/" element={<Home/>}></Route>
        </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;