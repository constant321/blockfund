CrowdFund : Crowdfunding Platform Powered by Ethereum Blockchain

## Problem Statement and Necessity 
Crowdfunding is one of the most popular ways to raise funds for any project, cause or for helping any individual in need.

The major problems with the Current Crowdfunding Platforms that we wanted to solve were : 
- Security : As the funds become larger, they need to be heavily secure, although stringent measures such as symmetric encryption are in place to make e-payment safe and secure,it is still vulnerable to hacking. Blockchain — which has never been compromised yet — can provide that level of security.
- Transparency : We have seen, and continue to see a lot of crowdfunding scams happening around. There is no way to see where the funds are being used. We wanted to make the entire flow of funds transparent at every stage, so that there is no possibility of the money being misused.
- Global contribution : With some of the platforms being country specific, it becomes hard for people from other countries to contribute to various campaigns. Using blockchain anyone in the world can contribute to the campaign. Transactions are quick and convenient.

## Tech Stack 
- Next JS
- Chakra UI
- Solidity
- Web3.js

## Deploy your own Contract 
1. Create an account in [https://infura.io](https://infura.io/)
2. Create .env file in smart-contract directory and add these line to it.
	> mnemonic = metamask private key <br>
	link = infura end point link
3. Do the Changes that you want to do inside the Solidity File
4. Compile the Contract 
    `node compile.js`
5. Deploy Contract by going into smart-contract Directory and run 
    `node deploy.js`
	
   Copy the contract deploy address and replace it in `factory.js` file.
  
6. Replace your "infura end point link" in following files
    > smart-contract/web3.js <br>
    pages/_app.js
	
## To run the application locally
- Clone the Project 
- run `yarn install` to install all the dependencies
- run `yarn dev` to run the application locally

## Prerequisites to create Campaign and Contribute
1. Install **Metamask** as Google Chrome Extension and Create an account.
2. Get free ether by giving the ethereum address <br>`(https://sepolia-faucet.pk910.de/)`
