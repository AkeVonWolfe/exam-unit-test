// importera här
import { addToCart, getCartItemCount, clearCart, getItem, getTotalCartValue, removeFromCart, editCart } from "../cart"

describe("Cart", () => {
  beforeEach(() => {
    // Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
    clearCart()
  })

  // -------------------------------------------------- //
  // Skriv dina testfall här

  // Du får ett test att börja med
  test("addToCart lägger till en ny produkt i kundvagnen", () => {
    // Arrange
    const itemCountBefore = getCartItemCount()
    const input = { id: 1002, name: "Vattenpistol", price: 40 }

	  // Act
    // addToCart returnerar inget - den påverkar kundvagnen
    // vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
    addToCart(input)

    // Assert
    const itemCountAfter = getCartItemCount()
    expect(itemCountAfter).toBe(itemCountBefore + 1)
  })

  test("getCartItemCount returns 0 when the cart is empty", () => {
    // Arrange

    // Act
    const result = getCartItemCount()

    // Assert
    expect(result).toBe(0)
  })

  // Testa att addToCart inte lägger till en produkt som inte är en produkt
  test("addToCart does not add an invalid product to the cart", () => {
  // Arrange
  const itemCountBefore = getCartItemCount()
  const invalidProduct = { name: "missing id and price" }

  // Act
  addToCart(invalidProduct)

  // Assert
  const itemCountAfter = getCartItemCount()
  expect(itemCountAfter).toBe(itemCountBefore)
  })


  // Testa att getItem returnerar en produkt från kundvagnen
  test("getItem returns item by index", () => {
    // Arrange
    const input = { id: 1003, name: "Badboll", price: 30 }
    addToCart(input)

    // Act
    const item = getItem(0)

    // Assert
    expect(item.item.name).toBe("Badboll")
  })
  
  //  
  test("getTotalCartValue return correct total value to cart", () =>{ 
    // Arrange
    const item1 = { id: 1004, name: "Fotboll", price: 200 }
    const item2 = { id: 1005, name: "Basketboll", price: 300 }
    addToCart(item1)
    addToCart(item2)

    // Act
    const totalValue = getTotalCartValue()

    // Assert
    expect(totalValue).toBe(500)
  })

  describe("removeFromCart", () => {
    test("removeFromCart removes item from cart", () => {
      // Arrange
      const item1 = { id: 1006, name: "Tennisboll", price: 50 }
      const item2 = { id: 1007, name: "Golfboll", price: 60 }
      addToCart(item1)
      addToCart(item2)

      // Act
      removeFromCart(item1.id)

      // Assert
      expect(getCartItemCount()).toBe(1)

    })

    describe("editCart", () => {
      test("editCart updates item in cart", () => {
        // Arrange
        const item1 = { id: 1008, name: "Baseboll", price: 20 }
        addToCart(item1)

        // Act
        const newValues = { amount: 3 }
        editCart(item1.id, newValues)

        // Assert
        const updatedItem = getItem(0)
        expect(updatedItem.amount).toBe(3)
      })

      test("editCart does not update item if it does not exist", () => {
        // Arrange
        const item1 = { id: 1009, name: "Racket", price: 150 }
        addToCart(item1)

        // Act
        const newValues = { amount: 2 }
        editCart(9999, newValues) // Non-existing item ID

        // Assert
        const updatedItem = getItem(0)
        expect(updatedItem.amount).toBe(1) // Should remain unchanged
      })
    })
  })
})