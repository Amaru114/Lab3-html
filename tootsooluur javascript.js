
const inputAmount = document.getElementById("original-currency-amount");
const fromCurrency = document.getElementById("from_currency");
const toCurrency = document.getElementById("to_currency");
const exchangeRate = document.getElementById("exchange-rate");
const exchangeButton = document.getElementById("exchange_button");
const outputAmount = document.getElementById("output-text");
const outputFrom = document.getElementById("from");
const outputTo = document.getElementById("to");


exchangeButton.addEventListener("click", () => {
  calculate();
});


exchange.addEventListener("click", () => {
  swapCurrencies();
  calculate();
});


function swapCurrencies() {
  [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
}


function calculate() {
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;
  const inputAmountValue = parseFloat(inputAmount.value);


  if (isNaN(inputAmountValue) || inputAmountValue <= 0) {
    alert("Дүнгийн хувьд зөв эерэг тоо оруулна уу.");
    return; 
  }


  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch exchange rate.");
      }
      return res.json();
    })
    .then((data) => {
      const rate = data.rates[toCurrencyValue];
      exchangeRate.value = `${rate}`;
      const toAmount = (inputAmountValue * rate).toFixed(3);
      outputFrom.innerText = `${inputAmountValue} ${fromCurrencyValue}`;
      outputTo.innerText = `${toAmount} ${toCurrencyValue}`;
      outputAmount.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching exchange rate:", error);
      alert("Валютын ханшийг татахад алдаа гарлаа. Дараа дахин оролдож үзнэ үү.");
    });
}
