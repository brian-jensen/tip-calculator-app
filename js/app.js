const form = document.querySelector("form");
const bill = document.querySelector("#bill");
const tipBtns = document.querySelectorAll(".tip-percent button");
const tipCustom = document.querySelector(".custom");
const people = document.querySelector("#people");
const tipAmount = document.querySelector(".tip-usd p");
const totalAmount = document.querySelector(".total-usd p");
const reset = document.querySelector('button[type="reset"]');
const errorSpan = document.querySelector('label[for="people"] span');

const toDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const numOnly = /[^\d]/g;
const decOnly = /[^\d.]|([.].*)[.]/g;
const percOnly = /[^\d.%]|([.].*)[.]/g;

form.reset();
reset.disabled = true;

const calculateTip = (bill, tip, people) => {
  const tipAmount = bill * (tip / 100) / people;
  const totalAmount = (bill + tipAmount) / people;
  displayTip(tipAmount, totalAmount);
};

const displayTip = (tip, total) => {
  tipAmount.textContent = toDollar.format(tip);
  totalAmount.textContent = toDollar.format(total);
};

tipBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", (e) => {
    const tipActive = document.querySelector(".tip-percent button.active");
    if (tipActive) tipActive.classList.remove("active");
    e.target.classList.add("active");
    Number(e.target.textContent.replace(decOnly, ''));
    handleEvents();
  });
});

const handleEvents = () => {
  const billValue = Number(bill.value.replace(decOnly, ''));
  const peopleValue = Number(people.value.replace(numOnly, ''));
  if (peopleValue > 0) {
    const tipActive = document.querySelector(".tip-percent button.active");
    const tip = tipActive
      ? Number(tipActive.textContent.replace(decOnly, ''))
      : Number(tipCustom.value.replace(decOnly, ''));
    people.classList.remove("error");
    errorSpan.style.opacity = 0;
    calculateTip(billValue, tip, peopleValue);
  } else {
    people.classList.add("error");
    errorSpan.style.opacity = 1;
  }
  reset.disabled = false;
};

tipCustom.addEventListener("keyup", (e) => {
  const tipActive = document.querySelector(".tip-percent button.active");
  if (tipActive) tipActive.classList.remove("active");
  e.target.value = e.target.value.replace(percOnly, '');
  handleEvents();
});

bill.addEventListener("keyup", (e) => {
  e.target.value = e.target.value.replace(decOnly, '');
  handleEvents();
});

people.addEventListener("keyup", (e) => {
  e.target.value = e.target.value.replace(numOnly, '');
  handleEvents();
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  tipAmount.textContent = toDollar.format(0);
  totalAmount.textContent = toDollar.format(0);
  people.classList.remove("error");
  errorSpan.style.opacity = 0;
  const tipActive = document.querySelector(".tip-percent button.active");
  if (tipActive) tipActive.classList.remove("active");
  reset.disabled = true;
});
