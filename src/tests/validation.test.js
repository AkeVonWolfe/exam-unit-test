import { isCartItem, isProduct } from "../validation.js"
// Examples of a valid product and a valid cart item. You may use these when testing below.
const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

// Group tests using "describe"
describe("Validation", () => {
  // 1. it returns true for a valid cart object
  // 2. it returns false for invalid cart objects

  // 3. it returns true for a valid product
  // 4. it returns false for invalid cart objects

  describe("isProduct", () => {
    test("isProduct returns true for a valid product object", () => {
      // Arrange
      const validProduct = exampleProduct 
      
      // Act
      const result = isProduct(validProduct) // Call the function with a valid product
      
      // Assert
      expect(result).toBe(true) // Check that the result is true
    })

        test("returns false for an invalid product", () => {
          // Arrange
          const invalidProduct = { name: "Missing price and id" }
          
          // Act
          const result = isProduct(invalidProduct) // Call the function with an invalid product
          
          // Assert
          expect(result).toBe(false) // Check that the result is false
        })
      })
      

      // Testa att isProduct returnerar false för en ogiltig produkt
    describe("isCartItem", () => {
    test("isCartItem returns true for a valid cart item object", () => {
      // Arrange
      const validCartItem = exampleCartObject
      
      // Act
      const result = isCartItem(validCartItem) // Call the function with a valid cart item
      
      // Assert
      expect(result).toBe(true) // Check that the result is true
    })

    // Testa att isCartItem returnerar false för en ogiltig kundvagnsobjekt
    test("isCartItem returns false for an invalid cart item object", () => {
      // Arrange
      const invalidCartItem = { id: 2001, amount: 1 } // item is missing
      
      // Act
      const result = isCartItem(invalidCartItem) // Call the function with an invalid cart item
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })


    // Testa att isCartItem returnerar false för en ogiltig produkt i kundvagnsobjekt
    test("isCartItem returns false for an invalid product in cart item", () => {
      // Arrange
      const invalidCartItem = {
        id: 2001,
        amount: 1,
        item: { id: 1001, name: "Invalid Product" }, // price is missing
      }
      
      // Act
      const result = isCartItem(invalidCartItem) // Call the function with an invalid cart item
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })
  })
})