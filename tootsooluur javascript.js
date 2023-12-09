var input_amount = document.getElementById("original-currency-amount");
var from_currency = document.getElementById("from_currency");
var to_currency = document.getElementById("to_currency");
var exchange_rate = document.getElementById("exchange-rate");
var exchange = document.getElementById("exchange");
var output_amount = document.getElementById("output-text");
var output_from = document.getElementById("from");
var output_to = document.getElementById("to");

exchange.addEventListener("click", () => {
  [from_currency.value, to_currency.value] = [
      to_currency.value,
      from_currency.value,
  ];
  calculate();
});

var to_amount = 0;

function calculate() {
  const from_currency_value = from_currency.value;
  const to_currency_value = to_currency.value;
  const input_amount_value = parseFloat(input_amount.value);

  // Check if input_amount is a valid number
  if (isNaN(input_amount_value) || input_amount_value <= 0) {
      alert("Дүнгийн хувьд зөв эерэг тоо оруулна уу.");
      return; // Stop execution if input is invalid
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency_value}`)
      .then((res) => res.json())
      .then((res) => {
          const rate = res.rates[to_currency_value];
          exchange_rate.value = `${rate}`;
          to_amount = (input_amount_value * rate).toFixed(3);
          output_from.innerText = `${input_amount_value} ${from_currency_value}`;
          output_to.innerText = `${to_amount} ${to_currency_value}`;
          output_amount.style.display = "block";
      })
      .catch((error) => {
          console.error("Error fetching exchange rate:", error);
          alert("Валютын ханшийг татахад алдаа гарлаа. Дараа дахин оролдож үзнэ үү.");
      });
}

document.getElementById("exchange_button").addEventListener("click", () => {
  calculate();
});
