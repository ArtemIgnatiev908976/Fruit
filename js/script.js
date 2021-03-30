document.addEventListener('DOMContentLoaded', () => {

//добавили переключение по слайдеру и анимацию
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })


    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
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
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),

            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock() {
            const timer = getTimeRemaining(endTime);

            days.innerHTML = getZero(timer.days);
            hours.innerHTML = getZero(timer.hours);
            minutes.innerHTML = getZero(timer.minutes);
            seconds.innerHTML = getZero(timer.seconds);

            if (timer.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }


//Реализация таймера на странице
    setClock('.timer', deadline)


    //Модальное окно
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');
//добавили на все кнопки перебором forEach
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)

    });

//Функция открытия модалки
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';  // убераем скролл на станице
        clearInterval(modalTimerId); // если открыли окно то не выскакивает
    }

//Функция открытия модалки


    // функция закрытия модалки
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // функция закрытия модалки

    modalCloseBtn.addEventListener('click', closeModal)
    //Модальное окно


//Закрывать модалку если кликать вне заны моодалки
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })
//Закрывать модалку если кликать вне заны моодалки


    //по нажатию на ESC закрывается модалка
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    })
//по нажатию на ESC закрывается модалка


// показ модалки через 6 сек
    const modalTimerId = setTimeout(openModal, 116000)
    // показ модалки через 6 сек

    //показ модалки когда доходим до конца страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // если показали1 раз больше не выскакивает
            window.removeEventListener('scroll', showModalByScroll); // если показали1 раз больше не выскакивает
        }

    }

    //показ модалки когда доходим до конца страницы
    window.addEventListener('scroll', showModalByScroll)
    //показ модалки когда доходим до конца страницы




    ////используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price,parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 75;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {


            const element = document.createElement('div');
if(this.classes.length === 0){
    this.element = 'menu__item';
    element.classList.add(this.element);
    // если не был переданы классы сформируем их самостоятельно
}
else {
    this.classes.forEach(className =>element.classList.add(className));
}



            element.innerHTML = `
            
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                
            `;
            this.parent.append(element);
        }


    }
    ////используем классы для карточек

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        '"Фитнес"',
       'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
       9,
        '.menu .container',
        'menu__item',
        'big'

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        '"Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан',
        3,
        '.menu .container',
        'menu__item',
        'big'

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        '"Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        6,
        '.menu .container',
        'menu__item',
        'big'

    ).render();




    ////используем классы для карточек



// Rest оператор







});










