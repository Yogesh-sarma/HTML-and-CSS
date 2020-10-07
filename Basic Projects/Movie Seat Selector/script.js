const container= document.querySelector('.container');
const seats= document.querySelectorAll('.row .seat:not(.occupied)');// .row becoz we want seats in row class not from showcase class
const movieSelect=document.getElementById('movie');
const count= document.getElementById('count');
const total=document.getElementById('total');

populateUI();

let ticketPrice= +movieSelect.value; //this is a string
// convert to number using either '+' (ticketprice=+movieSelect.value) or parseInt()


//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    //no need to json.stringify as it is already a string
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}


//update total and count
function updateSelectedCount(){
    const selectedSeats= document.querySelectorAll('.row .seat.selected');
    
    //copy selectedSeats(nodelist) into arr
    // map through array
    //map function returns an array, forEach doesnot return anything, its just a loop
    // return a new array of indexes
    const seatsIndex=[...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    // storing the selected seats in local storage.
    // we apply stringify on array as we need a string
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount= selectedSeats.length;
    count.innerText= selectedSeatsCount;
    total.innerText= selectedSeatsCount * ticketPrice;
}


//get data from localstorage and populate UI
function populateUI()
{
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!==null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1)
            {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex= localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!==null){
        movieSelect.selectedIndex= selectedMovieIndex;
    }
}


//movie select event
movieSelect.addEventListener('change',(e) =>{
    //changing ticketprice when changing the movie.
    ticketPrice= +e.target.value;
    //not passing ticketPrice as it is a number and not a string.
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});




//seat click event
// we can take seats(its a nodelist) and loop through it and add eventlistener
// but a better way to do it is to take the container(ancestor of seat and row) and add eventlistener to click
// and make sure we r clicking only the seats
container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
 
        //noOfSeats is nodelist of all seats selected
        const noOfSeats= document.querySelectorAll('.row .seat.selected');
 
        //storing name of div element of small tag
        const errorElement=document.getElementsByClassName('textWrapper')[0];
        
        //update count if length is less than 5
        //else change class name to textwrapper error
        if(noOfSeats.length <= 5){
            errorElement.className='textWrapper';
            updateSelectedCount();
        }
        else{
            errorElement.className='textWrapper error';
            noOfSeats[noOfSeats.length-1].classList.toggle('selected');
            setTimeout(()=> {errorElement.className='textWrapper';}, 5000)
        }
    }
 
});


submit.addEventListener('click',(e)=>{

});

//initial count and total set
updateSelectedCount();