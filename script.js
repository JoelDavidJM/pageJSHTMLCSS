let cartIcon = document.getElementById('cart-icon')
let cart = document.getElementsByClassName('cart')[0]
let closeCart = document.getElementById('close-cart')

cartIcon.onclick = () => {
    cart.classList.add('active')
}

closeCart.onclick = () => {
    cart.classList.remove('active')
}

// initialized events
function initializeCartEvent() {
    let removeCartButtons = Array.from(document.getElementsByClassName('cart-remove'))
    removeCartButtons.forEach(button => button.addEventListener('click', removeCartItem))
    let quantityInput = Array.from(document.getElementsByClassName('cart-quantity'))
    quantityInput.forEach(input => input.addEventListener('change', quantityChanged))
    let addCart = Array.from(document.getElementsByClassName('btn-cart'))
    addCart.forEach(button => button.addEventListener('click', addCartClicked))
    document.getElementsByClassName('cart__btn')[0].addEventListener('click', buyButtonClicked)
}

initializeCartEvent()

// button of the card
function buyButtonClicked() {
    alert('You have made a purchase')
    let cartContent = document.getElementsByClassName('card__content')[0]
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

// remove product
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

// event so that the values ​​are less than 0
function quantityChanged(event) {
    let input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function addCartClicked(event) {
    let button = event.target;
    // search for the closest ancestor
    let shopProduct = button.closest('.product-box'); 
    let title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    let price = shopProduct.getElementsByClassName('price')[0].innerText;
    let productImg = shopProduct.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal()
}

function addProductToCart(title, price, productImg) {
    let cartItems = document.getElementsByClassName('card__content')[0]
    let cartItemsNames = cartItems.getElementsByClassName('card-product-title')
    for (let i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText === title) {
            alert('The selected item is already in the cart');
            return
        }
    }
    let cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    let cartBoxContent = `
    <img src="${productImg}" alt="" class="card__img">
        <div class="detail-box">
            <h2 class="card-product-title">${title}</h2>
            <div class="card-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash cart-remove'></i>
    `
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

function updateTotal() {
    let cartContent = document.getElementsByClassName('card__content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0
    for(let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('card-price')[0]
        let price = parseFloat(priceElement.innerText.replace('$', '').trim())
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let quantity = quantityElement.value
        if(!isNaN(price)) {
            total += price * quantity
        }
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart__total-price')[0].innerText = '$' + total
}