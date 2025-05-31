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
  return true
}

function clearCart() {
  cart.length = 0
}

function getItem(index) {
  if (index < 0 || index >= cart.length) { // Check if index is out of bounds
    return undefined // Return undefined if index is invalid
  }
  return cart[index]
}

function getCartValue() {
  return cart.reduce((total, item) => total + item.item.price * item.amount, 0)
}

function removeFromCart(productId) {
  const index = cart.findIndex((cartItem) => cartItem.item.id === productId) // Find the index of the product in the cart
  if (index !== -1) { 
    cart.splice(index, 1) // Remove the item from the cart
    return true
  }
  return false
}

function editCart(productId, newValues) {
  const index = cart.findIndex((cartItem) => cartItem.item.id === productId) // Find the index of the product in the cart
  if (index === -1) { // Product not found
    return false
  }
  
  const updatedItem = { ...cart[index], ...newValues } // Merge new values with existing item
  if (!isCartItem(updatedItem)) { // Validate the updated item
    return false
  }
  
  cart[index] = updatedItem
  return true
}

export { getCartItemCount, addToCart, clearCart, getItem, getCartValue, removeFromCart, editCart }
