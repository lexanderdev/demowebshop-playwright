Feature: Registro de usuario
  Como usuario nuevo
  Quiero registrarme en la tienda DemoWebShop
  Para poder realizar compras en línea

  Scenario: Registro exitoso con datos válidos
    Given estoy en la página principal
    When doy clic en Register y completo el formulario con el usuario "newUser"
    Then debería ver el mensaje de registro exitoso
