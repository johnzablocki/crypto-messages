const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const compiledContract = require('../ethereum/build/MessageInABottle');

let messageInABottle;
let accounts;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    messageInABottle = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
                    .deploy({
                        data: compiledContract.bytecode,
                        arguments: ['Hello, eth world!']
                    })
                    .send({
                        from: accounts[0],
                        gas: '1000000'
                    });

});

describe('Messages', async () => {
    it('deploys the contract', async () => {
        assert(messageInABottle.options.address);
    });

    it('sets message to initial message', async () => {
        const message = await messageInABottle.methods.message().call();
        assert.equal(message, 'Hello, eth world!');
    });

    it('changes message', async () => {
        await messageInABottle.methods
                .setMessage('Ciao, mondo di eth').send({
                    from: accounts[0],
                    value: '101'
                });
        const message = await messageInABottle.methods.message().call();
        assert.equal(message, 'Ciao, mondo di eth');
    });

    it('fails changing message when value too low', async () => {
        let err;
        try {
            await messageInABottle.methods
                .setMessage('Ciao, mondo di eth').send({
                    from: accounts[0],
                    value: '99'
                });
        } catch(e) {
            err = e;
        }
        assert.ok(err);
    });

    it('adds to owners balance', async () => {
        const balanceBefore = await web3.eth.getBalance(accounts[0]);
        const beforeInEther = parseFloat(web3.utils.fromWei(balanceBefore, 'ether'));

        await messageInABottle.methods
            .setMessage('Ciao, mondo di eth').send({
                from: accounts[1],
                value: '1001'
            });

        const balanceAfter = await web3.eth.getBalance(accounts[0]);
        const afterInEther = parseFloat(web3.utils.fromWei(balanceAfter, 'ether'));
        assert(afterInEther > beforeInEther);
    });
});
