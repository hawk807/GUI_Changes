
const Web3 = require('web3')
const BN = require("bn.js")


const credentials = require("./db/credentials.json")
const data = require("./db/configure.json")

const privateKey = credentials.privateKey.toString();
const address = credentials.address;
const RPC_URL = credentials.RPC.toString();

const HDWalletProvider = require('@truffle/hdwallet-provider')
const deployed_Contract = require('../build/contracts/Caller.json');
const wallet = require('./db/wallet.json')

const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))



const Transfer = async (_ethAmount) => {
    try {
        console.log(await web3.eth.getTransactionCount(address))

        web3.eth.sendTransaction({
            from: address,
            to: wallet,
            value: web3.utils.toWei(_ethAmount, "ether"),
            nonce: await web3.eth.getTransactionCount(address)
        })
            .then(function (receipt) {
                console.log("\x1b[32m%s\x1b[0m", `==========================================================================================================================\nSuccessfully transfered ${_ethAmount} Eth \nfrom: ${address} \nto: ${wallet}\n==========================================================================================================================\n`)
            }).then(() => {
                return;

            });
    } catch (err) {
        console.log(err)
        // nonceErrorFallback()

    }


}


async function nonceErrorFallback() {
    console.log(await web3.eth.getTransactionCount(address))
    web3.eth.sendTransaction({
        from: address,
        to: wallet,
        value: web3.utils.toWei(_ethAmount, "ether"),
        nonce: await web3.eth.getTransactionCount(address) + 1
    })
}

//Transfer("0.1")

module.exports = { Transfer }