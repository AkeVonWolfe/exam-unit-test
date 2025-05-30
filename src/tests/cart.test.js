// importera här
import { addToCart, getCartItemCount, clearCart, getItem } from "../cart"

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

  test("getItem returns item by index", () => {
    // Arrange
    const input = { id: 1003, name: "Badboll", price: 30 }
    addToCart(input)

    // Act
    const item = getItem(0)

    // Assert
    expect(item.item.name).toBe("Badboll")
  })
})