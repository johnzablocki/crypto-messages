# Crytpo Message in a Bottle

Simple Ethereum Smart Contract and Daap Demo.  Part of the walk through for my Programming the Ethereum Blockchain talk.

To get up and running, follow the dependency installations @ https://github.com/jzablocki/crypto-hot-or-not.

```
git clone https://github.com/jzablocki/crytpo-messages
cd crytpo-messages
node ethereum/compile.js # or node ethereum\compile.js on Windows
node ethereum/deploy.js # or node ethereum\deploy.js on Windows
yarn install #or nmp install if you have npm installed and not yarn
yarn run dev #or npm run dev
```

To test against the Ganache test node, you will need to deploy the contract to that node.  That step requires two changes to this codebase.

1. Replace the mnemonic on line 6 of `deploy.js` with the mnemonic found at the top of the Ganache GUI.

2. Replace the contract address in `messageContract.js` with the address that is logged to the screen when you run the deploy script.
