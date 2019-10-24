if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
    update()
}

function ready()
{
  var removeBtns = document.getElementsByClassName('btn')
  console.log(removeBtns)
  for (var i=0; i<removeBtns.length; i++){
  var btn = removeBtns[i]
  btn.addEventListener('click', function(event){
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.remove()
    update()
  })
  }
  var addButtons = document.getElementsByClassName('blk')
  console.log(addButtons)
  if (localStorage.getItem('savedTotalAmountDisplay') != null){
    var x = parseInt(JSON.parse(localStorage.getItem('savedTotalAmountDisplay')),10)
    if (x != 0){
    document.getElementsByClassName("cart")[0].innerText = "CART(" + x + ")"
    }
  }
}

// add a product to cart
function addItem(event){
  var itemList = JSON.parse(localStorage.getItem('savedItemList'))
  if (itemList == null){
    itemList = []
  }
  event.preventDefault()
  let cartItem = {
    productName: document.getElementsByClassName("headline")[0].innerText,
    price: document.getElementsByClassName("price")[0].innerText,
    glazing: document.querySelector('input[name="glazing"]:checked').value,
    quantity: document.querySelector('input[name="quantity"]:checked').value,
    imgPath: document.getElementById('disp').src
  }
  itemList.push(cartItem)
  document.forms[0].reset()
  console.warn('added', {cartItem})
  localStorage.setItem('savedItemList', JSON.stringify(itemList))
  updateCartNum()
  console.log("ahh")
  //window.location.href = "cart.html"
}

// update the total price, and cart num display
function update(){
  var items = document.getElementsByClassName('item')
  var totalPrice = 0
  for (var i = 0; i<items.length; i++){
    var item = items[i]
    var itemPrice = parseFloat(item.getElementsByClassName('quantity')[0].getElementsByClassName('item-price')[0].innerText.replace('$',''))
    var itemQuantity = item.getElementsByClassName('quantity')[0].getElementsByClassName('quantity-input')[0].value
    totalPrice += itemPrice * itemQuantity
  }
  if (document.getElementsByClassName('amount').length != 0){
    document.getElementsByClassName('amount')[0].innerText = '$' + totalPrice
  }
}

function changeImg(path){
  document.getElementById('disp').src = path
}

// click thumbnails and display the chosen image 
function changeImg2(val){
  var dispImg = document.getElementById('disp')
  if (val=="Sugar-Milk"){
    dispImg.src = "./details/sugar_milk.jpg"
  }
  else if (val=="Vanilla-Milk"){
    dispImg.src = "./details/vanilla_milk.jpg"
  }
  else if (val=="Double-Chocolate"){
    dispImg.src = "./details/chocolate.jpg"
  }
}

// update cart display num
function updateCartNum(){
  console.log("aehh")
  var totalAmountDisplay = document.getElementsByClassName("cart")[0].innerText.match(/(\d+)/)[0]
  console.log(totalAmountDisplay)
  var currentCartItems = JSON.parse(localStorage.getItem('savedItemList'))
  totalAmountDisplay = parseInt(totalAmountDisplay) + 1
  localStorage.setItem("savedTotalAmountDisplay", JSON.stringify(totalAmountDisplay))
  document.getElementsByClassName("cart")[0].innerText = "CART(" + parseInt(totalAmountDisplay, 10) + ")"
  console.log(totalAmountDisplay)
}


//document.getElementsByClassName("cart")[0].innerText = "CART(" + parseInt(JSON.parse(localStorage.getItem('savedTotalAmountDisplay')),10) + ")"

























