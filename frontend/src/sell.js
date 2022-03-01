
const planTier = 4;
let address;
let token;

const withdrawBtn = document.getElementById("withdrawBtn");
withdrawBtn.addEventListener('click', async function () {
    try {
        let { userWallet, balance } = await fetch(`http://localhost:5000/web3/userWallet?sender=${address}&tier=${planTier}`)
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: userWallet, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: '0x00', // Only required to send ether to the recipient from the initiating external account.
            data: "0x11ebbf24", // Optional, but used for defining smart contract creation and interaction.
            chainId: '1337', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        // Save User Wallet to the DataBase sending the hash, tier, and user back finding out the address and saving it to the db

        console.log(txHash)
    } catch (error) {
        console.log(error)

    }
})

/*
const electron = require('electron')
const ipc = electron.ipcRenderer
//const { sellFraction } = require('./sellFraction')



const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', async function (event) {
    const { sellFraction } = require('../app/sellFraction')
    let amount = document.getElementById('percentage').value;
    let slip = document.getElementById('slippage').value;

    await sellFraction(slip, amount)

    //ipc.send('sell-request', message)


})





const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function (event) {
    ipc.send('close-sell')
})



ipc.on('config', function (event, arg) {
    console.log(arg)
})
*/