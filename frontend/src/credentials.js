const electron = require('electron')
const ipc = electron.ipcRenderer

let cooldown = false;



const updateBtn = document.getElementById('saveBtn');
updateBtn.addEventListener('click', function (event) {
    let message = new Array
    let tokenA = document.getElementById('address').value;
    let tokenB = document.getElementById('pk').value;
    let RPC = document.getElementById('RPC').value;
    message.push(tokenA)
    message.push(tokenB)
    message.push(RPC)
    ipc.send('update-credentials', message)

})



const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function (event) {
    ipc.send('close-credentials')
})

const activateBtn = document.getElementById('activateBtn');
activateBtn.addEventListener('click', function (event) {
    if (!cooldown) {
        ipc.send('create-wallet')
    }
})

document.querySelectorAll('.walletBtn').forEach(function (e) {
    e.addEventListener('click', function () {
        if (this.id.toString() == "activateBtn") {
            this.style.backgroundColor = "#c4c3d0"
            cooldown = true;

        }
    })
});

