const { Web3 } = require('web3');
const WEB3_CONSTANTS = require('./web3_constants');

const web3 = new Web3(new Web3.providers.WebsocketProvider(WEB3_CONSTANTS.PROVIDER_URL));
// const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_CONSTANTS.PROVIDER_URL));
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

const getRouletteResult = async (roulette_id) => {
    try {
        let account = getAccount();
        const result = await RoulettesContract.methods.getRouletteResult(roulette_id).call({from: account});
        console.log("RESULT IS: ", result);
        return result;

    } catch (e) {
        console.log("ROULETTE RESULT EXCEPTION: ", e);
        throw Error("Error getting the roulette result");
    }
}

const spinRoulette = async (roulette_id) => {
    try {
        let account = getAccount();
        const result = await RoulettesContract.methods.spinRoulette(roulette_id).call({from: account});
        console.log("SPIN RESULT IS: ", result);
        return result;

    } catch(e) {
        console.log("ROULETTE SPIN EXCEPTION: ", e);
        throw Error("Error spinning roulette.");
    }
}

const increaseOptionWeight = async (roulette_id, option_id, weight_increment) => {
    try {
        let account = getAccount();
        const ether_amount = weight_increment * 0.01;
        console.log("ETHER AMOUNT: ", ether_amount);
        const wei_amount = web3.utils.toWei(ether_amount, 'ether');
        console.log("WEI AMOUNT: ", wei_amount);
        console.log("CONTRACT METHODS: ", RoulettesContract.methods);

        let estimated_gas = await RoulettesContract.methods.betRouletteOption(roulette_id, option_id, weight_increment).estimateGas();
        console.log("Estimated gas is: ", estimated_gas);

        const increased = await RoulettesContract.methods.betRouletteOption(roulette_id, option_id, weight_increment).send({
            from: account,
            value: wei_amount,
            gas: 2000000,
            gasPrice: 10000000000,
        });
        return increased;

        // 99.9695

    } catch (e) {
        console.log("EXCEPTION INCREASE: ", e);
        throw Error("Error increasing option weight.")
    }
}

module.exports = {
    getRouletteOptions,
    getRouletteResult,
    increaseOptionWeight,
    spinRoulette
}