
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


const HDWalletProvider = require('@truffle/hdwallet-provider')
const deployed_Contract = require('../build/contracts/Caller.json');
const wallet = require('./db/wallet.json')


const DeployedRouter = require('../build/contracts/SnipeRouter.json');

const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))




const { ERCABI } = require('./abi')



async function sellFraction(_slippageonsell, _sellpercentage) {
    const ERC20 = await new web3.eth.Contract(ERCABI, pair_token);

    try {
        token_balance = await ERC20.methods.balanceOf(wallet).call()
        const myContract = await new web3.eth.Contract(deployed_Contract.abi, wallet)
        let result = []
        result = await myContract.methods.sellSafe(pair_token, wbnb, new BN(100 - _slippageonsell), new BN(_sellpercentage)).send({ from: address, gas: "600000", gasPrice: web3.utils.toWei("7", "gwei") }, async (r, s) => {
            if (!r) {
                console.log("\x1b[32m%s\x1b[0m", `==========================================================================================================================\nSuccessfully sold ${token_balance} \nRemaining tokens in the contract: ${await ERC20.methods.balanceOf(wallet).call()}`)
                web3.eth.getBalance(address).then((value) => console.log("\x1b[32m%s\x1b[0m", `\nYour new Eth balance: ${web3.utils.fromWei(value)}\n==========================================================================================================================\n`))

            }
        })
    } catch (err) {
        console.log(err)
    }
}



module.exports = { sellFraction }

