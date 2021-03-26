


document.addEventListener('DOMContentLoaded', ()=>{

//добавили переключение по слайдеру и анимацию
const tabs =document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');

function hideTabContent(){
    tabsContent.forEach(item=>{
        item.classList.add('hide');
        item.classList.remove('show','fade');
    });
}

tabs.forEach(item => {
    item.classList.remove('tabheader__item_active');
})


    function showTabContent(i =0){
    tabsContent[i].classList.add('show','fade')
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event)=>{
    const target = event.target;

    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach((item,i)=>{
            if (target == item){
                hideTabContent();
                showTabContent(i);
            }
        })

    }

//добавили переключение по слайдеру и анимацию
})

//Реализация таймера на странице

const deadline = '2021-06-11';

//фукция получения разницы между датами
function getTimeRemaining(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 *24)),
        hours = Math.floor((t/(1000 * 60 *60) % 24)),
        minutes = Math.floor((t / 1000 / 60 ) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return{
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}


function getZero(num){
    if(num>=0 && num <10){
        return `0${num}`;
    }
    else{
        return num;
    }
}




function setClock(selector,endTime){
    const timer = document.querySelector(selector),

    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock,1000)

    updateClock();

    function updateClock(){
        const timer = getTimeRemaining(endTime);

        days.innerHTML = getZero(timer.days) ;
        hours.innerHTML =getZero (timer.hours);
        minutes.innerHTML =getZero (timer.minutes);
        seconds.innerHTML =getZero(timer.seconds) ;

        if(timer.total <=0){
            clearInterval(timeInterval);
        }
    }

}


//Реализация таймера на странице
setClock('.timer', deadline)


    //Модальное окно

    const modalTrigger = document.querySelector('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.addEventListener('click', ()=>{
        modal.classList.add('show');
        modal.classList.remove('hide');
    })
    modalCloseBtn.addEventListener('click', ()=>{
        modal.classList.add('hide');
        modal.classList.remove('show');

    })
    //Модальное окно
});




////////////////////////////////////



//