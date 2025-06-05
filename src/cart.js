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
  return cart.reduce((count, item) => count + item.amount, 0) // Return the total count of items in the cart
}

function addToCart(newItem) { 
  if (!isProduct(newItem)) { //check if newItem is a valid product
    return false
  }

  const cartItem = { id: idCounter, amount: 1, item: newItem } // Create a new cart item with a unique id, amount of 1, and the product
  idCounter++
  cart.push(cartItem) // Add the new item to the cart
  return true
}

function clearCart() {
  cart.length = 0
}

function getItem(index) {
  // Check if index is a valid number and within bounds
  if (typeof index !== 'number' || index < 0 || index >= cart.length) {
    return undefined // Return undefined if index is invalid
  }
  return cart[index]
}

function getCartValue() {
  return cart.reduce((total, item) => total + item.item.price * item.amount, 0) // Calculate the total value of the cart by summing up the price of each item multiplied by its amount
}

function removeFromCart(productId) {
  // Check if productId is a valid number
  if (typeof productId !== 'number') {
    return false
  }
  
  const index = cart.findIndex((cartItem) => cartItem.item.id === productId) // Find the index of the product in the cart or return -1 if not found
  if (index !== -1) { 
    cart.splice(index, 1) // Remove the item from the cart
    return true
  }
  return false
}

function editCart(productId, newValues) {
  // Check if productId is a valid number and newValues is not null/undefined
  if (typeof productId !== 'number' || newValues == null) {
    return false
  }
  
  const index = cart.findIndex((cartItem) => cartItem.item.id === productId) // Find the index of the product in the cart or return -1 if not found
  if (index === -1) { // Product not found
    return false
  }
  
  const updatedItem = { ...cart[index], ...newValues } // Merge new values with existing item
  if (!isCartItem(updatedItem)) { // Validate the updated item
    return false
  }
  
  // Additional validation for amount (must be positive)
  if (updatedItem.amount <= 0) {
    return false
  }
  
  cart[index] = updatedItem
  return true
}

export { getCartItemCount, addToCart, clearCart, getItem, getCartValue, removeFromCart, editCart }