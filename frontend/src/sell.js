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