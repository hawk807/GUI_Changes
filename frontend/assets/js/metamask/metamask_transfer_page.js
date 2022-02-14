

const transferBtn = document.getElementById('transferBtn');
transferBtn.addEventListener('click', async function (event) {
    let address;
    let uWallet;
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        address = accounts[0];
    }
    else {
        alert('In order to be able to use Blockinetics services, you need to have metamask installed')
    }
    uWallet = await fetch(`http://localhost:5000/web3/userWallet?sender="${address}"`, {
        method: 'GET'
    })

    let val = document.getElementById('amount').value;
    const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: uWallet.toString(), // Needs API-Call to backend // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        value: val, // Only required to send ether to the recipient from the initiating external account.
        data:
            '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    });
    // ipc.send('transfer-request', message)

})