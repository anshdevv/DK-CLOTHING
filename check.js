// import smtp from 'smtp.js'
let sumary = document.getElementById('odersummary');
let prod = []
let cart = []
let total = 0
// let form = document.getElementById("form")
let order_id = 100001
const service_id = "service_zt8n7vy"
const tempelate_id = "template_n9ohl5i"

function sendEmail() {
    event.preventDefault()
    var params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('ph-num').value,
        address: document.getElementById('address').value,
        message: JSON.stringify(cart)

    };
   if (email.value != "") {
        emailjs.send(service_id, tempelate_id, params)
            .then((res) => {
                console.log("done")
                alert("order placed we will reach out shortly ")
                window.location = "./index.html"
                localStorage.clear()
            })
            .catch((err) => console.log(err))
    }else{
        alert("field Empty")
    }
}



function get_prod() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            prod = data;
            console.log(prod)
            to_html()
        })
}
function to_html() {
    cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(item => {
        let prod_div = document.createElement('div')
        prod_div.classList.add("check_prod")
        let position = prod.findIndex((value) => value.id == item.id)
        let product_item = prod[position]
        prod_div.innerHTML =
            `<div class="summ">
         <img src="${product_item.image}">
                <div class="name">${product_item.name}</div>
                <div class="totalPrice">RS${product_item.price * item.quantity}</div>
        </div>
        `
        total = total + (product_item.price * item.quantity)
        sumary.appendChild(prod_div)

    });
    let total_div = document.createElement('div')
    total_div.classList.add("total")
    total_div.innerHTML =
        `<h1>Total:</h1>
        <h1>RS${total}</h1>
        
        `

    sumary.appendChild(total_div)

}

get_prod()
// form_to_html()
