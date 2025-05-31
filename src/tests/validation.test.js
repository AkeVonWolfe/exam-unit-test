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
      const result = isProduct(validProduct)
      
      // Assert
      expect(result).toBe(true)
    })

        test("returns false for an invalid product", () => {
          // Arrange
          const invalidProduct = { name: "Missing price and id" }
          
          // Act
          const result = isProduct(invalidProduct)
          
          // Assert
          expect(result).toBe(false)
        })
      })
      

      // Testa att isProduct returnerar false för en ogiltig produkt
    describe("isCartItem", () => {
    test("isCartItem returns true for a valid cart item object", () => {
      // Arrange
      const validCartItem = exampleCartObject
      
      // Act
      const result = isCartItem(validCartItem)
      
      // Assert
      expect(result).toBe(true)
    })

    // Testa att isCartItem returnerar false för en ogiltig kundvagnsobjekt
    test("isCartItem returns false for an invalid cart item object", () => {
      // Arrange
      const invalidCartItem = { id: 2001, amount: 1 } // item is missing
      
      // Act
      const result = isCartItem(invalidCartItem)
      
      // Assert
      expect(result).toBe(false)
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
      const result = isCartItem(invalidCartItem)
      
      // Assert
      expect(result).toBe(false)
    })
  })
})