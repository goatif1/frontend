const { Web3 } = require('web3');
const WEB3_CONSTANTS = require('./web3_constants');

const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_CONSTANTS.PROVIDER_URL));
web3.eth.Contract.handleRevert = true;

const roulettes_abi = require("./abi/RoulettesContractAbi.json");
const { getAccount } = require('../utils/access');
const RoulettesContract = new web3.eth.Contract(roulettes_abi, WEB3_CONSTANTS.ROULETTES_CONTRACT_ADDRESS);

const getRouletteOptions = async (roulette_id) => {
    try {
        let account = getAccount();
        const options = await RoulettesContract.methods.getRouletteOptions(roulette_id).call({from: account});
        return options;

    } catch (e) {
        console.log("EXCEPTION IN SC SEND: ", e);
        throw Error("Error getting roulette options.")
    }
}

module.exports = {
    getRouletteOptions
}