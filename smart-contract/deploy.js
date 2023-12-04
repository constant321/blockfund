const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();


const provider = new HDWalletProvider(
    process.env.mnemonic,
    process.env.link
);
// const provider = new HDWalletProvider(
//     "0f93b52c29f1b6ee169973dbfcb57b00acbe9f80e0e02eef945b2aa43e744bd2",
//     "https://goerli.infura.io/v3/08b47ddd11c3416ba917e4797ab0567a"
// );
console.log('11111',provider);
const web3 = new Web3(provider);

const deploy = async () => {
    console.log('222222');
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts', accounts);
    console.log('Attemping to deploy to accounts ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0] });

    console.log('Contract deploy to ', result.options.address);
};

deploy();