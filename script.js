const radioInputs = document.querySelectorAll('input[type="radio"]');

radioInputs.forEach((input) => {
  input.addEventListener("change", function () {
    // Reset the background color for all parent containers
    radioInputs.forEach((radio) => {
      radio.parentElement.style.backgroundColor = "";
    });

    // Change the background color of the selected input's parent container
    if (input.checked) {
      input.parentElement.style.backgroundColor = "hsla(60, 70%, 52%, .2)";
      input.parentElement.style.borderColor = "hsl(60, 70%, 52%)";
    }
  });
});

const mortAmount = document.getElementById("mortAmount");
const mortTerm = document.getElementById("mortTerm");
const interestRate = document.getElementById("interestRate");
const typeRepayment = document.getElementById("repayment");
const typeInterestOnly = document.getElementById("interestOnly");
const submitBtn = document.getElementById("submit");

const calculate = (e) => {
  e.preventDefault();
  const amount = parseFloat(mortAmount.value);
  const term = parseFloat(mortTerm.value) * 12; // Convert years to months
  const rate = parseFloat(interestRate.value) / 100 / 12; // Convert annual rate to monthly
  const repayment = typeRepayment.checked;
  const interestOnly = typeInterestOnly.checked;
  const emptyResult = document.querySelector(".empty-results");
  const completedResult = document.querySelector(".completed-results");
  const monthlyPaymentHtml = document.getElementById("monthlyPay");
  const totalRepayHtml = document.getElementById("totalRepay");

  if (
    isNaN(amount) ||
    isNaN(term) ||
    isNaN(rate) ||
    amount <= 0 ||
    term <= 0 ||
    rate <= 0 ||
    (!repayment && !interestOnly)
  ) {
    alert("Please fill in all fields with valid numbers.");
    return;
  } else if (repayment) {
    const monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -term));
    const totalPayment = monthlyPayment * term;
    emptyResult.style.display = "none";
    completedResult.style.display = "flex";
    monthlyPaymentHtml.innerHTML = `$${monthlyPayment.toFixed(2)}`;
    totalRepayHtml.innerHTML = `$${totalPayment.toFixed(2)}`;
    //clear input fields
    mortAmount.value = "";
    mortTerm.value = "";
    interestRate.value = "";
    // uncheck radio buttons
    typeRepayment.checked = false;
    return;
  } else if (interestOnly) {
    const monthlyPayment = amount * rate;
    const totalPayment = monthlyPayment * term;
    emptyResult.style.display = "none";
    completedResult.style.display = "flex";
    monthlyPaymentHtml.innerHTML = `$${monthlyPayment.toFixed(2)}`;
    totalRepayHtml.innerHTML = `$${totalPayment.toFixed(2)}`;
    //clear input fields
    mortAmount.value = "";
    mortTerm.value = "";
    interestRate.value = "";
    // uncheck radio buttons
    typeInterestOnly.checked = false;
    return;
  }
};

submitBtn.addEventListener("click", calculate);
