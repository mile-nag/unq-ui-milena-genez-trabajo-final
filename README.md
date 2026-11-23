# Palabras Encadenadas

Juego de palabras encadenadas hecho en React para el Trabajo Final Integrador de
Construcción de Interfaces de Usuario (UNQ, 2° cuatrimestre 2026).

El objetivo es formar la cadena más larga posible de palabras válidas antes de que se
agote el tiempo: cada palabra tiene que empezar con la última letra de la anterior.

## Requisitos

- [Node.js](https://nodejs.org/) (`v24.20.0`)
- npm 

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/mile-nag/unq-ui-milena-genez-trabajo-final.git
   cd unq-ui-milena-genez-trabajo-final
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo de variables de entorno a partir del ejemplo:

   ```bash
   cp .env.example .env
   ```

   El archivo `.env` contiene la URL de la API de validación de palabras. Sin este paso,
   la aplicación no puede validar palabras.

## Ejecución

```bash
npm run dev
```

Abrir en el navegador la URL que muestra la terminal (por defecto, `http://localhost:5173`)

## Cómo se juega

- La primera palabra puede ser cualquier palabra válida del diccionario español.
- A partir de la segunda, cada palabra tiene que empezar con la última letra de la anterior.
- No se puede repetir una palabra durante la partida.
- Cada letra de una palabra válida suma 1 punto.
- Cada turno dura 15 segundos. El contador arranca con la primera palabra válida y vuelve
  a 15 con cada palabra válida. Si llega a 0, la partida termina.
- Si al terminar el puntaje entra en el top 10, se puede guardar con un alias de hasta 4
  caracteres.

---

## Validación de palabras

- **Se valida localmente todo lo posible antes de llamar a la API**: caracteres
  inválidos, palabras repetidas y la regla de encadenamiento. Solo se consulta la API para
  saber si la palabra existe.
- **Las palabras se comparan igual que la API**: se ignoran mayúsculas, tildes y diéresis,
  y la ñ se trata como n. Al principio la ñ era una letra distinta, pero eso permitía
  "reusar" palabras: "sañ" se aceptaba después de "san", porque el front la veía como una
  palabra nueva y la API la validaba como "san". Las reglas del front no pueden distinguir
  algo que el validador no distingue.
- **Se permiten las palabras de una letra** ("a", "o", "y"), porque existen en el
  diccionario. Funcionan como un comodín: suman 1 punto y reinician el contador. Como no se
  pueden repetir, cada una se usa una sola vez por partida.
- **No se pueden escribir espacios** en el input: en este juego un espacio nunca es válido.
- **El diccionario de la API tiene huecos**: por ejemplo, no reconoce la palabra "chau".

## Tiempo

- **El contador se pausa mientras se espera la respuesta de la API.** Así, la demora de la
  red no le quita tiempo al jugador. Las validaciones locales son instantáneas y no lo pausan.
- El input se bloquea mientras se valida una palabra, para evitar envíos superpuestos.

## Leaderboard

- Se guarda en el `localStorage` del navegador. Si los datos están corruptos o el
  almacenamiento no está disponible, el juego sigue funcionando sin ranking.
- Solo se ofrece guardar si el puntaje entra en el top 10 y es opcional.
- Para entrar con el ranking lleno hay que **superar** al último: en caso de empate, se queda el puntaje que ya estaba.
- Se recuerda el último alias usado para no tener que escribirlo en cada partida.

## Estado de la aplicación

- Se guarda el mínimo estado posible. El puntaje, la cantidad de palabras, la próxima letra y si la partida empezó o terminó **se derivan** de la cadena de palabras y del tiempo restante.

## Estructura del proyecto

```
src/
├── components/
│   ├── Game.jsx        // una partida -- cadena, validación y tiempo
│   └── ...             // componentes de la interfaz
├── hooks/
│   └── useCountdown.js // cuenta regresiva con pausa
├── services/
│   └── api.js          // API de validación
├── storage/
│   └── leaderboard.js  // lectura y escritura del ranking en localStorage
├── utils/
│   ├── words.js        // reglas de validación de palabras
│   └── gameRules.js    // parámetros y reglas del juego
├── App.jsx             // layout, leaderboard y datos que duran entre partidas
└── main.jsx            // punto de entrada       
```

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Bootstrap](https://getbootstrap.com/) (solo CSS)
- [axios](https://axios-http.com/) para las llamadas HTTP
- [oxlint](https://oxc.rs/) como linter