import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../hooks/pageFixture';
import { LoginPage } from '../pages/login_page';
import { RegisterPage } from '../pages/register_page';
import { HomePage } from '../pages/home_page';
import { getUser, generateUniqueEmail } from '../helpers/db';

let loginPage: LoginPage;
let registerPage: RegisterPage;
let homePage: HomePage;

// Navega a la página principal sin autenticar
Given('estoy en la página principal', async () => {
  homePage = new HomePage(fixture.page);
  await homePage.goto();
});

// Desde la página principal, da clic en "Log in" y llena las credenciales
When('doy clic en Log in e ingreso las credenciales de {string}', async (userKey: string) => {
  const data = await getUser(userKey);
  loginPage = new LoginPage(fixture.page);
  await loginPage.goto();
  await loginPage.doLogin(data.user, data.password);
});

// Desde la página principal, da clic en "Register" y completa el formulario
// El email se genera con timestamp para evitar duplicados entre ejecuciones
When('doy clic en Register y completo el formulario con el usuario {string}', async (userKey: string) => {
  registerPage = new RegisterPage(fixture.page);
  await registerPage.goto();
  const data = await getUser(userKey);
  const email = generateUniqueEmail(data.email ?? data.user);
  await registerPage.fillForm(
    data.gender ?? 'M',
    data.firstName,
    data.lastName,
    email,
    data.password
  );
  await registerPage.submit();
});

// Valida el mensaje "Your registration completed"
Then('debería ver el mensaje de registro exitoso', async () => {
  await registerPage.validateRegistered();
});
