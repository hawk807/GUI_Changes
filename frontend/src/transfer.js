
let address;
async function getUser() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        address = accounts[0];
    }
    else {
        alert('In order to be able to use Blockinetics services, you need to have metamask installed')
    }
}



const transferBtn = document.getElementById('transferBtn');
transferBtn.addEventListener('click', async function (event) {
    try {



        let uWallet = await fetch(`http://localhost:5000/web3/userWallet?address=${address}&tier=1`, {
            method: 'GET'
        })

        console.log(address)

        let val = await document.getElementById('amount').value;

        web3.eth.sendTransaction(
            {
                from: address,
                to: "0xD13d3a25D3357AB523f601Ce2bcf2F2052682eDF",//uWallet.toString(),
                value: (val * Math.pow(10, 18).toString()),
                chainId: ethereum.networkVersion
            },
            (error, result) => {
                if (error) {
                    return console.error(error);
                }
                // Handle the result
                console.log(result);
            }
        );


        /*
        
            const transactionParameters = {
                nonce: '0x00', // ignored by MetaMask
                gasPrice: '0x5208', // customizable by user during MetaMask confirmation.
                gas: '0x2710', // customizable by user during MetaMask confirmation.
                to: address, // Required except during contract publications.
                from: ethereum.selectedAddress, // must match user's active address.
                value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                data:
                    '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
                chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
            };
        */
        //let val = document.getElementById('amount').value;
        //console.log(val.toString('hex'))

        /*
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: "0x5064eaf1170F7d8A2C05936398374c3d420CDbF1",//uWallet.toString(), // Needs API-Call to backend // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: "0x40", // Only required to send ether to the recipient from the initiating external account.
            // data:'0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            //chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };


        // txHash is a hex string
        // As with any RPC call, it may throw an error

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        */

        // ipc.send('transfer-request', message)
    } catch (error) {
        console.log(error)
    }

})


/*

//let cooldown = false;

function updateParams(tokenA, tokenB, blockchain) {
    //console.log(tokenB)
}


const transferBtn = document.getElementById('transferBtn');
transferBtn.addEventListener('click', async function (event) {
    if (!cooldown) {
        const { Transfer } = require('../app/transfer')
        let message = document.getElementById('amount').value;
        await Transfer(message)
    }

    // ipc.send('transfer-request', message)

})





const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', async function (event) {
    if (!cooldown) {
        const { Transfer } = require('../app/transfer')
        let message = document.getElementById('amount').value;
        await Transfer(message)
    }

    // ipc.send('transfer-request', message)

})





document.querySelectorAll('.transferBtn').forEach(function (e) {
    e.addEventListener('click', function () {
        if (this.id.toString() == "updateBtn") {
            this.style.backgroundColor = "#c4c3d0"
            cooldown = true;
            setTimeout(() => {
                cooldown = false;
                this.style.backgroundColor = "#99cc33"
            }, 10000);
        }
    })
});


ipc.on('config', function (event, arg) {
    console.log(arg)
})

*/