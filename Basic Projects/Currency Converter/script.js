const currency_one= document.getElementById('currency-one');
const currency_two= document.getElementById('currency-two');
const amt_one= document.getElementById('amount-one');
const amt_two= document.getElementById('amount-two');

const rate=document.getElementById('rate');
const swap=document.getElementById('swap');


function calculate(){
    const curr_one = currency_one.value;
    const curr_two= currency_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${curr_one}`)
    .then(res => res.json())
    .then(data=> {
        const rateee= data.rates[curr_two];
        rate.innerText= `1 ${curr_one}= ${rateee} ${curr_two}`;
        amt_two.value = (amt_one.value * rateee).toFixed(2);
    });
}

currency_one.addEventListener('change',calculate);
amt_one.addEventListener('input',calculate);
currency_two.addEventListener('change',calculate);
amt_two.addEventListener('input',calculate);

swap.addEventListener('click',()=>{
    const temp= currency_one.value;
    currency_one.value= currency_two.value;
    currency_two.value= temp;
    calculate();
});
