
// card hover in home page

let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .item');
let countItem = items.length;
let active = 1;
let other_1 = null;
let other_2 = null;
next.onclick = () => {
    carousel.classList.remove('prev');
    carousel.classList.add('next');
    active =active + 1 >= countItem ? 0 : active + 1;
    other_1 =active - 1 < 0 ? countItem -1 : active - 1;
    other_2 = active + 1 >= countItem ? 0 : active + 1;
    changeSlider();
}
prev.onclick = () => {
    carousel.classList.remove('next');
    carousel.classList.add('prev');
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    other_1 = active + 1 >= countItem ? 0 : active + 1;
    other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
    changeSlider();
}
const changeSlider = () => {
    let itemOldActive = document.querySelector('.carousel .item.active');
    if(itemOldActive) itemOldActive.classList.remove('active');

    let itemOldOther_1 = document.querySelector('.carousel .item.other_1');
    if(itemOldOther_1) itemOldOther_1.classList.remove('other_1');

    let itemOldOther_2 = document.querySelector('.carousel .item.other_2');
    if(itemOldOther_2) itemOldOther_2.classList.remove('other_2');

    items.forEach(e => {
        e.querySelector('.image img').style.animation = 'none';
        e.querySelector('.image figcaption').style.animation = 'none';
        void e.offsetWidth;
        e.querySelector('.image img').style.animation = '';
        e.querySelector('.image figcaption').style.animation = '';
    })

    items[active].classList.add('active');
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');

    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        next.click();
    }, 5000);
}



// product

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list2');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('.sec-2');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'FOUNDATION',
        image: '1b.png',
        price: 300
    },
    {
        id: 2,
        name: 'MASCARA',
        image: '2b.png',
        price: 400
    },
    {
        id: 3,
        name: 'LIQUID EYELINER',
        image: '3b.png',
        price: 600
    },
    {
        id: 4,
        name: 'RED LIPSTICK',
        image: '4b.png',
        price: 250
    },
    {
        id: 5,
        name: 'PRODUCT NAME ',
        image: '5b.jpg',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME ',
        image: '6b.jpg',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item1');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">&#x20B1;${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>&#x20B1;${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}



//reveal cards when you scroll down and hide when up

let lastScrollTop = 0;
function revealCards() {
    const cards = document.querySelectorAll('.card1');
    const windowHeight = window.innerHeight;
    const scolltop = window.pageYOffset || document.document.Element.scrolltop;
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top + scolltop;
        if (cardTop < windowHeight + scolltop - 50) {
            card.classList.add('visible');
            card.classList.remove('hidden');
        }else{
            card.classList.remove('visible');
            card.classList.add('hidden');
        }
    });
    lastScrollTop = scolltop <= 0 ? 0 : scolltop;
}

window.addEventListener('scroll', ()=>{
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
        revealCards();
    }else{
        hideCards();
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

function hideCards(){
    const cards = document.querySelectorAll('.card1');
    cards.forEach(card => {
        card.classList.remove('visible');
        card.classList.add('hidden');
    });
}

revealCards();


//fuction to livechat in contact us

function startLiveChat() {
    alert("Starting live chat...");
}



//smooth navigationBar scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
