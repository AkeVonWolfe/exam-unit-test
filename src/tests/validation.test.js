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

    test("returns false for an invalid product missing multiple properties", () => {
      // Arrange
      const invalidProduct = { name: "Missing price and id" }
      // mer än bara 1 saknas
      
      // Act
      const result = isProduct(invalidProduct) // Call the function with an invalid product
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })

    test("returns false for a product missing id", () => {
      // Arrange
      const invalidProduct = { name: "Badanka", price: 500 } // id is missing
      
      // Act
      const result = isProduct(invalidProduct) // Call the function with a product missing id
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })

    test("returns false for a product missing price", () => {
      // Arrange
      const invalidProduct = { id: 1001, name: "Badanka" } // price is missing
      
      // Act
      const result = isProduct(invalidProduct) // Call the function with a product missing price
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })

    test("returns false for a product missing name", () => {
      // Arrange
      const invalidProduct = { id: 1001, price: 500 } // name is missing
      
      // Act
      const result = isProduct(invalidProduct) // Call the function with a product missing name
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })

    test("returns false for null input", () => {
      // Act
      const result = isProduct(null) // Call the function with null
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })

    test("returns false for undefined input", () => {
      // Act
      const result = isProduct(undefined) // Call the function with undefined
      
      // Assert
      expect(result).toBe(false) // Check that the result is false
    })

    test("returns false for empty object", () => {
      // Arrange
      const invalidProduct = {} // empty object
      
      // Act
      const result = isProduct(invalidProduct) // Call the function with empty object
      
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
