
const Web3 = require('web3')
//require('dotenv').config()
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
const caller = deployed_Contract.networks[4].address
const wallet = require('./db/wallet.json')

const DeployedRouter = require('../build/contracts/SnipeRouter.json');
const RouterAddress = DeployedRouter.networks[4].address
const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))
console.log("Router: " + RouterAddress)

const fs = require('fs')
const path = require('path')
const process = require('process');
const { kill } = require('process');

console.log(address)

async function getWalletAddress() {
    try {
        const CC = await new web3.eth.Contract(deployed_Contract.abi, wallet);
        await CC.methods.owner().call({ from: address }, (e, s) => {
            console.log(s)
        })
    } catch (err) {
        console.log(err)
    }

}


getWalletAddress()