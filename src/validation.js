// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

function isCartItem(maybeCartItem) {
  return (
    typeof maybeCartItem === "object" &&
    maybeCartItem !== null &&
    typeof maybeCartItem.id === "number" &&
    typeof maybeCartItem.amount === "number" &&
    isProduct(maybeCartItem.item)
  )
}

function isProduct(maybeProduct) {
  return (
    typeof maybeProduct === "object" &&
    maybeProduct !== null &&
    typeof maybeProduct.id === "number" &&
    typeof maybeProduct.name === "string" &&
    typeof maybeProduct.price === "number"
  )
}


export { isCartItem, isProduct }
