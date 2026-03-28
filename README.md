# DemoWebShop — Automatización E2E

[![CI](https://github.com/lexanderdev/demowebshop-playwright/actions/workflows/CI.yml/badge.svg)](https://github.com/lexanderdev/demowebshop-playwright/actions/workflows/CI.yml)

Proyecto de automatización de pruebas end-to-end para la tienda [DemoWebShop de Tricentis](https://demowebshop.tricentis.com/), cubriendo los flujos de autenticación y compra completa.

---

## Stack tecnológico

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

---

## Estrategia de ramas

El proyecto usa un flujo de trabajo con dos ramas principales:

| Rama | Propósito |
|---|---|
| `main` | Código estable y listo para producción |
| `develop` | Rama de desarrollo — los cambios se integran aquí primero |

### Protección de la rama `main`

La rama `main` tiene las siguientes reglas de protección configuradas en GitHub:

| Regla | Descripción |
|---|---|
| Require a pull request before merging | Todo cambio debe entrar por Pull Request — no se permite push directo |
| Require status checks to pass | El pipeline de CI debe pasar (tests en verde) antes de permitir el merge |

---

## Reporte de resultados

Los resultados de cada ejecución se publican automáticamente en **Allure Report** a través de GitHub Pages. Allure genera un reporte visual e interactivo que muestra el estado de cada escenario, pasos ejecutados, duración y trazabilidad completa.

El reporte se actualiza en cada push a `main` y está disponible en:

**[Ver reporte Allure](https://lexanderdev.github.io/demowebshop-playwright/)**

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- Cuenta de [Firebase](https://firebase.google.com/) con Firestore habilitado
- Credenciales de Firebase Admin SDK (ver sección de configuración)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/demowebshop-playwright.git
cd demowebshop-playwright

# 2. Instalar dependencias
npm install

# 3. Instalar navegadores de Playwright
npx playwright install
```

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

BASE_URL=https://demowebshop.tricentis.com/
```

> El archivo `.env` está en `.gitignore` y nunca debe subirse al repositorio.

---

## Comandos

```bash
# Ejecutar todos los tests de Cucumber (BDD)
npm run test:cucumber

# Ejecutar un feature específico
npx cucumber-js src/features/register.feature
npx cucumber-js src/features/purchase.feature

# Ejecutar tests de Playwright con navegador visible
npm run test:headed

# Abrir reporte HTML de Playwright
npx playwright show-report

# Verificar calidad de código
npm run lint
npm run format
```

---

## Arquitectura del proyecto

El proyecto combina **Playwright** como motor de automatización con **Cucumber/Gherkin** para describir los escenarios en lenguaje de negocio. Los datos de prueba se gestionan externamente en **Firebase Firestore**, manteniendo el código limpio y sin datos hardcodeados.

```
src/
├── features/        # Escenarios escritos en Gherkin — lenguaje de negocio
│                    # Un archivo por módulo funcional (register, purchase)
│
├── steps/           # Step definitions — conectan el Gherkin con el código
│                    # Cada step invoca métodos de los Page Objects
│
├── pages/           # Page Object Model (POM)
│                    # Una clase por página: encapsula locators, acciones y assertions
│                    # Los tests nunca interactúan con el DOM directamente
│
├── fixtures/        # Custom fixtures de Playwright
│                    # Inicializa los POMs y gestiona el login automático antes de cada test
│
├── hooks/           # Hooks de Cucumber (Before / After)
│                    # Inicializa el browser y la página antes de cada escenario
│
├── models/          # Interfaces TypeScript
│                    # Definen la forma de los datos: User, Address, PaymentCard
│
├── helpers/         # Funciones utilitarias para acceder a Firebase
│                    # getUser(), getAddress(), getPaymentCard()
│
└── setup/           # Inicialización de Firebase Admin SDK
│                    # Configura la conexión a Firestore usando las variables de entorno
```

### Flujo de datos

```
Firestore (Firebase)
      ↓
  helpers/db.ts       ← obtiene usuarios, direcciones y tarjetas
      ↓
  steps/*.ts          ← recibe los datos y los pasa al POM
      ↓
  pages/*.ts          ← interactúa con el navegador usando los datos
```

---

## Datos de prueba en Firestore

Los datos de prueba se almacenan en Firebase Firestore y son consumidos por los helpers del proyecto. A continuación se describe la estructura esperada por colección.

### Colección `addresses/`

Contiene las direcciones de envío utilizadas durante el proceso de checkout.

| Documento | Campo | Tipo | Descripción |
|---|---|---|---|
| `defaultAddress` | `country` | string | País de entrega |
| | `city` | string | Ciudad de entrega |
| | `address` | string | Dirección completa |
| | `zip` | string | Código postal |
| | `phoneNumber` | string | Teléfono de contacto (opcional) |

### Colección `paymentMethods/`

Contiene los datos de tarjetas de crédito utilizados en el pago.

| Documento | Campo | Tipo | Descripción |
|---|---|---|---|
| `defaultCard` | `cardType` | string | Tipo de tarjeta (ej. Visa) |
| | `cardholderName` | string | Nombre del titular |
| | `cardNumber` | string | Número de la tarjeta |
| | `expirationMonth` | string | Mes de expiración (ej. 04) |
| | `expirationYear` | string | Año de expiración (ej. 2027) |
| | `cardCode` | string | Código de seguridad CVV |

---

### Patrón Page Object Model

Cada página de la aplicación tiene su propia clase en `pages/`. Esto garantiza que si la UI cambia, solo hay que actualizar un único archivo sin tocar los tests.

```
feature (Gherkin)
    → step definition  →  Page Object  →  Navegador (Playwright)
```
