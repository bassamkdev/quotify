//get quote from api
const card = document.getElementById("card");
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterButton = document.getElementById("button-twitter");
const newQuoteButton = document.getElementById("button-new-quote");
const loader = document.getElementById("loader");
const retry = document.getElementById("retry");

let counter = 0;
const apiUrl =
  "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

async function getQuote(ApiUrl, proxyUrl) {
  showLoader();
  try {
    const response = await fetch(proxyUrl + ApiUrl);
    const data = await response.json();
    if (data.quoteText.length > 120) {
      quote.classList.add("card__quote--large");
    } else {
      quote.classList.remove("card__quote--large");
    }
    if (data.quoteAuthor === "") {
      author.innerText = "unknown";
    } else {
      author.innerText = data.quoteAuthor;
    }
    quote.innerText = data.quoteText;
    hideLoader();
  } catch (e) {
    if (counter < 5) {
      counter++;
      getQuote(ApiUrl, proxyUrl);
    } else {
      retry.hidden = false;
      loader.hidden = true;
    }
  }
}

function twitte() {
  const quoteText = quote.innerText;
  const quoteAuthor = author.innerText;
  window.open(
    `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`,
    "_blank"
  );
}

function showLoader() {
  author.hidden = true;
  quoteContainer.hidden = true;
  retry.hidden = true;
  loader.hidden = false;
}

function hideLoader() {
  author.hidden = false;
  quoteContainer.hidden = false;
  loader.hidden = true;
}

getQuote(apiUrl, proxyUrl);

newQuoteButton.addEventListener("click", () => {
  getQuote(apiUrl, proxyUrl);
});

twitterButton.addEventListener("click", twitte);
