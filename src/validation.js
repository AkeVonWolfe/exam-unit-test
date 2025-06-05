// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat



function isCartItem(maybeCartItem) {
  return (
    typeof maybeCartItem === "object" && // Check if maybeCartItem is an object
    maybeCartItem !== null &&  // Check it's not null
    typeof maybeCartItem.id === "number" && // Check if id is a number
    typeof maybeCartItem.amount === "number" && // Check if amount is a number
    isProduct(maybeCartItem.item) // Check if item is a valid product
  )
}


function isProduct(maybeProduct) {
  return (
    typeof maybeProduct === "object" && // Check if maybeProduct is an object
    maybeProduct !== null && // Check it's not null
    typeof maybeProduct.id === "number" && // Check if id is a number
    typeof maybeProduct.name === "string" && // Check if name is a string
    typeof maybeProduct.price === "number" // Check if price is a number
  )
}


export { isCartItem, isProduct }
