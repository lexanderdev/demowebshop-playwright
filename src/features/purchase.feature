Feature: Compra de producto

  Como usuario registrado
  Quiero comprar un producto en la tienda DemoWebShop
  Para recibirlo en mi domicilio

  Scenario: Compra exitosa de computador con tarjeta de crédito
    Given estoy en la página principal
    When doy clic en Log in e ingreso las credenciales de "defaultUser"
    And selecciono la categoría "Computers"
    And selecciono la subcategoría "Desktops"
    And agrego al carrito el producto "Build your own cheap computer"
    And confirmo agregar al carrito desde la página del producto
    And voy al carrito de compras
    And inicio el proceso de checkout
    And completo la dirección de envío con "defaultAddress"
    And selecciono el método de envío "Pick Up in Store"
    And selecciono el método de pago "Credit Card"
    And completo los datos de pago con "defaultCard"
    And confirmo la orden
    Then debería ver el mensaje "Your order has been successfully processed!"
