const form=document.getElementById('form');
const username= document.getElementById('username');
const password=document.getElementById('password');
const password2=document.getElementById('password2');
const email=document.getElementById('email');


function showError(input,message)
{
    const formcontrol=input.parentElement;
    formcontrol.className='form-control error';
    const small= formcontrol.querySelector('small');
    small.innerText=message;
}

function showSuccess(input)
{
    const formcontrol=input.parentElement;
    formcontrol.className='form-control success';
}


function checkEmail(input)
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }else{
        showError(input,'Enter valid Email');
    }
}

//add eventlistener
/*form.addEventListener("submit",function(e){
    e.preventDefault(); // on submit it will submit but not stop, try printing to console to understand. so we r preventing the dfault action
   THIS IS BAD CODE
    if(username.value===''){
        showError(username,'Username is required');
    }
    else{
        showSuccess(username);
    }
    if(email.value===''){
        showError(email,'Email is required');
    }
    else if(!isValidEmail(email.value)){
        showError(email,'Email is not valid!');
    }
    else{
        showSuccess(email);
    }
    if(password.value===''){
        showError(password,'Password is required');
    }
    else{
        showSuccess(password);
    }
    if(password2.value===''){
        showError(password2,'Confirm password');
    }
    else{
        showSuccess(password2);
    }    
})*/

// this is better- clean, for scalability etc etc

function checkRequired(inputarr)
{
    let flag=0;
    inputarr.forEach(input => {
    if(input.value.trim()===''){
        showError(input,`${getFieldName(input)} is required`);
    }
    else{
        showSuccess(input);
        flag++;
    }
    });
}

    // function to make the first letter caps
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input,min,max)
{
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} should be atleast ${min} characters`);
    }
    else if(input.value.length>max){
        showError(input,`${getFieldName(input)} should not exceed ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}

function checkPasswordMatch(input1,input2)
{
    if(input1.value!==input2.value){
        showError(input2,'Passwords should match');
    }
}
form.addEventListener("keyup", function(){
    if(username.value.length<5){
        showError(username,'Username must be atleast 5 characters');
    }
    else if(username.value.length>15){
        showError(username,'Username must not exceed 15 characters');
    }
    else{
        showSuccess(username);
    }
})
form.addEventListener("submit", function(e){
    e.preventDefault();

    checkRequired([username,email,password,password2]);
    checkLength(username,5,15);
    checkLength(password,5,15);
    checkEmail(email);
    checkPasswordMatch(password,password2);
})