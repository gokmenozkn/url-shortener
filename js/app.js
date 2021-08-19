"use strict";
import { createCopyLinkField } from './Field.js';

const url = "https://api.shrtco.de/v2/shorten";
const input = document.querySelector(".form__input");
const form = document.querySelector(".form");
const inputParent = document.querySelector(".link-input");
const main = document.querySelector(".main");
const dropdown = document.querySelector(".dropdown");
const mobile = document.querySelector(".mobile");

var INPUT_VALUE = "";
let isOpen = false;

function displayLoading() {
  var isLoadingExist = document.querySelector(".loading");

  if (!isLoadingExist) {
    let div = document.createElement("div");
    div.className = "loading";
    div.innerHTML = `<img width="50" height="50" src="/img/loading.gif" >`;
    main.after(div);
  };
}

function removeLoading() {
  var loading = document.querySelector(".loading");
  loading.remove();
}

function shorten(value) {
  let shortUrl;
  displayLoading();

  axios.get(url, {
    params: {
      url: value
    }
  }).then((res) => {
    var { result } = res.data;
    shortUrl = result.short_link;
    createCopyLinkField(inputParent, value, shortUrl);
    removeLoading();
  })
    .catch((err) => console.log(err));
}

input.addEventListener("input", (e) => {
  INPUT_VALUE = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  shorten(INPUT_VALUE);
});

mobile.addEventListener("click", () => {
  isOpen = !isOpen;
  dropdown.style.display = isOpen ? "block" : "none";
});