

const planTier = 4;
let address;
let token;


async function getUser() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        address = accounts[0];
        await account()
        //mempool_active();
        //liquidity_active();
    }
    else {
        alert('In order to be able to use Blockinetics services, you need to have metamask installed')
    }
}


const account = async () => {
    try {
        let { userWallet, balance } = await fetch(`http://localhost:5000/web3/userWallet?sender=${address}&tier=${planTier}`)
        if (userWallet != undefined) document.getElementById('Account').innerHTML = `Wallet: ${userWallet.toString()}`

        if (balance != undefined) document.getElementById('balance').innerHTML = `Wallet: ${balance.toString()}`

    } catch (error) {

    }
}

const mempool_active = async () => {
    let active = await fetch(`http://localhost:5000/tierOne/isActiveMempool`)
    if (active) {
        return;
    }
    else {
        // pulsating button maybe warning message
    }
}


const liquidity_active = async () => {
    let active = await fetch(`http://localhost:5000/tierOne/isActiveLiquidity`)
    if (active) {
        return;
    }
    else {
        // pulsating button maybe warning message
    }
}





// CREATE WALLET

const WalletBtn = document.getElementById("WalletBtn");
WalletBtn.addEventListener('click', async function () {
    //account()
    try {

        let res = await fetch('http://localhost:5000/web3/subscribe')
        let data = await res.json()
        console.log(data["to"])
        console.log(data["methodid"])

        // fetch the current BNB price
        web3.eth.sendTransaction(
            {
                from: address,
                to: data['to'],//uWallet.toString(),
                value: (0.5 * Math.pow(10, 18).toString()), // replace this with the actual requirement price
                data:
                    '0x0f574ba70000000000000000000000000000000000000000000000000000000000000001', //data["methodid"],
                chainId: ethereum.networkVersion
            },
            async (error, hash) => {
                if (error) {
                    return console.error(error);
                }
                let interval = setInterval(async () => {
                    await ethereum
                        .request({
                            method: 'eth_getTransactionReceipt',
                            params: [hash],
                        }).then((receipt) => {
                            if (receipt.status == true) clearInterval(interval)
                            console.log(receipt.logs)
                        })
                        .catch((error) => {
                            if (error.code === 4001) {
                                console.log('Please connect to MetaMask.');
                            } else {
                                console.error(error);
                            }
                        });
                }, 1000);
                console.log(hash);
            }
        );

        // Save User Wallet to the DataBase sending the hash, tier, and user back finding out the address and saving it to the db

        // console.log(txHash)
    } catch (error) {
        console.log(error)

    }
})




// WITHDRAW
const withdrawBtn = document.getElementById("withdrawBtn");
withdrawBtn.addEventListener('click', async function () {
    try {

        let { userWallet, balance } = await fetch(`http://localhost:5000/web3/userWallet?sender=${address}&tier=${planTier}`)
        //console.log(data["to"])
        //console.log(data["methodid"])
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

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);






// TRADE DATA UPDATES
async function updateTradeData() {
    try {
        let { tokenASymbol, tokenBSymbol, tokenA_Address, tokenB_Address } = await fetch(`http://localhost:5000/web3/updateTradeData?sender="${address}"`)
        token = tokenA_Address;

        tokenASymbol != undefined ? document.getElementById("wbnb").innerHTML = tokenASymbol.toString() : console.warn('TokenA: Error Fetching name')
        tokenBSymbol != undefined ? document.getElementById("target").innerHTML = tokenBSymbol.toString() : console.warn('TokenB: Error Fetching name')
        document.getElementById("addressA").innerHTML = `${tokenBSymbol}: ${tokenB_Address.slice(0, 5)}...${tokenB_Address.slice(tokenB_Address.length - 4, tokenB_Address.length)}`
        document.getElementById("addressB").innerHTML = `${tokenASymbol}: ${tokenA_Address.slice(0, 5)}...${tokenA_Address.slice(tokenA_Address.length - 4, tokenA_Address.length)}`

        // Chart reset to get rid of the demo chart data
    } catch (error) {
        console.log(error)

    }
}

let MemClicked = false;
const MempoolModeBtn = document.getElementById('MempoolModeBtn')
MempoolModeBtn.addEventListener('click', async function () {
    console.log(MemClicked)

    if (!MemClicked) {
        MemClicked = true;
        await fetch(`http://localhost:5000/tierOne/activateMempool`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "sender": address,
                "tier": planTier,
            })
        })
    }
    else if (MemClicked) {
        MemClicked = false;
        await fetch(`http://localhost:5000/tierOne/deactivateMempool`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "sender": address,
                "tier": planTier,
            })
        })

    }
})



let LiqClicked = false;
const LiquidityBtn = document.getElementById('LiquidityBtn')
LiquidityBtn.addEventListener('click', async function () {
    console.log(LiqClicked)

    if (!LiqClicked) {
        LiqClicked = true;
        await fetch(`http://localhost:5000/tierOne/activateLiquidity`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "sender": address,
                "tier": planTier,
            })
        })
    }
    else if (LiqClicked) {
        LiqClicked = false;
        await fetch(`http://localhost:5000/tierOne/deactivateLiquidity`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "sender": address,
                "tier": planTier,
            })
        })
    }
})




// CHART UPDATES

/*
//https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=0xf4d2888d29d722226fafa5d9b24f9164c092421e&sellAmount=50000000000000000
let chartopened = false;
const chartBtn = document.getElementById("chartBtn");
chartBtn.addEventListener('click', function () {
    if (!chartopened) {
        updateTradeData()
        chartopened = true
        makeCandleStick()
    } else {
        chartopened = false;
    }
})

async function makeCandleStick(lastPrice) {
    try {
        let timer = 0;
        let data;
        let open;
        let close;
        let high;
        let low;


        let priceInterval = setInterval(async () => {
            console.log('started collecting data')
            if (!chartopened) clearInterval(priceInterval)

            let { tokenA, tokenB } = await fetch(`http://localhost:5000/tierOne/`, { //?sender="${address}"
                method: 'GET'
            })

            console.log(resulttest)
            const QS = `https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=${tokenA}&sellAmount=50000000000000000`
            let res = await fetch(QS)
            console.log(res.data.price)
            data = res.data.price

            if (timer == 0 && lastPrice == undefined) { open = data }
            else if (lastPrice != undefined) {
                open = lastPrice
            }
            timer += 1000
            if (timer == 6000) {
                clearInterval(priceInterval);
                console.log('stopped collecting data')
                close = data
                if (low == undefined) low = high
                let candleStickObj = {
                    time: new Date(),
                    open: open,
                    high: high,
                    low: low,
                    close: close
                }
                console.log(candleStickObj)
                candleSeries.update(candleStickObj)
                makeCandleStick(close)
            }
            else if (timer > 0) {
                let result = getMinMax(data);
                if (result != undefined) {
                    result[0] == 0 ? high = result[1] : low = result[1];
                }
            }
        }, 6000);
        //recursive interval;
    } catch (error) {
        console.log(error)
    }

}

function getMinMax(data) {
    let prices = [];
    prices.push(data);
    let high;
    let low;
    if (prices.length == 0) {
    } else if (Math.max(...prices) == data) {
        high = data;
        return [0, high]
    }
    else if (Math.min(...prices) == data) {
        low = data;
        return [1, low]
    }
}
*/



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


var chartElement = document.createElement('div');

document.getElementById("chart").appendChild(chartElement);


var chart = LightweightCharts.createChart(chartElement, {
    width: 900,
    height: 300,
    rightPriceScale: {
        borderVisible: true,
        borderColor: 'rgba(197, 203, 206, 0.8)',

    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    leftPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    layout: {
        backgroundColor: '#0d111d',
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
            color: '#1f1f1f',
        },
        horzLines: {
            color: '#1f1f1f',
        },
    },

    series: {
        topColor: 'rgba(32, 226, 47, 0.56)',
        bottomColor: 'rgba(32, 226, 47, 0.04)',
        lineColor: 'rgba(32, 226, 47, 1)',
    },
    timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: false,
        rightBarStaysOnScroll: false,
        borderVisible: true,
        borderColor: 'rgba(197, 203, 206, 0.8)',
        visible: true,
        timeVisible: true,
        secondsVisible: true,
    },
});


// on select choose the timeframe
let timeframeData = new Map([
    ['1MIN', 20],
    ['5MIN', 100],
    ['15MIN', 300],
    ['30MIN', 600],
    ['45MIN', 900],
    ['1H', 1200]
])

let timeframes = ['1MIN', '5MIN', '15MIN', '30MIN', '45MIN', '1H'];


let candleData = "test";

// on selectchange these values;



var lastIndex = candleData.length - 1;

var targetPrice = getUpToDatePice();

var currentIndex = lastIndex + 1;
var currentBusinessDay = Date.now()
var ticksInCurrentBar = 0;
var currentBar = {
    open: null,
    high: null,
    low: null,
    close: null,
    time: currentBusinessDay,
};

function mergeTickToBar(price) {
    if (currentBar.open === null) {
        currentBar.open = price;
        currentBar.high = price;
        currentBar.low = price;
        currentBar.close = price;
    } else {
        currentBar.close = price;
        currentBar.high = Math.max(currentBar.high, price);
        currentBar.low = Math.min(currentBar.low, price);
    }
    candleSeries.update(currentBar);
}



// Hi Oj mate, great work with the dropdown, if you see this we just have to call activate with parameter i = 0 => standing for 1minute, 1 for 5minutes 
let TickInterval;
let streamingChartData = null;
function activate(i) {
    console.log(called)
    if (streamingChartData != intervals[i]) {
        clearTicks()
    }
    getHistoricalData()
    TickInterval = setInterval(function () {
        mergeTickToBar(getUpToDatePice(candleData[candleData.length - 1].time));
        if (++ticksInCurrentBar === timeframeData.get(timeframes[i])) {
            // move to next bar
            currentIndex++;
            currentBusinessDay = Date.now()
            currentBar = {
                open: null,
                high: null,
                low: null,
                close: null,
                time: Date.now(),
            };
            ticksInCurrentBar = 0;
        }
    }, 3000);
}

function clearTicks() {
    clearInterval(TickInterval)
}
// calling this every three seconds;
// time frame needs to be set dynamically;
// replace this with getRandomPrice
async function getUpToDatePice(_last_timestamp) {
    if (_last_timestamp == undefined) candleData[candleData.length - 1].time;
    let { price, timestamp } = await fetch(`http://localhost:5000/chart/live_chart_data/?token=${token}&timeframe=${timeframeData.get(timeframes)}&last_timestamp=${_last_timestamp}`)
    return { price: price, timestamp: timestamp };

}

// Needs to be called first
async function getHistoricalData() {
    data = await fetch(`http://localhost:5000/chart/past_chart_data/?token=${token}&timeframe=${timeframeData.get(timeframes)}`);
    candleSeries.setData(data)
    return;
}



// FIRST: SET THE PARAMS - TOKEN, TIMEFRAME - on load
// SECOND: GET HISTORICAL DATA - on select
// THIRD: FETCH LIVEDATA


const lineSeries = chart.addAreaSeries({
    priceScaleId: 'left', topColor: 'rgba(156, 39, 176, 1)',
    bottomColor: 'rgba(41, 121, 255, 0.1)',
    lineColor: 'rgba(156, 39, 176, 0.8)',
    lineWidth: 1,
}).setData([
    // here then different data is loaded
    { time: { year: 2018, month: 10, day: 19 }, value: 21.991322885799974 },
    { time: { year: 2018, month: 10, day: 20 }, value: 26.08562066747304 },
    { time: { year: 2018, month: 10, day: 21 }, value: 25.747894754049188 },
    { time: { year: 2018, month: 10, day: 22 }, value: 22.44710394179786 },
    { time: { year: 2018, month: 10, day: 23 }, value: 25.90922781611379 },
    { time: { year: 2018, month: 10, day: 24 }, value: 26.38458389134024 },
    { time: { year: 2018, month: 10, day: 25 }, value: 27.10447702511048 },
    { time: { year: 2018, month: 10, day: 26 }, value: 26.720108713432015 },
    { time: { year: 2018, month: 10, day: 27 }, value: 27.775965775043687 },
    { time: { year: 2018, month: 10, day: 28 }, value: 33.270114271143534 },
    { time: { year: 2018, month: 10, day: 29 }, value: 42.56575933295939 },
    { time: { year: 2018, month: 10, day: 30 }, value: 45.08200435135056 },
    { time: { year: 2018, month: 10, day: 31 }, value: 63.23056648368551 },
    { time: { year: 2018, month: 11, day: 1 }, value: 63.95439115004997 },
    { time: { year: 2018, month: 11, day: 2 }, value: 71.33824039167375 },
    { time: { year: 2018, month: 11, day: 3 }, value: 88.20630503241516 },
    { time: { year: 2018, month: 11, day: 4 }, value: 75.86448100105474 },
    { time: { year: 2018, month: 11, day: 5 }, value: 84.40662866072331 },
    { time: { year: 2018, month: 11, day: 6 }, value: 78.37949018361734 },
    { time: { year: 2018, month: 11, day: 7 }, value: 78.93451855272903 },
    { time: { year: 2018, month: 11, day: 8 }, value: 69.09787968866685 },
    { time: { year: 2018, month: 11, day: 9 }, value: 71.86155711051282 },
    { time: { year: 2018, month: 11, day: 10 }, value: 73.13592102861054 },
    { time: { year: 2018, month: 11, day: 11 }, value: 72.29904165595138 },
    { time: { year: 2018, month: 11, day: 12 }, value: 62.71310302192315 },
    { time: { year: 2018, month: 11, day: 13 }, value: 70.4117065547622 },
    { time: { year: 2018, month: 11, day: 14 }, value: 60.76028377072692 },
    { time: { year: 2018, month: 11, day: 15 }, value: 67.78186316482058 },
    { time: { year: 2018, month: 11, day: 16 }, value: 66.23575406989995 },
    { time: { year: 2018, month: 11, day: 17 }, value: 59.032006469704974 },
    { time: { year: 2018, month: 11, day: 18 }, value: 56.23517164482117 },
    { time: { year: 2018, month: 11, day: 19 }, value: 52.19422771670686 },
    { time: { year: 2018, month: 11, day: 20 }, value: 54.84398543695843 },
    { time: { year: 2018, month: 11, day: 21 }, value: 56.09188938043403 },
    { time: { year: 2018, month: 11, day: 22 }, value: 55.844247490194796 },
    { time: { year: 2018, month: 11, day: 23 }, value: 47.71708286768754 },
    { time: { year: 2018, month: 11, day: 24 }, value: 51.93278959002675 },
    { time: { year: 2018, month: 11, day: 25 }, value: 46.48235646977829 },
    { time: { year: 2018, month: 11, day: 26 }, value: 46.605571088128045 },
    { time: { year: 2018, month: 11, day: 27 }, value: 45.64276140038789 },
    { time: { year: 2018, month: 11, day: 28 }, value: 41.96881004496035 },
    { time: { year: 2018, month: 11, day: 29 }, value: 39.989412412497536 },
    { time: { year: 2018, month: 11, day: 30 }, value: 39.52500620399596 },
    { time: { year: 2018, month: 12, day: 1 }, value: 35.56384599311616 },
    { time: { year: 2018, month: 12, day: 2 }, value: 40.94047709971637 },
    { time: { year: 2018, month: 12, day: 3 }, value: 33.861915570305314 },
    { time: { year: 2018, month: 12, day: 4 }, value: 34.74712151419427 },
    { time: { year: 2018, month: 12, day: 5 }, value: 30.45638028232725 },
    { time: { year: 2018, month: 12, day: 6 }, value: 31.340553934718642 },
    { time: { year: 2018, month: 12, day: 7 }, value: 30.56606547541742 },
    { time: { year: 2018, month: 12, day: 8 }, value: 30.11447170568653 },
    { time: { year: 2018, month: 12, day: 9 }, value: 26.02547846912051 },
    { time: { year: 2018, month: 12, day: 10 }, value: 24.361761789785486 },
    { time: { year: 2018, month: 12, day: 11 }, value: 22.60851425769583 },
    { time: { year: 2018, month: 12, day: 12 }, value: 22.67520111619218 },
    { time: { year: 2018, month: 12, day: 13 }, value: 21.662733743907786 },
    { time: { year: 2018, month: 12, day: 14 }, value: 18.722053197248524 },
    { time: { year: 2018, month: 12, day: 15 }, value: 20.452302498025887 },
    { time: { year: 2018, month: 12, day: 16 }, value: 22.142344670210875 },
    { time: { year: 2018, month: 12, day: 17 }, value: 25.114676746375288 },
    { time: { year: 2018, month: 12, day: 18 }, value: 26.6145701294817 },
    { time: { year: 2018, month: 12, day: 19 }, value: 32.897884114586205 },
    { time: { year: 2018, month: 12, day: 20 }, value: 34.3399669269581 },
    { time: { year: 2018, month: 12, day: 21 }, value: 35.29951657809826 },
    { time: { year: 2018, month: 12, day: 22 }, value: 35.64311939369824 },
    { time: { year: 2018, month: 12, day: 23 }, value: 38.83337367914626 },
    { time: { year: 2018, month: 12, day: 24 }, value: 42.97395901831482 },
    { time: { year: 2018, month: 12, day: 25 }, value: 46.385332490998316 },
    { time: { year: 2018, month: 12, day: 26 }, value: 50.20501663759903 },
    { time: { year: 2018, month: 12, day: 27 }, value: 47.00563476538377 },
    { time: { year: 2018, month: 12, day: 28 }, value: 52.44989427832516 },
    { time: { year: 2018, month: 12, day: 29 }, value: 51.25683701922113 },
    { time: { year: 2018, month: 12, day: 30 }, value: 54.71225345325549 },
    { time: { year: 2018, month: 12, day: 31 }, value: 64.12996317220895 },
]);



candleData = [
    { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
    { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
    { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
    { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
    { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
    { time: '2018-10-26', open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
    { time: '2018-10-29', open: 173.74, high: 175.99, low: 170.95, close: 173.20 },
    { time: '2018-10-30', open: 173.16, high: 176.43, low: 172.64, close: 176.24 },
    { time: '2018-10-31', open: 177.98, high: 178.85, low: 175.59, close: 175.88 },
    { time: '2018-11-01', open: 176.84, high: 180.86, low: 175.90, close: 180.46 },
    { time: '2018-11-02', open: 182.47, high: 183.01, low: 177.39, close: 179.93 },
    { time: '2018-11-05', open: 181.02, high: 182.41, low: 179.30, close: 182.19 },
    { time: '2018-11-06', open: 181.93, high: 182.65, low: 180.05, close: 182.01 },
    { time: '2018-11-07', open: 183.79, high: 187.68, low: 182.06, close: 187.23 },
    { time: '2018-11-08', open: 187.13, high: 188.69, low: 185.72, close: 188.00 },
    { time: '2018-11-09', open: 188.32, high: 188.48, low: 184.96, close: 185.99 },
    { time: '2018-11-12', open: 185.23, high: 186.95, low: 179.02, close: 179.43 },
    { time: '2018-11-13', open: 177.30, high: 181.62, low: 172.85, close: 179.00 },
    { time: '2018-11-14', open: 182.61, high: 182.90, low: 179.15, close: 179.90 },
    { time: '2018-11-15', open: 179.01, high: 179.67, low: 173.61, close: 177.36 },
    { time: '2018-11-16', open: 173.99, high: 177.60, low: 173.51, close: 177.02 },
    { time: '2018-11-19', open: 176.71, high: 178.88, low: 172.30, close: 173.59 },
    { time: '2018-11-20', open: 169.25, high: 172.00, low: 167.00, close: 169.05 },
    { time: '2018-11-21', open: 170.00, high: 170.93, low: 169.15, close: 169.30 },
    { time: '2018-11-23', open: 169.39, high: 170.33, low: 168.47, close: 168.85 },
    { time: '2018-11-26', open: 170.20, high: 172.39, low: 168.87, close: 169.82 },
    { time: '2018-11-27', open: 169.11, high: 173.38, low: 168.82, close: 173.22 },
    { time: '2018-11-28', open: 172.91, high: 177.65, low: 170.62, close: 177.43 },
    { time: '2018-11-29', open: 176.80, high: 177.27, low: 174.92, close: 175.66 },
    { time: '2018-11-30', open: 175.75, high: 180.37, low: 175.11, close: 180.32 },
    { time: '2018-12-03', open: 183.29, high: 183.50, low: 179.35, close: 181.74 },
    { time: '2018-12-04', open: 181.06, high: 182.23, low: 174.55, close: 175.30 },
    { time: '2018-12-06', open: 173.50, high: 176.04, low: 170.46, close: 175.96 },
    { time: '2018-12-07', open: 175.35, high: 178.36, low: 172.24, close: 172.79 },
    { time: '2018-12-10', open: 173.39, high: 173.99, low: 167.73, close: 171.69 },
    { time: '2018-12-11', open: 174.30, high: 175.60, low: 171.24, close: 172.21 },
    { time: '2018-12-12', open: 173.75, high: 176.87, low: 172.81, close: 174.21 },
    { time: '2018-12-13', open: 174.31, high: 174.91, low: 172.07, close: 173.87 },
    { time: '2018-12-14', open: 172.98, high: 175.14, low: 171.95, close: 172.29 },
    { time: '2018-12-17', open: 171.51, high: 171.99, low: 166.93, close: 167.97 },
    { time: '2018-12-18', open: 168.90, high: 171.95, low: 168.50, close: 170.04 },
    { time: '2018-12-19', open: 170.92, high: 174.95, low: 166.77, close: 167.56 },
    { time: '2018-12-20', open: 166.28, high: 167.31, low: 162.23, close: 164.16 },
    { time: '2018-12-21', open: 162.81, high: 167.96, low: 160.17, close: 160.48 },
    { time: '2018-12-24', open: 160.16, high: 161.40, low: 158.09, close: 158.14 },
    { time: '2018-12-26', open: 159.46, high: 168.28, low: 159.44, close: 168.28 },
    { time: '2018-12-27', open: 166.44, high: 170.46, low: 163.36, close: 170.32 },
    { time: '2018-12-28', open: 171.22, high: 173.12, low: 168.60, close: 170.22 },
    { time: '2018-12-31', open: 171.47, high: 173.24, low: 170.65, close: 171.82 },]

const candleSeries = chart.addCandlestickSeries({
    upColor: 'rgba(1,102,192,255)',
    downColor: '#aa009c',
    borderDownColor: 'rgba(186,19,166,255)',
    borderUpColor: 'rgba(1,102,192,255)',
    wickDownColor: 'rgba(186,19,166,255)',
    wickUpColor: 'rgba(1,102,192,255)',
}, { priceScaleId: 'right' }).setData(candleData);

/*

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
    var switcherElement = document.createElement('div');
    switcherElement.classList.add('switcher');

    var intervalElements = items.map(function (item) {
        var itemEl = document.createElement('button');
        itemEl.innerText = item;
        itemEl.classList.add('switcher-item');
        itemEl.classList.toggle('switcher-active-item', item === activeItem);
        itemEl.addEventListener('click', function () {
            onItemClicked(item);
        });
        switcherElement.appendChild(itemEl);
        return itemEl;
    });

    function onItemClicked(item) {
        if (item === activeItem) {
            return;
        }

        intervalElements.forEach(function (element, index) {
            element.classList.toggle('switcher-active-item', items[index] === item);
        });

        activeItem = item;

        activeItemChangedCallback(item);
    }

    return switcherElement;
}

var intervals = ['1D', '1W', '1M', '1Y'];

var dayData = [
    { time: '2018-10-19', value: 26.19 },
    { time: '2018-10-22', value: 25.87 },
    { time: '2018-10-23', value: 25.83 },
    { time: '2018-10-24', value: 25.78 },
    { time: '2018-10-25', value: 25.82 },
    { time: '2018-10-26', value: 25.81 },
    { time: '2018-10-29', value: 25.82 },
    { time: '2018-10-30', value: 25.71 },
    { time: '2018-10-31', value: 25.82 },
    { time: '2018-11-01', value: 25.72 },
    { time: '2018-11-02', value: 25.74 },
    { time: '2018-11-05', value: 25.81 },
    { time: '2018-11-06', value: 25.75 },
    { time: '2018-11-07', value: 25.73 },
    { time: '2018-11-08', value: 25.75 },
    { time: '2018-11-09', value: 25.75 },
    { time: '2018-11-12', value: 25.76 },
    { time: '2018-11-13', value: 25.80 },
    { time: '2018-11-14', value: 25.77 },
    { time: '2018-11-15', value: 25.75 },
    { time: '2018-11-16', value: 25.75 },
    { time: '2018-11-19', value: 25.75 },
    { time: '2018-11-20', value: 25.72 },
    { time: '2018-11-21', value: 25.78 },
    { time: '2018-11-23', value: 25.72 },
    { time: '2018-11-26', value: 25.78 },
    { time: '2018-11-27', value: 25.85 },
    { time: '2018-11-28', value: 25.85 },
    { time: '2018-11-29', value: 25.55 },
    { time: '2018-11-30', value: 25.41 },
    { time: '2018-12-03', value: 25.41 },
    { time: '2018-12-04', value: 25.42 },
    { time: '2018-12-06', value: 25.33 },
    { time: '2018-12-07', value: 25.39 },
    { time: '2018-12-10', value: 25.32 },
    { time: '2018-12-11', value: 25.48 },
    { time: '2018-12-12', value: 25.39 },
    { time: '2018-12-13', value: 25.45 },
    { time: '2018-12-14', value: 25.52 },
    { time: '2018-12-17', value: 25.38 },
    { time: '2018-12-18', value: 25.36 },
    { time: '2018-12-19', value: 25.65 },
    { time: '2018-12-20', value: 25.70 },
    { time: '2018-12-21', value: 25.66 },
    { time: '2018-12-24', value: 25.66 },
    { time: '2018-12-26', value: 25.65 },
    { time: '2018-12-27', value: 25.66 },
    { time: '2018-12-28', value: 25.68 },
    { time: '2018-12-31', value: 25.77 },
    { time: '2019-01-02', value: 25.72 },
    { time: '2019-01-03', value: 25.69 },
    { time: '2019-01-04', value: 25.71 },
    { time: '2019-01-07', value: 25.72 },
    { time: '2019-01-08', value: 25.72 },
    { time: '2019-01-09', value: 25.66 },
    { time: '2019-01-10', value: 25.85 },
    { time: '2019-01-11', value: 25.92 },
    { time: '2019-01-14', value: 25.94 },
    { time: '2019-01-15', value: 25.95 },
    { time: '2019-01-16', value: 26.00 },
    { time: '2019-01-17', value: 25.99 },
    { time: '2019-01-18', value: 25.60 },
    { time: '2019-01-22', value: 25.81 },
    { time: '2019-01-23', value: 25.70 },
    { time: '2019-01-24', value: 25.74 },
    { time: '2019-01-25', value: 25.80 },
    { time: '2019-01-28', value: 25.83 },
    { time: '2019-01-29', value: 25.70 },
    { time: '2019-01-30', value: 25.78 },
    { time: '2019-01-31', value: 25.35 },
    { time: '2019-02-01', value: 25.60 },
    { time: '2019-02-04', value: 25.65 },
    { time: '2019-02-05', value: 25.73 },
    { time: '2019-02-06', value: 25.71 },
    { time: '2019-02-07', value: 25.71 },
    { time: '2019-02-08', value: 25.72 },
    { time: '2019-02-11', value: 25.76 },
    { time: '2019-02-12', value: 25.84 },
    { time: '2019-02-13', value: 25.85 },
    { time: '2019-02-14', value: 25.87 },
    { time: '2019-02-15', value: 25.89 },
    { time: '2019-02-19', value: 25.90 },
    { time: '2019-02-20', value: 25.92 },
    { time: '2019-02-21', value: 25.96 },
    { time: '2019-02-22', value: 26.00 },
    { time: '2019-02-25', value: 25.93 },
    { time: '2019-02-26', value: 25.92 },
    { time: '2019-02-27', value: 25.67 },
    { time: '2019-02-28', value: 25.79 },
    { time: '2019-03-01', value: 25.86 },
    { time: '2019-03-04', value: 25.94 },
    { time: '2019-03-05', value: 26.02 },
    { time: '2019-03-06', value: 25.95 },
    { time: '2019-03-07', value: 25.89 },
    { time: '2019-03-08', value: 25.94 },
    { time: '2019-03-11', value: 25.91 },
    { time: '2019-03-12', value: 25.92 },
    { time: '2019-03-13', value: 26.00 },
    { time: '2019-03-14', value: 26.05 },
    { time: '2019-03-15', value: 26.11 },
    { time: '2019-03-18', value: 26.10 },
    { time: '2019-03-19', value: 25.98 },
    { time: '2019-03-20', value: 26.11 },
    { time: '2019-03-21', value: 26.12 },
    { time: '2019-03-22', value: 25.88 },
    { time: '2019-03-25', value: 25.85 },
    { time: '2019-03-26', value: 25.72 },
    { time: '2019-03-27', value: 25.73 },
    { time: '2019-03-28', value: 25.80 },
    { time: '2019-03-29', value: 25.77 },
    { time: '2019-04-01', value: 26.06 },
    { time: '2019-04-02', value: 25.93 },
    { time: '2019-04-03', value: 25.95 },
    { time: '2019-04-04', value: 26.06 },
    { time: '2019-04-05', value: 26.16 },
    { time: '2019-04-08', value: 26.12 },
    { time: '2019-04-09', value: 26.07 },
    { time: '2019-04-10', value: 26.13 },
    { time: '2019-04-11', value: 26.04 },
    { time: '2019-04-12', value: 26.04 },
    { time: '2019-04-15', value: 26.05 },
    { time: '2019-04-16', value: 26.01 },
    { time: '2019-04-17', value: 26.09 },
    { time: '2019-04-18', value: 26.00 },
    { time: '2019-04-22', value: 26.00 },
    { time: '2019-04-23', value: 26.06 },
    { time: '2019-04-24', value: 26.00 },
    { time: '2019-04-25', value: 25.81 },
    { time: '2019-04-26', value: 25.88 },
    { time: '2019-04-29', value: 25.91 },
    { time: '2019-04-30', value: 25.90 },
    { time: '2019-05-01', value: 26.02 },
    { time: '2019-05-02', value: 25.97 },
    { time: '2019-05-03', value: 26.02 },
    { time: '2019-05-06', value: 26.03 },
    { time: '2019-05-07', value: 26.04 },
    { time: '2019-05-08', value: 26.05 },
    { time: '2019-05-09', value: 26.05 },
    { time: '2019-05-10', value: 26.08 },
    { time: '2019-05-13', value: 26.05 },
    { time: '2019-05-14', value: 26.01 },
    { time: '2019-05-15', value: 26.03 },
    { time: '2019-05-16', value: 26.14 },
    { time: '2019-05-17', value: 26.09 },
    { time: '2019-05-20', value: 26.01 },
    { time: '2019-05-21', value: 26.12 },
    { time: '2019-05-22', value: 26.15 },
    { time: '2019-05-23', value: 26.18 },
    { time: '2019-05-24', value: 26.16 },
    { time: '2019-05-28', value: 26.23 },
];

var weekData = [
    { time: '2016-07-18', value: 26.10 },
    { time: '2016-07-25', value: 26.19 },
    { time: '2016-08-01', value: 26.24 },
    { time: '2016-08-08', value: 26.22 },
    { time: '2016-08-15', value: 25.98 },
    { time: '2016-08-22', value: 25.85 },
    { time: '2016-08-29', value: 25.98 },
    { time: '2016-09-05', value: 25.71 },
    { time: '2016-09-12', value: 25.84 },
    { time: '2016-09-19', value: 25.89 },
    { time: '2016-09-26', value: 25.65 },
    { time: '2016-10-03', value: 25.69 },
    { time: '2016-10-10', value: 25.67 },
    { time: '2016-10-17', value: 26.11 },
    { time: '2016-10-24', value: 25.80 },
    { time: '2016-10-31', value: 25.70 },
    { time: '2016-11-07', value: 25.40 },
    { time: '2016-11-14', value: 25.32 },
    { time: '2016-11-21', value: 25.48 },
    { time: '2016-11-28', value: 25.08 },
    { time: '2016-12-05', value: 25.06 },
    { time: '2016-12-12', value: 25.11 },
    { time: '2016-12-19', value: 25.34 },
    { time: '2016-12-26', value: 25.20 },
    { time: '2017-01-02', value: 25.33 },
    { time: '2017-01-09', value: 25.56 },
    { time: '2017-01-16', value: 25.32 },
    { time: '2017-01-23', value: 25.71 },
    { time: '2017-01-30', value: 25.85 },
    { time: '2017-02-06', value: 25.77 },
    { time: '2017-02-13', value: 25.94 },
    { time: '2017-02-20', value: 25.67 },
    { time: '2017-02-27', value: 25.60 },
    { time: '2017-03-06', value: 25.54 },
    { time: '2017-03-13', value: 25.84 },
    { time: '2017-03-20', value: 25.96 },
    { time: '2017-03-27', value: 25.90 },
    { time: '2017-04-03', value: 25.97 },
    { time: '2017-04-10', value: 26.00 },
    { time: '2017-04-17', value: 26.13 },
    { time: '2017-04-24', value: 26.02 },
    { time: '2017-05-01', value: 26.30 },
    { time: '2017-05-08', value: 26.27 },
    { time: '2017-05-15', value: 26.24 },
    { time: '2017-05-22', value: 26.02 },
    { time: '2017-05-29', value: 26.20 },
    { time: '2017-06-05', value: 26.12 },
    { time: '2017-06-12', value: 26.20 },
    { time: '2017-06-19', value: 26.46 },
    { time: '2017-06-26', value: 26.39 },
    { time: '2017-07-03', value: 26.52 },
    { time: '2017-07-10', value: 26.57 },
    { time: '2017-07-17', value: 26.65 },
    { time: '2017-07-24', value: 26.45 },
    { time: '2017-07-31', value: 26.37 },
    { time: '2017-08-07', value: 26.13 },
    { time: '2017-08-14', value: 26.21 },
    { time: '2017-08-21', value: 26.31 },
    { time: '2017-08-28', value: 26.33 },
    { time: '2017-09-04', value: 26.38 },
    { time: '2017-09-11', value: 26.38 },
    { time: '2017-09-18', value: 26.50 },
    { time: '2017-09-25', value: 26.39 },
    { time: '2017-10-02', value: 25.95 },
    { time: '2017-10-09', value: 26.15 },
    { time: '2017-10-16', value: 26.43 },
    { time: '2017-10-23', value: 26.22 },
    { time: '2017-10-30', value: 26.14 },
    { time: '2017-11-06', value: 26.08 },
    { time: '2017-11-13', value: 26.27 },
    { time: '2017-11-20', value: 26.30 },
    { time: '2017-11-27', value: 25.92 },
    { time: '2017-12-04', value: 26.10 },
    { time: '2017-12-11', value: 25.88 },
    { time: '2017-12-18', value: 25.82 },
    { time: '2017-12-25', value: 25.82 },
    { time: '2018-01-01', value: 25.81 },
    { time: '2018-01-08', value: 25.95 },
    { time: '2018-01-15', value: 26.03 },
    { time: '2018-01-22', value: 26.04 },
    { time: '2018-01-29', value: 25.96 },
    { time: '2018-02-05', value: 25.99 },
    { time: '2018-02-12', value: 26.00 },
    { time: '2018-02-19', value: 26.06 },
    { time: '2018-02-26', value: 25.77 },
    { time: '2018-03-05', value: 25.81 },
    { time: '2018-03-12', value: 25.88 },
    { time: '2018-03-19', value: 25.72 },
    { time: '2018-03-26', value: 25.75 },
    { time: '2018-04-02', value: 25.70 },
    { time: '2018-04-09', value: 25.73 },
    { time: '2018-04-16', value: 25.74 },
    { time: '2018-04-23', value: 25.69 },
    { time: '2018-04-30', value: 25.76 },
    { time: '2018-05-07', value: 25.89 },
    { time: '2018-05-14', value: 25.89 },
    { time: '2018-05-21', value: 26.00 },
    { time: '2018-05-28', value: 25.79 },
    { time: '2018-06-04', value: 26.11 },
    { time: '2018-06-11', value: 26.43 },
    { time: '2018-06-18', value: 26.30 },
    { time: '2018-06-25', value: 26.58 },
    { time: '2018-07-02', value: 26.33 },
    { time: '2018-07-09', value: 26.33 },
    { time: '2018-07-16', value: 26.32 },
    { time: '2018-07-23', value: 26.20 },
    { time: '2018-07-30', value: 26.03 },
    { time: '2018-08-06', value: 26.15 },
    { time: '2018-08-13', value: 26.17 },
    { time: '2018-08-20', value: 26.28 },
    { time: '2018-08-27', value: 25.86 },
    { time: '2018-09-03', value: 25.69 },
    { time: '2018-09-10', value: 25.69 },
    { time: '2018-09-17', value: 25.64 },
    { time: '2018-09-24', value: 25.67 },
    { time: '2018-10-01', value: 25.55 },
    { time: '2018-10-08', value: 25.59 },
    { time: '2018-10-15', value: 26.19 },
    { time: '2018-10-22', value: 25.81 },
    { time: '2018-10-29', value: 25.74 },
    { time: '2018-11-05', value: 25.75 },
    { time: '2018-11-12', value: 25.75 },
    { time: '2018-11-19', value: 25.72 },
    { time: '2018-11-26', value: 25.41 },
    { time: '2018-12-03', value: 25.39 },
    { time: '2018-12-10', value: 25.52 },
    { time: '2018-12-17', value: 25.66 },
    { time: '2018-12-24', value: 25.68 },
    { time: '2018-12-31', value: 25.71 },
    { time: '2019-01-07', value: 25.92 },
    { time: '2019-01-14', value: 25.60 },
    { time: '2019-01-21', value: 25.80 },
    { time: '2019-01-28', value: 25.60 },
    { time: '2019-02-04', value: 25.72 },
    { time: '2019-02-11', value: 25.89 },
    { time: '2019-02-18', value: 26.00 },
    { time: '2019-02-25', value: 25.86 },
    { time: '2019-03-04', value: 25.94 },
    { time: '2019-03-11', value: 26.11 },
    { time: '2019-03-18', value: 25.88 },
    { time: '2019-03-25', value: 25.77 },
    { time: '2019-04-01', value: 26.16 },
    { time: '2019-04-08', value: 26.04 },
    { time: '2019-04-15', value: 26.00 },
    { time: '2019-04-22', value: 25.88 },
    { time: '2019-04-29', value: 26.02 },
    { time: '2019-05-06', value: 26.08 },
    { time: '2019-05-13', value: 26.09 },
    { time: '2019-05-20', value: 26.16 },
    { time: '2019-05-27', value: 26.23 },
];

var monthData = [
    { time: '2006-12-01', value: 25.40 },
    { time: '2007-01-01', value: 25.50 },
    { time: '2007-02-01', value: 25.11 },
    { time: '2007-03-01', value: 25.24 },
    { time: '2007-04-02', value: 25.34 },
    { time: '2007-05-01', value: 24.82 },
    { time: '2007-06-01', value: 23.85 },
    { time: '2007-07-02', value: 23.24 },
    { time: '2007-08-01', value: 23.05 },
    { time: '2007-09-03', value: 22.26 },
    { time: '2007-10-01', value: 22.52 },
    { time: '2007-11-01', value: 20.84 },
    { time: '2007-12-03', value: 20.37 },
    { time: '2008-01-01', value: 23.90 },
    { time: '2008-02-01', value: 22.58 },
    { time: '2008-03-03', value: 21.74 },
    { time: '2008-04-01', value: 22.50 },
    { time: '2008-05-01', value: 22.38 },
    { time: '2008-06-02', value: 20.58 },
    { time: '2008-07-01', value: 20.60 },
    { time: '2008-08-01', value: 20.82 },
    { time: '2008-09-01', value: 17.50 },
    { time: '2008-10-01', value: 17.70 },
    { time: '2008-11-03', value: 15.52 },
    { time: '2008-12-01', value: 18.58 },
    { time: '2009-01-01', value: 15.40 },
    { time: '2009-02-02', value: 11.68 },
    { time: '2009-03-02', value: 14.89 },
    { time: '2009-04-01', value: 16.24 },
    { time: '2009-05-01', value: 18.33 },
    { time: '2009-06-01', value: 18.08 },
    { time: '2009-07-01', value: 20.07 },
    { time: '2009-08-03', value: 20.35 },
    { time: '2009-09-01', value: 21.53 },
    { time: '2009-10-01', value: 21.48 },
    { time: '2009-11-02', value: 20.28 },
    { time: '2009-12-01', value: 21.39 },
    { time: '2010-01-01', value: 22.00 },
    { time: '2010-02-01', value: 22.31 },
    { time: '2010-03-01', value: 22.82 },
    { time: '2010-04-01', value: 22.58 },
    { time: '2010-05-03', value: 21.02 },
    { time: '2010-06-01', value: 21.45 },
    { time: '2010-07-01', value: 22.42 },
    { time: '2010-08-02', value: 23.61 },
    { time: '2010-09-01', value: 24.40 },
    { time: '2010-10-01', value: 24.46 },
    { time: '2010-11-01', value: 23.64 },
    { time: '2010-12-01', value: 22.90 },
    { time: '2011-01-03', value: 23.73 },
    { time: '2011-02-01', value: 23.52 },
    { time: '2011-03-01', value: 24.15 },
    { time: '2011-04-01', value: 24.37 },
    { time: '2011-05-02', value: 24.40 },
    { time: '2011-06-01', value: 24.45 },
    { time: '2011-07-01', value: 24.24 },
    { time: '2011-08-01', value: 24.00 },
    { time: '2011-09-01', value: 22.77 },
    { time: '2011-10-03', value: 24.21 },
    { time: '2011-11-01', value: 23.40 },
    { time: '2011-12-01', value: 23.90 },
    { time: '2012-01-02', value: 24.84 },
    { time: '2012-02-01', value: 25.04 },
    { time: '2012-03-01', value: 24.90 },
    { time: '2012-04-02', value: 25.06 },
    { time: '2012-05-01', value: 24.63 },
    { time: '2012-06-01', value: 25.07 },
    { time: '2012-07-02', value: 25.30 },
    { time: '2012-08-01', value: 25.08 },
    { time: '2012-09-03', value: 25.27 },
    { time: '2012-10-01', value: 25.39 },
    { time: '2012-11-01', value: 25.06 },
    { time: '2012-12-03', value: 25.03 },
    { time: '2013-01-01', value: 25.26 },
    { time: '2013-02-01', value: 25.20 },
    { time: '2013-03-01', value: 25.30 },
    { time: '2013-04-01', value: 25.38 },
    { time: '2013-05-01', value: 25.22 },
    { time: '2013-06-03', value: 24.88 },
    { time: '2013-07-01', value: 24.98 },
    { time: '2013-08-01', value: 24.60 },
    { time: '2013-09-02', value: 24.65 },
    { time: '2013-10-01', value: 24.62 },
    { time: '2013-11-01', value: 24.65 },
    { time: '2013-12-02', value: 24.70 },
    { time: '2014-01-01', value: 24.98 },
    { time: '2014-02-03', value: 24.95 },
    { time: '2014-03-03', value: 25.45 },
    { time: '2014-04-01', value: 25.40 },
    { time: '2014-05-01', value: 25.51 },
    { time: '2014-06-02', value: 25.34 },
    { time: '2014-07-01', value: 25.30 },
    { time: '2014-08-01', value: 25.36 },
    { time: '2014-09-01', value: 25.16 },
    { time: '2014-10-01', value: 25.53 },
    { time: '2014-11-03', value: 25.40 },
    { time: '2014-12-01', value: 25.70 },
    { time: '2015-01-01', value: 25.95 },
    { time: '2015-02-02', value: 25.81 },
    { time: '2015-03-02', value: 25.63 },
    { time: '2015-04-01', value: 25.39 },
    { time: '2015-05-01', value: 25.62 },
    { time: '2015-06-01', value: 25.23 },
    { time: '2015-07-01', value: 25.47 },
    { time: '2015-08-03', value: 25.18 },
    { time: '2015-09-01', value: 25.30 },
    { time: '2015-10-01', value: 25.68 },
    { time: '2015-11-02', value: 25.63 },
    { time: '2015-12-01', value: 25.57 },
    { time: '2016-01-01', value: 25.55 },
    { time: '2016-02-01', value: 25.05 },
    { time: '2016-03-01', value: 25.61 },
    { time: '2016-04-01', value: 25.91 },
    { time: '2016-05-02', value: 25.84 },
    { time: '2016-06-01', value: 25.94 },
    { time: '2016-07-01', value: 26.19 },
    { time: '2016-08-01', value: 26.06 },
    { time: '2016-09-01', value: 25.65 },
    { time: '2016-10-03', value: 25.80 },
    { time: '2016-11-01', value: 25.06 },
    { time: '2016-12-01', value: 25.20 },
    { time: '2017-01-02', value: 25.70 },
    { time: '2017-02-01', value: 25.78 },
    { time: '2017-03-01', value: 25.90 },
    { time: '2017-04-03', value: 26.02 },
    { time: '2017-05-01', value: 26.02 },
    { time: '2017-06-01', value: 26.39 },
    { time: '2017-07-03', value: 26.30 },
    { time: '2017-08-01', value: 26.14 },
    { time: '2017-09-01', value: 26.39 },
    { time: '2017-10-02', value: 26.12 },
    { time: '2017-11-01', value: 25.81 },
    { time: '2017-12-01', value: 25.82 },
    { time: '2018-01-01', value: 26.06 },
    { time: '2018-02-01', value: 25.78 },
    { time: '2018-03-01', value: 25.75 },
    { time: '2018-04-02', value: 25.72 },
    { time: '2018-05-01', value: 25.75 },
    { time: '2018-06-01', value: 26.58 },
    { time: '2018-07-02', value: 26.14 },
    { time: '2018-08-01', value: 25.86 },
    { time: '2018-09-03', value: 25.67 },
    { time: '2018-10-01', value: 25.82 },
    { time: '2018-11-01', value: 25.41 },
    { time: '2018-12-03', value: 25.77 },
    { time: '2019-01-01', value: 25.35 },
    { time: '2019-02-01', value: 25.79 },
    { time: '2019-03-01', value: 25.77 },
    { time: '2019-04-01', value: 25.90 },
    { time: '2019-05-01', value: 26.23 },
];

var yearData = [
    { time: '2006-01-02', value: 24.89 },
    { time: '2007-01-01', value: 25.50 },
    { time: '2008-01-01', value: 23.90 },
    { time: '2009-01-01', value: 15.40 },
    { time: '2010-01-01', value: 22.00 },
    { time: '2011-01-03', value: 23.73 },
    { time: '2012-01-02', value: 24.84 },
    { time: '2013-01-01', value: 25.26 },
    { time: '2014-01-01', value: 24.98 },
    { time: '2015-01-01', value: 25.95 },
    { time: '2016-01-01', value: 25.55 },
    { time: '2017-01-02', value: 25.70 },
    { time: '2018-01-01', value: 26.06 },
    { time: '2019-01-01', value: 26.23 },
];

var seriesesData = new Map([
    ['1D', dayData],
    ['1W', weekData],
    ['1M', monthData],
    ['1Y', yearData],
]);

var switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);

var chartElement = document.createElement('div');

var chart = LightweightCharts.createChart(chartElement, {
    width: 600,
    height: 300,
    layout: {
        backgroundColor: '#000000',
        textColor: '#d1d4dc',
    },
    grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            color: 'rgba(42, 46, 57, 0.5)',
        },
    },
    rightPriceScale: {
        borderVisible: false,
    },
    timeScale: {
        borderVisible: false,
    },
    crosshair: {
        horzLine: {
            visible: false,
        },
    },
});

document.body.appendChild(chartElement);
document.body.appendChild(switcherElement);

var areaSeries = null;

function syncToInterval(interval) {
    if (areaSeries) {
        chart.removeSeries(areaSeries);
        areaSeries = null;
    }
    areaSeries = chart.addAreaSeries({
        topColor: 'rgba(76, 175, 80, 0.56)',
        bottomColor: 'rgba(76, 175, 80, 0.04)',
        lineColor: 'rgba(76, 175, 80, 1)',
        lineWidth: 2,
    });
    areaSeries.setData(seriesesData.get(interval));
}

syncToInterval(intervals[0]);

*/

