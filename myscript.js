
function handleCostKeydown(event){
    if(event.key === 'Enter'){
    calculateTotal();

}

}
function calculateTotal(){
    const inputElement = document.querySelector('.js-textinput').value;
    let cost = Number(inputElement);

    if(cost < 40){
        cost = cost + 10;
    }
   
   
    document.querySelector('.js-total-cost')
        .innerHTML = `Total Cost is $${cost}`;


}

function subscribe(){
    const btnElement = document.querySelector('.js-subscribe-btn');

    if(btnElement.innerText === 'Subscribe'){
        btnElement.innerHTML = 'Subscribed';
        btnElement.classList.add('is-subscribed');
    }
    else{
        btnElement.innerHTML = 'Subscribe';
        btnElement.classList.remove('is-subscribed');
    }

}