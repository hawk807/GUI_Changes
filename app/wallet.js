
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

const DeployedRouter = require('../build/contracts/SnipeRouter.json');
const RouterAddress = DeployedRouter.networks[4].address
const web3 = new Web3(new HDWalletProvider(privateKey, RPC_URL))
console.log(RouterAddress)

const fs = require('fs')
const path = require('path')
const process = require('process');
const { kill } = require('process');



async function setWallet(_addr) {
    try {
        const CC = await new web3.eth.Contract(DeployedRouter.abi, RouterAddress);
        await CC.methods.setWalletContract(_addr).send({
            from: address, gas: "800000", gasPrice: web3.utils.toWei("10", "gwei")
        }, (e, s) => {
            console.log(s)
        }).on('receipt', function (receipt) {
            console.log(receipt);
        })
    } catch (err) {
        console.log(err)
    }



}
//setWallet("0x1c8eC295eEBCfC4F59eC02738cad4cBB3a1e02D8")


async function createWallet() {
    try {
        let wallet;
        const CC = await new web3.eth.Contract(DeployedRouter.abi, RouterAddress);
        await CC.methods.createAccount().send({
            from: address, gas: "300000", gasPrice: web3.utils.toWei("10", "gwei")
        }, async (error, hash) => {

            return hash;
        })

    } catch (err) {
        console.log(err)
    }


    setTimeout(() => {
        console.log(`Killing process ${process.pid}`);
        kill(process.pid);
    }, 10000);
}

//0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea


async function getWalletAddress() {
    try {
        const CC = await new web3.eth.Contract(DeployedRouter.abi, RouterAddress);
        await CC.methods.getAccount(address).call({ from: address }, async (e, s) => {
            let data = JSON.stringify(s.toString())
            let location = path.resolve('app', 'db', './wallet.json')
            console.log("\x1b[32m%s\x1b[0m", location)

            fs.writeFile(location, data, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                    console.log("The written has the following contents:");
                    console.log(fs.readFileSync(location, "utf8"));
                }
            });


        })
    } catch (err) {
    }

}




createWallet().then(() => {
    getWalletAddress()
})

