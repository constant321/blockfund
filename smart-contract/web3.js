import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and meta mask is installed
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server *OR* meta mask is not running
  // creating our own provider
  const provider = new Web3.providers.HttpProvider(
    'https://sepolia.infura.io/v3/08b47ddd11c3416ba917e4797ab0567a'
  );

  web3 = new Web3(provider);
}

export default web3;
