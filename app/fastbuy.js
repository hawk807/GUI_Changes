
const Web3 = require('web3')
const BN = require("bn.js")


const credentials = require("./db/credentials.json")
const data = require("./db/configure.json")

const privateKey = credentials.privateKey.toString();
const address = credentials.address;
const RPC_URL = credentials.RPC.toString();

const pair_token = data.target
const wbnb = data.pairtoken
const slippage = data.slippage
const blacklistCheck = data.blacklistCheck

let adjustedSlippage = 100 - parseFloat(slippage)
console.log(adjustedSlippage)

const HDWalletProvider = require('@truffle/hdwallet-provider')
const deployed_Contract = require('../build/contracts/Caller.json');
const wallet = require('./db/wallet.json')


const DeployedRouter = require('../build/contracts/SnipeRouter.json');

const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))



console.log(blacklistCheck)

async function fastbuy() {
    try {
        const CC = await new web3.eth.Contract(deployed_Contract.abi, wallet);
        await CC.methods.Buy(wbnb, pair_token, adjustedSlippage, blacklistCheck).send({
            from: address, gas: "800000", gasPrice: web3.utils.toWei("10", "gwei")
        }, (e, s) => {
            console.log(s)
        })
    } catch (err) {
        console.log(err)
    }

}
fastbuy()

