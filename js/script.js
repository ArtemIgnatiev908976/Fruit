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
    // const modalCloseBtn = document.querySelector('[data-close]');
    //добавили на все кнопки перебором forEach
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)

    });

    //Функция открытия модалки
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // убераем скролл на станице
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

    // modalCloseBtn.addEventListener('click', closeModal)
    //Модальное окно


    //Закрывать модалку если кликать вне заны моодалки
    modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
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
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
                // если не был переданы классы сформируем их самостоятельно
            } else {
                this.classes.forEach(className => element.classList.add(className));
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


    const getResource = async(url) => {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }


            return await res.json(); //промис


        }
        //     ////используем классы для карточек
        // getResource(' http://localhost:3000/menu')
        //     .then(data =>{
        //         data.forEach(({img, altimg, title, descr, price}) =>{
        //            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        //         });
        //     })

    axios.get(' http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // ////используем классы для карточек

    // getResource(' http://localhost:3000/menu')
    //     .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({ img, altimg, title, descr, price }) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML =
                `

                    <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> руб/день</div>
                    </div>

                `;
            document.querySelector('.menu .container').append(element);

        });
    }


    // Rest оператор


    //Реализация скрипта для отправки данных
    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что то пошло не так...'
    };


    forms.forEach(item => {
            bindPostData(item);
        })
        //ассинхронный код
    const postData = async(url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: data
        });
        return await res.json(); //промис


    }


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)

            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                })


        })
    }

    //Реализация скрипта для отправки данных
    //Forms


    //красивое оповещение пользователя

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>×</div> 
        <div class="modal__title">${message}</div>  
        </div>
        
        `;


        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res))

    //красивое оповещение пользователя

    //API

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {'Content-type': 'application/json'}
    //
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    //
    //API


    //Слайдер


    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');


    let slideIndex = 1;
    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }



    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }


    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);

    })

    next.addEventListener('click', () => {
        plusSlides(+1);

    })

    //Слайдер


});