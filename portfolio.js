
// General debug simplicity.
function setHTML(x){
  document.getElementById("trick0_output").innerHTML = x;
}

function consoleLogger(){
  console.log(localStorage);
}



// Shopping Cart - uses localCart Object to store data, incorporating generalized interaction functions from above.

//State Reset for localStorage.

//localStorage.clear();
//console.log("Cart has been cleared.")


// Declare localCart as initial object clientside.
// Future functionality goal is to set itemPriceIndex from a database.
let localCart = {
  "name": [],
  "address": [],
  "order":[],
  "item1": 0,
  "itemPriceIndex" : {
    "item1": 799,
    //Avoiding decimals due to JS floating point calculation issues.
  },
}
// Checks + retrieves localCart state from localStorage. If none, sets it.
if (localStorage.getItem("localCart") !== null){
  localCart = JSON.parse(localStorage.getItem("localCart"));
} else {
  localStorage.setItem("localCart", JSON.stringify(localCart));
};

// Cart UX controls interact with localCart variable then update localStorage copy.

function plusItem(plusItemVar){
  localCart[plusItemVar]++;
  localStorage.setItem("localCart", JSON.stringify(localCart));
  updateCartUX();
};

function minusItem(minusItemVar){
  localCart[minusItemVar]--;
  // Allow no negative cart values.
  if (localCart[minusItemVar] <= 0) {
    localCart[minusItemVar] = 0;
  }
  localStorage.setItem("localCart", JSON.stringify(localCart));
  updateCartUX();
};

function itemClear(iCVar){
  localCart[iCVar] = 0;
  localStorage.setItem("localCart", JSON.stringify(localCart));
  updateCartUX();
}

// Page State Update

function updateCartUX(){
  document.getElementById("smartcart-numInCart-target").innerHTML = localCart["item1"];
  let eip = localCart["itemPriceIndex"]["item1"]/100;
  document.getElementById("example-item-price").innerHTML = eip.toFixed(2);
  document.getElementById("smartcart-total-target").innerHTML = itemTotal("item1").toFixed(2);
};

function itemTotal(iTVar){
  return localCart[iTVar]*localCart["itemPriceIndex"][iTVar]/100;
}

window.onload = updateCartUX();


// JavaScript Tricks: String Inversion Three Ways + Program Selector.

function invertStringSorter(iSSvar){
  // assesses radio button seleciton
  let sortType = document.querySelector('input[name="stringInversion"]:checked').value;
  if (sortType=="Array Methods"){
    document.getElementById("trick1_output_a").innerHTML = "Array Methods";
    document.getElementById("trick1_output_b").innerHTML = invertStringArray(iSSvar);

  } else if (sortType=="Decrementing Loop"){
    document.getElementById("trick1_output_a").innerHTML = "Decrementing Loop";
    document.getElementById("trick1_output_b").innerHTML = invertStringDecrementingLoop(iSSvar);
  } else if (sortType=="Recursion"){
    document.getElementById("trick1_output_a").innerHTML = "Recursion";
    document.getElementById("trick1_output_b").innerHTML = invertStringRecursion(iSSvar);
  } else {
    document.getElementById("trick1_output").innerHTML = "Ooops. Something went wrong with the trick1 radio buttons.";
  }
}

function invertStringArray(arrayInvert){
   return arrayInvert.split("").reverse().join("");
}

function invertStringDecrementingLoop(decrementingLoopVar){
  let dlInverted ="";
  for (let i = decrementingLoopVar.length - 1; i>=0; i--){
    dlInverted += decrementingLoopVar[i];
  }
  return dlInverted;
}

function invertStringRecursion(recursionVar){
  if (recursionVar === ""){
    return "";
  } else {
    return invertStringRecursion(recursionVar.substr(1))+recursionVar.charAt(0);
  }
}

// Convert to Roman

function convertToRoman(num) {
  const RNLOOKUP = [["","I","II","III","IV","V","VI","VII","VIII","IX",],
    ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
    ["", "C", "CC","CCC","CD","D","DC","DCC","DCCC","CM"],
    ["","M","MM","MMM","MMMM"]]
  let conversionVariable = "";
  let string = num.toString().split('').reverse();
  for (let i=0; i<string.length; i++){
    conversionVariable = RNLOOKUP[i][string[i]] + conversionVariable;
  }
  return conversionVariable;
}

// Odd / Even... after a long pause from seeing it.

const oddEven = (num) => {
  if (Number.isInteger(num)===false){
    return "Number is not an integer."
  } else if (num%2) {
    return "Number is Odd";
  } else {
    return "Number is Even";
  }
}

document.getElementById("project-target").innerHTML = "PROJECTS";
window.onload = console.log(convertToRoman(3235));
window.onload = console.log(oddEven(9));
