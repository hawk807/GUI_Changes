
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
const l_address = deployed_Contract.networks[4].address

const DeployedRouter = require('../build/contracts/SnipeRouter.json');
const RouterAddress = DeployedRouter.networks[4].address
const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))
const creds = require("../app/db/credentials.json")
const { ERCABI } = require('./abi')






async function updateTradeData() {
    if (creds.RPC != '') {

        try {
            const Web3 = require('web3')
            const fetchWeb3 = new Web3(creds.RPC.toString());
            console.log(creds.RPC.toString())
            let tokenAContract = await new fetchWeb3.eth.Contract(ERCABI, wbnb);
            console.log(await tokenAContract.methods.decimals().call({ from: creds.address }))


        } catch (error) {
            console.log(error)

        }




    }
    else {
        return
    }
    //  document.getElementById("wbnb").innerHTML
}

updateTradeData()