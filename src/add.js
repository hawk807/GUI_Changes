const electron = require('electron')
const ipc = electron.ipcRenderer



function updateParams(tokenA, tokenB, blockchain) {
    //console.log(tokenB)
}

function val() {
    d = document.getElementById("select_id").value;
}


const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', function (event) {
    let message = new Array
    let tokenA = document.getElementById('tokenA').value;
    let tokenB = document.getElementById('tokenB').value;
    let slippage = document.getElementById('slippage').value;
    let bl = document.getElementById("select_id").value
    message.push(tokenA)
    message.push(tokenB)
    message.push(slippage)
    message.push(bl)
    ipc.send('update-request', message)

})




const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function (event) {
    ipc.send('close-config')
})



ipc.on('config', function (event, arg) {
    console.log(arg)
})