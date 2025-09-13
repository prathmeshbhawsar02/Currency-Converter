const BASE_URL =
  "https://v6.exchangerate-api.com/v6/155563dd3d59538de01f182a/latest/";// API's base url with api key

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
  
  
  const url=`${BASE_URL}${fromCurr.value}`; //custom api call according to fromCurr value

  let response=await fetch(url);// fetching api
  let data=await response.json();// getting api response

  let from=fromCurr.value;
  let to=toCurr.value;
   let rate = data["conversion_rates"][to];
   console.log(rate);
   
   let finalAmt= amtValue*rate;
   msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  
});
