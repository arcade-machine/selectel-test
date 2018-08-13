const URL = "https://api.jsonbin.io/b/5b683d097b212953678c03dd";
const configList = document.querySelector(".main-content__configs");
const cardTemplate = document.querySelector("#config-template")
    .content
    .querySelector(".card");
const loader = configList.querySelector(".config__loader");
const networkError = document.querySelector("#config-template")
    .content
    .querySelector(".config__error");


window.load = function() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    
    xhr.addEventListener("loading", function () {
        configList.appendChild(loader);
    });

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            onSuccess(xhr.response);
            removeLoader(loader);
        } else {
            onError(networkError);
            removeLoader(loader);
        }
    });

    xhr.open('GET', URL);
    xhr.send();
};

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

const onError = function (errorMessage) {
    configList.appendChild(errorMessage);
};

const removeLoader = function (loaderIcon) {
    configList.removeChild(loaderIcon);
};

window.load();

