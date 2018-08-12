const URL = "https://api.jsonbin.io/b/5b683d097b212953678c03dd";
// const xhr = new XMLHttpRequest();

var xhr = new XMLHttpRequest();
xhr.responseType = "json";

xhr.addEventListener('load', function (evt) {
    console.log(xhr.response);
});

xhr.open('GET', URL);
xhr.send();
