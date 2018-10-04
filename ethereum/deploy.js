const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const compiledContract = require('./build/MessageInABottle');

const provider = new HDWalletProvider(
    'iron oxygen spring fat vote slide doctor prefer emotion series current slam',
    'http://127.0.0.1:7545'
);
const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from ' + accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({
            data: '0x' + compiledContract.bytecode,
            arguments: ['Ciao, mondo di eth']
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    console.log(`Deployed to ${result.options.address}`);
};

deploy();




