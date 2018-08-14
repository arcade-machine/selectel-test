const URL = "https://api.jsonbin.io/b/5b683d097b212953678c03dd";
const configList = document.querySelector(".main-content__configs");
const cardTemplate = document.querySelector("#config-template").querySelector(".card");
const loader = configList.querySelector(".main-content__loader");
const networkError = document.querySelector("#config-template").querySelector(".config__error");

// создание запроса
window.load = function() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        try {
            var massive = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                onSuccess(massive);
                removeLoader(loader);
            } else {
                onError(networkError);
                removeLoader(loader);
            }
        } catch (err) {
            console.error(err.message);
        }
    });

    xhr.open('GET', URL);
    xhr.send();
};

// добавление элементов на основании массива
const onSuccess = function(card) {
    for (var i = 0; i < card.length; i++) {
        const cardGenerator = cardTemplate.cloneNode(true);

        cardGenerator.querySelector(".card__cpu").textContent = card[i].cpu;
        cardGenerator.querySelector(".card__hdd").textContent = card[i].hdd + " ГБ";
        cardGenerator.querySelector(".card__ram").textContent = card[i].ram + " ГБ";
        cardGenerator.querySelector(".card__price").textContent = card[i].price.toLocaleString() + " ₽/мес.";

        configList.appendChild(cardGenerator);
    }
};

// сообщение об ошибке
const onError = function (errorMessage) {
    configList.appendChild(errorMessage);
};

// иконка загрузки
const removeLoader = function (loaderIcon) {
    configList.removeChild(loaderIcon);
};

window.load();
