# ProCalc — Especificación del proyecto

## 1. Resumen

**ProCalc** es una aplicación web de calculadora científica con conversiones, historial y una interfaz usable desde teclado físico y virtual.

**Stack:** HTML, CSS y JavaScript vanilla (sin frameworks ni bundlers).

**Estado actual:** Etapa B1 completada (ops básicas y científicas puras en `core/`). Sin parser de expresiones, sin UI de calculadora, sin conversiones ni historial.

---

## 2. Decisiones técnicas confirmadas

| Decisión | Elección | Motivo |
|---|---|---|
| Estructura de carpetas | Plana en la raíz (`index.html`, `css/`, `js/`, `assets/`) | Preferencia del producto; simple de servir y de navegar |
| JavaScript | Scripts clásicos (sin `type="module"` por ahora) | Preferencia actual; se puede migrar a módulos ES más adelante si hace falta |
| Dependencias | Ninguna librería externa | Mantener el proyecto liviano y sin tooling innecesario |
| Namespace global | `window.ProCalc` | Scripts clásicos necesitan un punto de extensión compartido sin módulos |
| Contrato del motor | `{ ok: true, value }` / `{ ok: false, error }` | Errores manejables por UI sin excepciones no controladas |
| Pantallas | No se implementan pantallas finales aún | Evitar diseño de producto fuera de etapa |
| Idioma UI | Inglés | Textos de UI, errores e historial en inglés (§5.4) |

---

## 3. Alcance funcional (requisitos)

Funcionalidades pedidas. Estado por bloque:

### 3.1 Operaciones básicas — **B1 hecha (API pura)**

- Suma, resta, multiplicación, división
- Porcentaje (`percent`, `percentOf`)
- Potencias, raíces (`sqrt`, `nthRoot`)
- Factorial, valor absoluto

### 3.2 Funciones científicas — **B1 hecha (API pura)**

- Seno, coseno, tangente (+ inversas)
- Logaritmo decimal y natural, exponencial
- Constantes π y e
- Potencias de 10 (`pow10`)
- Notación científica (`scientificParts` → coeficiente + exponente)

### 3.3 Conversiones de unidades — pendiente (Etapa E)

### 3.4 Conversión entre bases numéricas — pendiente (Etapa E)

### 3.5 Interfaz y experiencia — pendiente (C1/C2/D)

---

## 4. Estructura de carpetas

```text
/
├── index.html
├── spec.md
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── core/
│   │   ├── result.js       # helpers del contrato { ok, value | error }
│   │   ├── operations.js
│   │   ├── scientific.js
│   │   └── calculator.js
│   ├── converters/     # Etapa E
│   ├── ui/             # Etapas C1/C2/D
│   └── utils/
│       ├── errors.js
│       └── numberFormat.js
├── tests/
│   └── run-core-tests.js   # tests unitarios B1 (Node, sin npm)
└── assets/
    ├── icons/
    └── images/
```

### Responsabilidad de cada carpeta `js/`

- **`core/`** — operaciones y (luego) evaluación/pasos. Sin DOM.
- **`converters/`** — unidades, monedas y bases numéricas.
- **`ui/`** — DOM, teclado, temas, historial, errores visibles.
- **`utils/`** — helpers compartidos. Sin DOM.

**Regla:** no mezclar cálculo con DOM.

---

## 5. Decisiones técnicas documentadas

### 5.1 Sin build step

Se sirve HTML/CSS/JS estáticos. No hay npm, Vite, Webpack ni similares por ahora.

### 5.2 Organización de scripts clásicos

Orden actual (Etapa B1 + refactor `result`):

1. `js/utils/errors.js`
2. `js/utils/numberFormat.js`
3. `js/core/result.js`
4. `js/core/operations.js`
5. `js/core/scientific.js`
6. `js/core/calculator.js`
7. `js/app.js`

Orden previsto cuando crezcan las capas: `utils` → `core` → `converters` → `ui` → `app.js`.

### 5.3 Estilos

Un único archivo `css/styles.css` como hoja global. Temas y layout responsive en C1/C2.

### 5.4 Idioma de la interfaz

Textos de UI, mensajes de error e historial en **inglés**.

### 5.5 Etapa A — cimientos

- `ProCalc.utils.errors` y `ProCalc.utils.numberFormat` (stub).
- Default `PROVISIONAL_FRACTION_DIGITS` temporal; **no** cierra §6.3.

### 5.6 Etapa B1 — motor de operaciones

- API en `ProCalc.core` (fachada) más `ProCalc.core.operations` / `ProCalc.core.scientific`.
- Helpers compartidos del contrato en `ProCalc.core.result` (`ok`, `fail`, `requireNumber`, `isValidNumber`); sin duplicar en operations/scientific.
- Trigonométricas exigen `angleMode: "deg" | "rad"` en cada llamada. **No** hay default de producto; §6.2 sigue abierto.
- Factorial solo enteros ≥ 0; `n > 170` → `OVERFLOW`.
- División por cero → `DIVISION_BY_ZERO`.
- Sin parser de expresiones ni pasos (eso es B2).
- Tests: `node tests/run-core-tests.js` (vanilla, sin npm).

---

## 6. Puntos abiertos (pendientes de decisión)

1. **Monedas:** ¿tasas fijas/manuales o API externa?
2. **Ángulos trigonométricos:** ¿grados, radianes, o ambos con selector? *(B1 soporta ambos vía parámetro; falta decisión de UX)*
3. **Precisión numérica:** ¿cuántos decimales y cómo redondear?
4. **Historial:** ¿sesión o `localStorage`?
5. **Pasos del cálculo:** ¿todas las ops o un subconjunto?
6. **Nombre del producto en UI:** ¿siempre **ProCalc**?

**Pendiente de arquitectura (antes de B2):** modelo de entrada — teclado → tokens internos (recomendado) vs expresión de texto libre.

---

## 7. Plan de implementación aprobado

| Etapa | Alcance | Estado |
|---|---|---|
| **A** | Utils mínimos + arranque | Hecha |
| **B1** | Operaciones básicas/científicas puras (+ refactor `result` + tests) | Hecha — pendiente de revisión |
| **B2** | Evaluación / pasos (tras §6.2, §6.3, §6.5 + modelo de entrada) | Pendiente |
| **C1** | Shell UI + keypad + errores visibles | Pendiente |
| **C2** | Tema / atajos / responsive | Pendiente |
| **D** | Historial (tras §6.4 + forma del registro) | Pendiente |
| **E** | Unidades + bases; monedas aparte tras §6.1 | Pendiente |

### Fuera de alcance hasta que se pida

- Diseñar la interfaz final
- Librerías, frameworks o build tools
- Resolver §6 por cuenta propia
- Monedas antes de §6.1
- Parser de expresiones / pasos (B2)

---

## 8. Criterios de éxito

### Etapa A

- [x] Namespace `window.ProCalc`, utils, arranque
- [x] Sin UI de calculadora ni motor

### Etapa B1

- [x] `result.js`, `operations.js`, `scientific.js`, `calculator.js` en `js/core/`
- [x] Ops básicas y científicas del alcance §3.1 / §3.2 como API pura
- [x] Resultados `{ ok, value }` / `{ ok, error }` usando `utils.errors` vía `core.result`
- [x] Trigono con `angleMode` explícito (sin cerrar §6.2)
- [x] Sin DOM, sin parser, sin pasos, sin historial, sin conversiones
- [x] `app.js` marca `ProCalc.stage = "B1"` y `ProCalc.ready === true`
- [x] Tests unitarios vanilla en `tests/run-core-tests.js`
- [x] `spec.md` actualizado

### Cómo revisar Etapa B1

1. Abrir `index.html` en el navegador.
2. `ProCalc.ready` → `true`, `ProCalc.stage` → `"B1"`.
3. `ProCalc.core.add(2, 3)` → `{ ok: true, value: 5 }`.
4. `ProCalc.core.divide(1, 0)` → error `DIVISION_BY_ZERO`.
5. `ProCalc.core.sin(30, "deg")` → ≈ `0.5`.
6. `ProCalc.core.sin(Math.PI / 2, "rad")` → ≈ `1`.
7. `ProCalc.core.factorial(5)` → `120`; `ProCalc.core.factorial(-1)` → `DOMAIN_ERROR`.
8. Correr `node tests/run-core-tests.js` y verificar que todos pasen.
