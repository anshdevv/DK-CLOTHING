let product_list = document.getElementById("products")
let cart_list = document.getElementById('cartlist')
let cart_button = document.getElementById('cart-button')
let cart_container = document.getElementById('cart')
let body = document.querySelector('body');
let total = document.getElementById('total')
let checkout = document.getElementById("check")
let close_button = document.getElementById("close")

let products = []
let cart = []
if (cart_button) {
    cart_button.addEventListener('click', () => {
        cart_container.classList.toggle('cartshow')
        body.classList.toggle('showCart')
    })
}

close_button.addEventListener('click', () => {
    cart_container.classList.toggle('cartshow')
    body.classList.toggle('showCart')

})




const fetch_prod = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            add_prod_to_html();



            // get data cart from memory
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                console.log(cart)
                addCartToHTML();
            }
        })

}

const add_prod_to_html = () => {
    if (products.length > 0) {
        products.forEach(product => {

            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
                <h2 class='title'>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            product_list.appendChild(newProduct);

        })
    }

}
if (product_list) {
    product_list.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('addCart')) {
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
}

function remove_zero() {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].quantity == 0) {
            cart.splice(i, 1)
        }
    }
}

const addCartToHTML = () => {
    // remove_zero()    
    cart_list.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('newitem');
            newItem.dataset.id = item.id;

            let positionProduct = products.findIndex((value) => value.id == item.id);
            let info = products[positionProduct];
            cart_list.appendChild(newItem);
            if (item.quantity > 0) {
                newItem.innerHTML = `
            <img src="${info.image}">
                <div class="name">${info.name}</div>


                <div class="quantity">
                    <span class="minus"> <button onclick=changeqty(${item.id},"minus")></button> </span>
                    <span>${item.quantity}</span>
                    <span class="plus"><button onclick=changeqty(${item.id},"plus")></button></span>
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
            `;
            }

            let total_cost = 0
            for (let i = 0; i < cart.length; i++) {
                total_cost += cart[i].quantity * info.price
            }
            total.innerHTML = `
            <h1>Total:${total_cost}</h1>
            
            `
        })
        checkout.innerHTML = `
        <button onclick=window.location="./checkout.html">checkout</button>
        `
    }
    remove_zero()
    // iconCartSpan.innerText = totalQuantity;
}


const changeqty = (product_id, op) => {
    let pos_prod = cart.findIndex((value) => value.id == product_id)



    if (cart[pos_prod].quantity > 0 && op == "minus") {
        cart[pos_prod].quantity = cart[pos_prod].quantity - 1;

    } if (cart[pos_prod].quantity > 0 && op == "plus") {
        cart[pos_prod].quantity = cart[pos_prod].quantity + 1;
    }
    console.log(cart)

    addCartToHTML();
    addCartToMemory();
}


const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.id == product_id);
    if (cart.length <= 0) {
        cart = [{
            id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }

    addCartToHTML();
    addCartToMemory();

}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

fetch_prod()