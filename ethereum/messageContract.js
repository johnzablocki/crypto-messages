import web3 from './web3';
import CompiledContract from './build/MessageInABottle.json';

const instance = new web3.eth.Contract(
    JSON.parse(CompiledContract.interface),
    '0xD31e53305Acd547dbb7660f230A239725173291a'
);

export default instance;
