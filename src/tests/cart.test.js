// importera här
import { addToCart, getCartItemCount, clearCart, getItem, getCartValue, removeFromCart, editCart } from "../cart"

describe("Cart", () => {
  beforeEach(() => {
    // Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
    clearCart()
  })

  // -------------------------------------------------- //
  // Skriv dina testfall här

  describe("getCartItemCount", () => {
    test("returns 0 when the cart is empty", () => {
      // Arrange & Act
      const result = getCartItemCount()

      // Assert
      expect(result).toBe(0)
    })

    test("returns correct count when items are in cart", () => {
      // Arrange
      const item1 = { id: 1001, name: "Vattenpistol", price: 40 }
      const item2 = { id: 1002, name: "Badboll", price: 30 }
      addToCart(item1)
      addToCart(item2)

      // Act
      const result = getCartItemCount() // Should return the total number of items in the cart

      // Assert
      expect(result).toBe(2) // Should return 2 items in cart
    })
  })

  describe("addToCart", () => {
    test("lägger till en ny produkt i kundvagnen", () => {
      // Arrange
      const itemCountBefore = getCartItemCount()
      const input = { id: 1002, name: "Vattenpistol", price: 40 }

      // Act
      const result = addToCart(input)

      // Assert
      const itemCountAfter = getCartItemCount()
      expect(itemCountAfter).toBe(itemCountBefore + 1) // Should increase item count by 1
      expect(result).toBe(true) // Should return true for successful addition
    })

    test("does not add an invalid product to the cart", () => {
      // Arrange
      const itemCountBefore = getCartItemCount()
      const invalidProduct = { name: "missing id and price" }

      // Act
      const result = addToCart(invalidProduct)

      // Assert
      const itemCountAfter = getCartItemCount()
      expect(itemCountAfter).toBe(itemCountBefore) // Should not change item count
      expect(result).toBe(false) // Should not add invalid product to cart
    })

    test("returns false for null input", () => {
      // Arrange
      const itemCountBefore = getCartItemCount()

      // Act
      const result = addToCart(null)

      // Assert
      const itemCountAfter = getCartItemCount()
      expect(itemCountAfter).toBe(itemCountBefore) // Should not change item count
      expect(result).toBe(false) // Should not add null to cart
    })
  })

  describe("getItem", () => {
    test("returns item by valid index", () => {
      // Arrange
      const input = { id: 1003, name: "Badboll", price: 30 }
      addToCart(input)

      // Act
      const item = getItem(0)

      // Assert
      expect(item.item.name).toBe("Badboll") // Should return the correct item
      expect(item.item.id).toBe(1003) // Should return the correct item
    })

    test("returns undefined for invalid index", () => {
      // Arrange
      const input = { id: 1003, name: "Badboll", price: 30 }
      addToCart(input)

      // Act
      const item1 = getItem(-1)
      const item2 = getItem(5)

      // Assert
      expect(item1).toBeUndefined() // Should return undefined for negative index
      expect(item2).toBeUndefined() // Should return undefined for index out of bounds
    })

    test("returns undefined when cart is empty", () => {
      // Act
      const item = getItem(0)

      // Assert
      expect(item).toBeUndefined() // Should return undefined for empty cart
    })
  })
  
  describe("getCartValue", () => {
    test("returns 0 for empty cart", () => {
      // Act
      const totalValue = getCartValue()

      // Assert
      expect(totalValue).toBe(0) // Should be 0 for empty cart
    })

    test("returns correct total value for cart with items", () => { 
      // Arrange
      const item1 = { id: 1004, name: "Fotboll", price: 200 }
      const item2 = { id: 1005, name: "Basketboll", price: 300 }
      addToCart(item1)
      addToCart(item2)

      // Act
      const totalValue = getCartValue()

      // Assert
      expect(totalValue).toBe(500) // 200 + 300
    })

    test("calculates value correctly with different amounts", () => {
      // Arrange
      const item1 = { id: 1006, name: "Tennisboll", price: 50 }
      addToCart(item1)
      editCart(item1.id, { amount: 3 })

      // Act
      const totalValue = getCartValue()

      // Assert
      expect(totalValue).toBe(150) // 50 * 3
    })
  })

  describe("removeFromCart", () => {
    test("removes item from cart", () => {
      // Arrange
      const item1 = { id: 1006, name: "Tennisboll", price: 50 }
      const item2 = { id: 1007, name: "Golfboll", price: 60 }
      addToCart(item1)
      addToCart(item2)

      // Act
      const result = removeFromCart(item1.id)

      // Assert
      expect(getCartItemCount()).toBe(1) // Should be 1 item left
      expect(result).toBe(true) // Should return true for successful removal
    })

    test("returns false when trying to remove non-existing item", () => {
      // Arrange
      const item1 = { id: 1008, name: "Baseboll", price: 20 }
      addToCart(item1)

      // Act
      const result = removeFromCart(1337) // Non-existing ID

      // Assert
      expect(getCartItemCount()).toBe(1)
      expect(result).toBe(false)
    })

    test("returns false when trying to remove from empty cart", () => {
      // Act
      const result = removeFromCart(1001)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe("editCart", () => {
    test("updates item amount in cart", () => {
      // Arrange
      const item1 = { id: 1008, name: "Baseboll", price: 20 }
      addToCart(item1)

      // Act
      const newValues = { amount: 3 }
      const result = editCart(item1.id, newValues) // Update amount to 3

      // Assert
      const updatedItem = getItem(0)
      expect(updatedItem.amount).toBe(3) // Should be updated to 3
      expect(result).toBe(true) // Should return true for successful update
    })

    test("does not update item if it does not exist", () => {
      // Arrange
      const item1 = { id: 1009, name: "Racket", price: 150 }
      addToCart(item1)

      // Act
      const newValues = { amount: 2 }
      const result = editCart(9999, newValues) // Non-existing item ID

      // Assert
      const updatedItem = getItem(0)
      expect(updatedItem.amount).toBe(1) // Should remain unchanged
      expect(result).toBe(false)
    })

    test("does not update if newValues would make invalid cart item", () => {
      // Arrange
      const item1 = { id: 1010, name: "Volleyboll", price: 80 }
      addToCart(item1)

      // Act
      const invalidValues = { amount: "invalid" } // amount should be number
      const result = editCart(item1.id, invalidValues)

      // Assert
      const updatedItem = getItem(0)
      expect(updatedItem.amount).toBe(1) // Should remain unchanged
      expect(result).toBe(false)
    })

    test("can update multiple properties at once", () => {
      // Arrange
      const item1 = { id: 1011, name: "Handboll", price: 90 }
      addToCart(item1)

      // Act
      const newValues = { amount: 5 }
      const result = editCart(item1.id, newValues)

      // Assert
      const updatedItem = getItem(0)
      expect(updatedItem.amount).toBe(5)
      expect(result).toBe(true)
    })
  })

  describe("clearCart", () => {
    test("empties the cart", () => {
      // Arrange
      const item1 = { id: 1012, name: "Fotboll", price: 200 }
      const item2 = { id: 1013, name: "Basketboll", price: 300 }
      addToCart(item1)
      addToCart(item2)

      // Act
      clearCart()

      // Assert
      expect(getCartItemCount()).toBe(0) // Should be 0 after clearing
      expect(getCartValue()).toBe(0) // Should be 0 after clearing
    })
  })
})