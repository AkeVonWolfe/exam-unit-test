/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// function getCartItemCount()
// function getItem(index)
// function getTotalCartValue()
// function addToCart(newItem)
// function removeFromCart(itemId)
// function editCart(itemId, newValues)
// function clearCart()
// -------------------------------------------------- //

import { isCartItem, isProduct } from "./validation.js"

let cart = []
let idCounter = 2002
// -------------------------------------------------- //


// Din kod börjar här
// Du får en funktion att börja med

function getCartItemCount() {
  return cart.reduce((count, item) => count + item.amount, 0)
}

function addToCart(newItem) {
  if (!isProduct(newItem)) {
    return false
  }

  const cartItem = { id: idCounter, amount: 1, item: newItem }
  idCounter++
  cart.push(cartItem) 
}

function clearCart() {
  cart.length = 0
}

function getItem(index) {
  return cart[index]
}

function getTotalCartValue() {
  return cart.reduce((total, item) => total + item.item.price * item.amount, 0) // Calculate the total value of the cart by multiplying each item's price by its amount and summing them up
}

function removeFromCart(productId) {
  const index = cart.findIndex((cartItem) => cartItem.item.id === productId) // Find the index of the cart item with the given productId
  if (index !== -1) { // Check if the item exists in the cart
    cart.splice(index, 1) // Remove the item from the cart if it exists
  }
}

function editCart(productId, newValues) {
  const index = cart.findIndex((cartItem) => cartItem.item.id === productId)
  if (index !== -1) {
    const updatedItem = { ...cart[index], ...newValues }
    if (isCartItem(updatedItem)) {
      cart[index] = updatedItem
    }
  }
}

export { getCartItemCount, addToCart, clearCart, getItem, getTotalCartValue, removeFromCart, editCart }