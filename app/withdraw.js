
const Web3 = require('web3')
//require('dotenv').config()
const BN = require("bn.js")

//const { pair_token, wbnb, address, customslippage, factor, privateKey, RPC_URL } = process.env

const credentials = require("./db/credentials.json")
const data = require("./db/configure.json")

const privateKey = credentials.privateKey.toString();
const address = credentials.address;
const RPC_URL = credentials.RPC.toString();

const pair_token = data.target
const wbnb = data.pairtoken
const slippage = data.slippage
const blacklistCheck = data.blacklistCheck


const HDWalletProvider = require('@truffle/hdwallet-provider')
const deployed_Contract = require('../build/contracts/Caller.json');
const wallet = require('./db/wallet.json')
const DeployedRouter = require('../build/contracts/SnipeRouter.json');
const RouterAddress = DeployedRouter.networks[4].address
const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))

const { PCABI, ERCABI, PCaddress } = require('./abi')

async function withdraw() {
    const networkId = await web3.eth.net.getId();

    try {
        const myContract = await new web3.eth.Contract(deployed_Contract.abi, wallet)
        await myContract.methods.withdraw().send({ from: address }, (err, res) => {
            !err ? console.log(res) : console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
}
withdraw()


console.log('works')


