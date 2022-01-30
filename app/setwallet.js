
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
const caller = deployed_Contract.networks[4].address

const DeployedRouter = require('../build/contracts/SnipeRouter.json');
const RouterAddress = DeployedRouter.networks[4].address

const LogicContract = require('../build/contracts/Logic.json');
const Logic = deployed_Contract.networks[4].address

const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))
console.log("Router: " + RouterAddress)

const fs = require('fs')
const path = require('path')
const process = require('process');
const { kill } = require('process');




async function setWallet(_addr, _smaker) {
    try {
        const CC = await new web3.eth.Contract(DeployedRouter.abi, RouterAddress);
        await CC.methods.setWalletContract(_addr).send({
            from: address, gas: "800000", gasPrice: web3.utils.toWei("10", "gwei")
        }, (e, s) => {
            if (s) console.log("Upgrade successful")
        }).on('receipt', function (receipt) {
        })
        await CC.methods.setswapMaker("0xfA0Aaf0f734A5aD8519187C631CCcf37e227BCEC").send({ from: address, gasPrice: web3.utils.toWei("10", "gwei") }, (e, s) => {
            if (s) {
                console.log('succesfully upgraded the swapmaker')
            }
        })
    } catch (err) {
        console.log(err)
    }
}


console.log("Master-Wallet: " + caller)
setWallet(caller, Logic)