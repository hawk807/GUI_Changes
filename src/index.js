const electron = require('electron')
const ipc = electron.ipcRenderer
const { getPrice } = require('../fetchdata')

let cooldown = false;


let x = 300;
x = document.getElementById("user_balance")

const notifyBtn = document.getElementById('notifyBtn');
notifyBtn.addEventListener('click', function (event) {
    ipc.send('user-config')
})

const credButton = document.getElementById('credButton');
credButton.addEventListener('click', function (event) {
    ipc.send('user-credentials')
})


const withdrawBtn = document.getElementById('withdrawBtn');
withdrawBtn.addEventListener('click', function (event) {
    ipc.send('withdraw-request')
})

const quickBuy = document.getElementById('fastBuy');
quickBuy.addEventListener('click', function (event) {
    if (!cooldown) {
        ipc.send('fast-buy-request')
    }
})



const transferBtn = document.getElementById('transferBtn');
transferBtn.addEventListener('click', function (event) {
    ipc.send('transfer-window')
})

const openSellBtn = document.getElementById('sellwinBtn');
openSellBtn.addEventListener('click', function (event) {
    ipc.send('sell-window')
})

/*
const sellBtn = document.getElementById('sellBtn');
sellBtn.addEventListener('click', function (event) {
    ipc.send('sell-request')
})
*/


const emodeBtn = document.getElementById('emodeBtn');
emodeBtn.addEventListener('click', function (event) {
    ipc.send('start-emode')
})

let pollingData;
let chartopened = false;
const chartBtn = document.getElementById("chartBtn");
chartBtn.addEventListener('click', function (event) {
    if (!chartopened) {
        pollingData = setInterval(async () => {
            areaSeries.update(await getPrice())
            chartopened = true

        }, 3000);
    } else {
        clearInterval(pollingData);
        chartopened = false;
    }

})



// Importing the Notification Module from Electron,
// Since it is a Part of the Main Process, Using the
// Remote Module to Import it in Renderer Process


const options = {
    title: 'Custom Notification',
    subtitle: 'Subtitle of the Notification',
    body: 'Body of Custom Notification',
    silent: true,
    hasReply: true,
    timeoutType: 'never',
    replyPlaceholder: 'Reply Here',
    urgency: 'critical',
    closeButtonText: 'Close Button',
    actions: [{
        type: 'button',
        text: 'Show Button'
    }]
}

// Instantiating a new Notifications Object
// with custom Options
//const customNotification = new Notification(options);


// Instance Events for the new Notification Object
// send a start signal - to the datafetcher
// in the main process send a signal to chart js and from there initiate the data use the datafetcher file or start an ipc process there an listen to stdout

const MempoolModeBtn = document.getElementById('MempoolModeBtn');
MempoolModeBtn.addEventListener('click', function (event) {
    ipc.send('start-memmode')
})

ipc.on('memStats', (event, arg) => {

    document.getElementById('console').innerHTML = arg.toString()
    if (!arg.includes("No")) {
        new Notification(arg.toString());
    }

    //console.log(arg)
})

ipc.on('emodeLogs', (event, arg) => {
    document.getElementById('emode_console').innerHTML = arg.toString()
})

// integrating the chart




var chartElement = document.createElement('div');

var chart = LightweightCharts.createChart(chartElement, {
    width: 900,
    height: 300,
    rightPriceScale: {
        borderVisible: false,
    },
    timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: false,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: '#fff000',
        visible: true,
        timeVisible: true,
        secondsVisible: true,
        tickMarkFormatter: (time, tickMarkType, locale) => {
            console.log(time, tickMarkType, locale);
            const year = LightweightCharts.isBusinessDay(time) ? time.year : new Date(time * 1000).getUTCFullYear();
            return String(year);
        },
    },
});


let conditions = [
    "MempoolModeBtn",
    "emodeBtn",
]

document.querySelectorAll('.bt_3').forEach(function (e) {
    e.addEventListener('click', function () {
        //console.log(this.id.toString() == "fastBuy")
        if (this.style.backgroundColor == "red" && conditions.includes(this.id.toString())) {
            this.style.backgroundColor = "#99cc33";
        }
        else if (this.id.toString() == "fastBuy") {
            this.style.backgroundColor = "#c4c3d0"
            cooldown = true;
            setTimeout(() => {
                cooldown = false;
                this.style.backgroundColor = "#99cc33"
            }, 10000);
        }
        else {
            conditions.includes(this.id.toString()) ? this.style.backgroundColor = "red" : console.log("do not switch color")
        }
    })
});


//document.getElementById("chart")
document.getElementById("chart").appendChild(chartElement);
//document.getElementById("chart").appendChild(switcherElement);

var areaSeries = chart.addAreaSeries({
    topColor: 'rgba(33, 150, 243, 0.56)',
    bottomColor: 'rgba(33, 150, 243, 0.04)',
    lineColor: 'rgba(33, 150, 243, 1)',
    lineWidth: 2,
});

var darkTheme = {
    chart: {
        layout: {
            backgroundColor: '#2B2B43',
            lineColor: '#2B2B43',
            textColor: '#D9D9D9',
        },
        watermark: {
            color: 'rgba(0, 0, 0, 0)',
        },
        crosshair: {
            color: '#758696',
        },
        grid: {
            vertLines: {
                color: '#2B2B43',
            },
            horzLines: {
                color: '#363C4E',
            },
        },
    },
    series: {
        topColor: 'rgba(32, 226, 47, 0.56)',
        bottomColor: 'rgba(32, 226, 47, 0.04)',
        lineColor: 'rgba(32, 226, 47, 1)',
    },
};



var themesData = {
    Dark: darkTheme,
};

function syncToTheme(theme) {
    chart.applyOptions(themesData[theme].chart);
    areaSeries.applyOptions(themesData[theme].series);
}



var consoleElement = document.createElement('div');

var console = LightweightCharts.createChart(consoleElement, {
    width: 900,
    height: 300,
    chart: {
        layout: {
            backgroundColor: '#2B2B43',
            lineColor: '#2B2B43',
            textColor: '#D9D9D9',
        },
        watermark: {
            color: 'rgba(0, 0, 0, 0)',
        },
        crosshair: {
            color: '#758696',
        },
        grid: {
            vertLines: {
                color: '#2B2B43',
            },
            horzLines: {
                color: '#363C4E',
            },
        },
    }
});







syncToTheme('Dark');





areaSeries.setData([
    { time: 1642081041367, value: 0.18050271807746152 },
    { time: 1642081044074, value: 0.18050271807746152 },
    { time: 1642081046857, value: 0.18049070010575308 },
    { time: 1642081049861, value: 0.1804834572305021 },
    { time: 1642081052873, value: 0.1804834572305021 },
    { time: 1642081055853, value: 0.18048626004236876 },
    { time: 1642081058883, value: 0.1804861905799954 },
    { time: 1642081061891, value: 0.1804923142434569 },
    { time: 1642081064886, value: 0.18049231759637963 },
    { time: 1642081067850, value: 0.18049121032949916 },
    { time: 1642081070866, value: 0.18049021414971253 },
    { time: 1642081074113, value: 0.18049121032949916 },
    { time: 1642081077495, value: 0.18049796611587232 },
    { time: 1642081080317, value: 0.1805083578884378 }

]);
