function formatDate(date) {
    let dd = date.getDate()
    if (dd < 10) dd = '0' + dd
    let mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm
    let yy = date.getFullYear() % 100
    if (yy < 10) yy = '0' + yy
    return dd + '.' + mm + '.' + yy
}

let d = new Date();
const dateheader = document.querySelector('header')
dateheader.innerHTML = formatDate(d)
const bicycleInput = document.querySelector('.bicycle-input')
const toFixInput = document.querySelector('.tofix-input')
const phoneInput = document.querySelector('.phone-input')
const priceInput = document.querySelector('.price-input')
const repairQueue = document.querySelector('.repair-queue')
const repairQueueAddButton = document.querySelector('.repair-queue-add-button')
const soldItemInput = document.querySelector('.sold-item-input')
const soldItemPriceInput = document.querySelector('.sold-item-price-input')
const soldItemsQueue = document.querySelector('.solditems-queue')
const soldQueueAddButton = document.querySelector('.sold-queue-add-button')
let totalCash = 0;
let itemCounter = 0;
var output = ``;

function addRepairItem() {
    if (bicycleInput.value != '') {
        const repairItem = document.createElement('li')
        const fixedButton = document.createElement('button')
        const fixedPaidButton = document.createElement('button')
        fixedPaidButton.className = 'fixed-paid-button'
        fixedPaidButton.innerHTML = 'Оплачен'
        fixedPaidButton.id = itemCounter
        fixedButton.className = 'fixed-button'
        fixedButton.innerHTML = 'Готово, можно забирать'
        fixedButton.id = itemCounter
        repairItem.id = itemCounter
        repairQueue.appendChild(repairItem)
        repairQueue.appendChild(fixedButton)
        repairQueue.appendChild(fixedPaidButton)
        repairItem.innerHTML = `${bicycleInput.value}: ${toFixInput.value} Телефон(${phoneInput.value}). К оплате ${priceInput.value} BYN. Дата заказа: ${formatDate(d)} `;
        bicycleInput.value = ''
        toFixInput.value = ''
        phoneInput.value = ''
        priceInput.value = ''
        output += repairItem.innerHTML
        itemCounter++
        fixedButton.addEventListener('click', orderDone)
        fixedPaidButton.addEventListener('click', orderPaid)
    }
}

repairQueueAddButton.addEventListener("click", addRepairItem)

function orderPaid(event) {
    let target = document.getElementById(event.currentTarget.id)
    if (event.target.className == 'fixed-paid-button') {
        console.log(target)
        target.nextSibling.remove()
        event.originalTarget.remove()
        let soldStringValue = target.innerHTML.slice()
        soldItemsQueue.append(target)
        let splittedStringID = soldStringValue.split(' ').indexOf('BYN.')
        totalCash += +soldStringValue.split(' ')[splittedStringID - 1]
        document.querySelector('.total-cash').innerHTML = 'Всего выручка: ' + totalCash + ' BYN'
    }
}

function orderDone(event) {
    let target = document.getElementById(event.currentTarget.id)
    if (event.target.className == 'fixed-button') {
        target.classList.add('order-done')
    }
}

function addSoldItem() {
    if (soldItemInput.value != '') {
        const soldItem = document.createElement('li')
        soldItemsQueue.appendChild(soldItem)
        soldItem.innerHTML = soldItemInput.value + ' ' + soldItemPriceInput.value + ' BYN';
        soldItemInput.value = ''
        soldItemPriceInput.value = ''
        totalCash += +soldItemPriceInput.value
        document.querySelector('.total-cash').innerHTML = 'Всего выручка: ' + totalCash + ' BYN'

        output += soldItem.innerHTML
    }
}

soldQueueAddButton.addEventListener("click", addSoldItem)


// let button = document.getElementById('download');
// button.addEventListener('click', download);
//
//
// function download() {
//     document.write('<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(output) + '" download="отчёт.txt">отчёт.txt</a>')
// }