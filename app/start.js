
const Web3 = require('web3')
//require('dotenv').config()
const BN = require("bn.js")
var net = require('net');

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

const INSIDER = "0xD281ba9E206f6ecD4c7F8649F81839D55025725A";


const HDWalletProvider = require('@truffle/hdwallet-provider')
const deployed_Contract = require('../build/contracts/Caller.json');
const wallet = require('./db/wallet.json')



/*
var PIPE_NAME = "mypipe";
var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;

var L = console.log;

var server = net.createServer(function (stream) {
    L('Server: on connection')

    stream.on('data', function (c) {
        L('Server: on data:', c.toString());
    });

    stream.on('end', function () {
        L('Server: on end')
        server.close();
    });

    stream.write('Take it easy!');
});

server.on('close', function () {
    L('Server: on close');
})

server.listen(PIPE_PATH, function () {
    L('Server: on listening');
})
*/
const DeployedRouter = require('../build/contracts/SnipeRouter.json');

const web3 = new Web3(RPC_URL)

let count = 0;
const mempoolsubscription = async () => {
    try {
        await web3.eth.subscribe('pendingTransactions', async function (error, output) {
            let result = await web3.eth.getTransaction(output);
            switch (true) {
                case (result === null):
                    break;

                case (result.from.toLowerCase() == (INSIDER).toLowerCase() && result.value == 0):
                    sendTxwithGasPrice(result, "Deployer Address")
                    //console.log(/*"\x1b[32m%s\x1b[0m",*/ "Insider made a move")
                    break;

                case (result.input.slice(0, 10) == "0xf305d719"):
                    if (result.input.toUpperCase().includes(pair_token.slice(2, 94).toUpperCase())) {
                        sendTxwithGasPrice(result, "AddLiquidityETH")
                        //console.log(/*"\x1b[32m%s\x1b[0m",*/ "x")

                    }
                    break;
                case (result.input.slice(0, 10) == "0xe8e33700"):
                    if (result.input.toUpperCase().includes(pair_token.slice(2, 94).toUpperCase())) {
                        sendTxwithGasPrice(result, "AddLiquidity")
                        //console.log(/*"\x1b[32m%s\x1b[0m",*/ "Liquidity was added to the target")
                    }
                    break;

                case result.input.slice(0, 10) == "0xa8bca566":
                    sendTxwithGasPrice(result, "Finalize")
                    break;

                default:

                    console.log(/*"\x1b[31m%s\x1b[0m", */ `No liquidity added on transaction  ${output} `)
                    break;
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}



const sendTxwithGasPrice = async (_result, event) => {
    try {

        const web3_backrun = new Web3(new HDWalletProvider(privateKey, RPC_URL))
        const CC = await new web3_backrun.eth.Contract(deployed_Contract.abi, wallet);
        await CC.methods.Buy(wbnb, pair_token, slippage, blacklistCheck).send({ from: address, gas: "1300000", gasPrice: _result.gasPrice }, async (err, res) => {
            if (!err) {
                console.log(`Transaction out,\nHash: ${res},\nEvent: Mempool - ${event}`)
            }
        })


    } catch (e) {
        console.log(e)
    }
}
mempoolsubscription()

