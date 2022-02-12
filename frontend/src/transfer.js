const electron = require('electron')
const ipc = electron.ipcRenderer
let cooldown = false;

function updateParams(tokenA, tokenB, blockchain) {
    //console.log(tokenB)
}


const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', async function (event) {
    if (!cooldown) {
        const { Transfer } = require('../app/transfer')
        let message = document.getElementById('amount').value;
        await Transfer(message)
    }

    // ipc.send('transfer-request', message)

})


const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function (event) {
    ipc.send('close-transfer')
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