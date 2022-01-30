
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



let rand = 0
let Buystop = false
const EmergencySnipe = async () => {
    setInterval(async function () {

        try {
            const CC = await new web3.eth.Contract(deployed_Contract.abi, l_address);
            const ROUTER = await new web3.eth.Contract(DeployedRouter.abi,
                RouterAddress);
            //process.stdout.write(process.pid)
            //console.log(process.pid)
            await ROUTER.methods.getAmountOutMin(wbnb, pair_token, "100000").call(async (err, res) => {
                res != 0 && res != undefined ? rand = 1 : console.log("\x1b[31m%s\x1b[0m", "<<< There is no liquidity yet >>>\n")
                if (res != 0 && res != undefined) {
                    console.log("\x1b[31m%s\x1b[0m", '==========================================================================================================================\n BUYING ON FIRST BLOCK\n==========================================================================================================================\n')
                    Buystop == false ? CC.methods.Buy(pair_token, wbnb, slippage, blacklistCheck).send({
                        from: address, gas: "800000", gasPrice: web3.utils.toWei("20", "gwei")
                    }) : console.log("\x1b[31m%s\x1b[0m", 'Already sent, preventing duplicate buy-orders...\n ')
                    Buystop = true
                }
            })
        } catch (err) {

        }
    }, 1000)

}

EmergencySnipe()
