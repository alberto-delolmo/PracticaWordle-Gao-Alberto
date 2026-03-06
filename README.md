# 🎮 Práctica Wordle Gao-Alberto

## 📌 Descripción General

**Práctica Wordle Gao-Alberto** es una aplicación web que implementa una versión funcional del popular juego **Wordle**.  
El objetivo del proyecto es aplicar principios de arquitectura MVC, programación orientada a objetos y buenas prácticas de desarrollo en TypeScript, integrando frontend y backend mediante un servidor Express, además de una buena aplicación de Clean Code y principios SOLID.

El jugador debe adivinar una palabra objetivo en un número limitado de intentos. Tras cada intento, el sistema proporciona retroalimentación visual indicando:

- Letras correctas en la posición correcta.
- Letras correctas en posición incorrecta.
- Letras que no pertenecen a la palabra.

Este proyecto tiene un enfoque académico y práctico, orientado a reforzar conceptos como:

- Aplicación de Clean Code.
- Principios SOLID.
- Manipulación del DOM.
- Gestión de eventos.
- Flujo cliente-servidor con Express.

---

## 🚀 Características Principales

- ✔ Juego completo estilo Wordle.
- ✔ Arquitectura MVC (Modelo – Vista – Controlador).
- ✔ Evaluación automática de palabras.
- ✔ Teclado virtual interactivo.
- ✔ Soporte para teclado físico.
- ✔ Sistema de turnos e intentos máximos.
- ✔ Pantalla de victoria y derrota.
- ✔ Implementado en TypeScript.
- ✔ Servidor Express para servir archivos estáticos.

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|------|
| **TypeScript** | Lógica del juego y arquitectura |
| **Node.js** | Entorno de ejecución |
| **Express.js** | Servidor backend |
| **HTML5** | Estructura de la interfaz |
| **CSS3** | Estilos y diseño visual |
| **Git** | Control de versiones |

---

## 📁 Estructura del Proyecto

El proyecto está organizado siguiendo una arquitectura basada en el patrón **MVC (Modelo – Vista – Controlador)**, con una clara separación de responsabilidades.

### 📂 application

Contiene la configuración del servidor y la gestión de recursos externos.

- **Server.ts** → Configuración del servidor Express y rutas principales.
- **WordRepository.ts** → Gestión y obtención de palabras objetivo.

---

### 📂 controller

Encargado de la comunicación entre el Modelo y la Vista.

- **GameController.ts**
  - Gestiona eventos del teclado.
  - Coordina las acciones del juego.
  - Actualiza la vista según el estado del modelo.

Responsabilidad principal:
> Orquestar la lógica del flujo del juego.

---

### 📂 model

Contiene la lógica de negocio del juego.

#### 🔹 GameModel.ts
- Gestiona el estado del juego.
- Controla turnos, palabra actual e intentos.
- Determina si el jugador gana o pierde.

#### 🔹 WordEvaluator.ts
- Evalúa la palabra introducida.
- Determina el estado de cada letra (Correct, Misplaced, Wrong).

#### 🔹 LetterState.ts
- Enumeración que define los posibles estados de una letra.

---

### 📂 model/color

Implementa el patrón **Factory** para la gestión de colores.

- **IColor.ts** → Interfaz base para colores.
- **ColorFactory.ts** → Fábrica que devuelve el color correspondiente.
- **Green.ts** → Implementación para letra correcta.
- **Orange.ts** → Implementación para letra en posición incorrecta.
- **Grey.ts** → Implementación para letra incorrecta.

Este diseño permite:
- Extensibilidad.
- Cumplimiento del principio Open/Closed (SOLID).
- Separación clara de responsabilidades.

---

### 📂 view

Gestiona la representación visual y la interacción con el DOM.

- **App.ts** → Punto de entrada del frontend.
- **GamePresenter.ts** → Intermediario entre modelo y vista.
- **GameView.ts** → Manipulación directa del DOM.

Responsabilidad principal:
> Representar visualmente el estado del juego.

---

### 📄 env.ts

Archivo de configuración global que define constantes como:

- Tamaño máximo de palabra.
- Número máximo de intentos.


---

## ⚙ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone [pendiente de definir]
cd [nombre-del-repositorio]
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Compilar el proyecto

```bash
npx tsc
```

### 4️⃣ Ejecutar el servidor

```bash
npm run start
```

### 5️⃣ Abrir el juego en el navegador
```bash
http://localhost:3000
```
