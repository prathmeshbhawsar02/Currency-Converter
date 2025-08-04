const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
console.log(dropdowns);
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.addEventListener("change", (event) => {
      updateFlag(event.target);
    });
  }
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countrycode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  
  if ((amtValue === "" || amtValue <= 0)) {
    amtValue = 1;
    amount.value = 1;
  }
  
  
  const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;

  let response=await fetch(url);
  let data=await response.json();

  let from=fromCurr.value.toLowerCase();
  let to=toCurr.value.toLowerCase();
   let rate=data[from][to];
   let finalAmt= amtValue*rate;
   msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  
});
