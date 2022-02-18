let address;

function val() {
    d = document.getElementById("select_id").value;
}

async function getUser() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        address = accounts[0];
        console.log(address)
    }
    else {
        alert('In order to be able to use Blockinetics services, you need to have metamask installed')
    }
}
//getUser()

const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', async function (event) {
    console.log('clicked')
    try {
        let performCheck
        let tokenA = await document.getElementById('tokenA').value;
        let tokenB = await document.getElementById('tokenB').value;
        let slippage = await document.getElementById('slippage').value;
        let bl = document.getElementById("select_id").value
        //console.log(bl, tokenA, tokenB, slippage)
        bl == 0 ? performCheck = false : performCheck = true;

        if (typeof (JSON.parse(slippage)) != 'number' || slippage >= 100) {
            alert('Slippage must be a Number smaller than 100')
            return;
        }

        //let RPC = document.getElementById('RPC').value;
        // All of the params - where to get the data from, four different src folders ?, for four different tiers a new one ? 
        await fetch(`http://localhost:5000/tierOne`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "sender": address,
                "subTier": 1,
                "mode": true,
                "action": "tax",
                "platform": "Blockinetics",
                "tokenA": tokenA.toString(),
                "tokenB": tokenB.toString(),
                "slippage": Number(slippage),
                "checkBL": performCheck,
                "active": false // false by default true on start
            })
        })

    } catch (error) {

        console.log(error)
    }

})

