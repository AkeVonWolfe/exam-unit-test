// importera här
import { addToCart, getCartItemCount, clearCart } from "../cart"

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
})