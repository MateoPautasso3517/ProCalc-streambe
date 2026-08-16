# ProCalc — Especificación del proyecto

## 1. Resumen

**ProCalc** es una aplicación web de calculadora científica con conversiones, historial y una interfaz usable desde teclado físico y virtual.

**Stack:** HTML, CSS y JavaScript vanilla (sin frameworks ni bundlers).

**Estado actual:** Etapa A completada (utils mínimos + arranque). Sin motor de cálculo, sin UI de calculadora, sin conversiones ni historial.

---

## 2. Decisiones técnicas confirmadas

| Decisión | Elección | Motivo |
|---|---|---|
| Estructura de carpetas | Plana en la raíz (`index.html`, `css/`, `js/`, `assets/`) | Preferencia del producto; simple de servir y de navegar |
| JavaScript | Scripts clásicos (sin `type="module"` por ahora) | Preferencia actual; se puede migrar a módulos ES más adelante si hace falta |
| Dependencias | Ninguna librería externa | Mantener el proyecto liviano y sin tooling innecesario |
| Namespace global | `window.ProCalc` | Scripts clásicos necesitan un punto de extensión compartido sin módulos |
| Pantallas | No se implementan pantallas finales aún | Evitar diseño de producto fuera de etapa |
| Idioma UI | Inglés | Textos de UI, errores e historial en inglés (§5.4) |

---

## 3. Alcance funcional (requisitos)

Funcionalidades pedidas. **Aún no implementadas** (salvo cimientos de Etapa A); quedan como alcance del producto.

### 3.1 Operaciones básicas

- Suma
- Resta
- Multiplicación
- División
- Porcentaje
- Potencias
- Raíces
- Factorial
- Valor absoluto

### 3.2 Funciones científicas

- Seno, coseno, tangente
- Arcoseno, arcocoseno, arcotangente
- Logaritmo decimal
- Logaritmo natural
- Exponencial
- Constantes π y e
- Potencias de 10
- Notación científica

### 3.3 Conversiones de unidades

- Longitud
- Masa
- Temperatura
- Tiempo
- Área
- Volumen
- Velocidad
- Energía
- Monedas

### 3.4 Conversión entre bases numéricas

- Binario
- Decimal
- Hexadecimal
- Octal

### 3.5 Interfaz y experiencia

- Modo oscuro
- Diseño responsive
- Mostrar pasos del cálculo (si es posible según la operación)
- Atajos de teclado
- Teclado físico y virtual
- Manejo de carga y error
- Historial de operaciones (con datos de cada registro)

---

## 4. Estructura de carpetas

```text
/
├── index.html          # Punto de entrada HTML
├── spec.md             # Esta especificación
├── css/
│   └── styles.css      # Estilos globales (base)
├── js/
│   ├── app.js          # Arranque de la aplicación
│   ├── core/           # Motor de cálculo (etapas B1/B2)
│   ├── converters/     # Conversiones (etapa E)
│   ├── ui/             # Interfaz (etapas C1/C2/D)
│   └── utils/          # Utilidades compartidas (etapa A)
│       ├── errors.js
│       └── numberFormat.js
└── assets/
    ├── icons/          # Iconos (futuro)
    └── images/         # Imágenes (futuro)
```

### Responsabilidad de cada carpeta `js/`

- **`core/`** — evaluación de expresiones, operaciones básicas y científicas, pasos de cálculo.
- **`converters/`** — unidades, monedas y bases numéricas.
- **`ui/`** — DOM, teclado virtual/físico, atajos, modo oscuro, estados de carga/error, historial.
- **`utils/`** — helpers reutilizables (formato numérico, errores, etc.). Sin DOM.

**Regla:** no mezclar cálculo con DOM.

---

## 5. Decisiones técnicas documentadas

### 5.1 Sin build step

Se sirve HTML/CSS/JS estáticos. No hay npm, Vite, Webpack ni similares por ahora.

### 5.2 Organización de scripts clásicos

`index.html` carga los scripts con `<script>` en orden de dependencia.

Orden actual (Etapa A):

1. `js/utils/errors.js`
2. `js/utils/numberFormat.js`
3. `js/app.js`

Orden previsto cuando crezcan las capas: `utils` → `core` → `converters` → `ui` → `app.js`.

### 5.3 Estilos

Un único archivo `css/styles.css` como hoja global. Temas (claro/oscuro) y layout responsive se definirán en etapas C1/C2.

### 5.4 Idioma de la interfaz

Textos de UI, mensajes de error e historial en **inglés**. Si se requiere otro idioma o i18n, debe confirmarse antes de implementar pantallas.

### 5.5 Etapa A — cimientos

- `ProCalc.utils.errors`: códigos y fábrica de errores de aplicación.
- `ProCalc.utils.numberFormat`: stub de formato; acepta `fractionDigits` por llamada.
- `app.js` verifica que los utils cargaron y marca `ProCalc.stage = "A"`, `ProCalc.ready = true`.
- El default interno `PROVISIONAL_FRACTION_DIGITS` es solo cableado temporal; **no** cierra el punto abierto §6.3.

---

## 6. Puntos abiertos (pendientes de decisión)

Estos puntos **siguen abiertos**. Hay que definirlos antes de implementar la funcionalidad correspondiente:

1. **Monedas:** ¿tasas fijas/manuales o API externa en tiempo real? Si es API, ¿cuál y con qué política de actualización/caché?
2. **Ángulos trigonométricos:** ¿grados, radianes, o ambos con selector?
3. **Precisión numérica:** ¿cuántos decimales mostrar y cómo redondear?
4. **Historial:** ¿solo en memoria de la sesión o persistencia (`localStorage`)?
5. **Pasos del cálculo:** ¿para todas las operaciones o solo para un subconjunto (p. ej. expresiones compuestas)?
6. **Nombre del producto en UI:** confirmar si se muestra siempre como **ProCalc**.

**Pendiente de arquitectura (antes de B2):** modelo de entrada — teclado → tokens internos (recomendado) vs expresión de texto libre.

---

## 7. Plan de implementación aprobado

Etapas acordadas. Cada una se implementa, se revisa y se aprueba antes de la siguiente.

| Etapa | Alcance | Estado |
|---|---|---|
| **A** | Utils mínimos (`errors`, `numberFormat` stub) + arranque | Hecha — pendiente de revisión |
| **B1** | Operaciones básicas/científicas puras (sin parser de expresiones) | Pendiente |
| **B2** | Evaluación / pasos (tras §6.2, §6.3, §6.5 + modelo de entrada) | Pendiente |
| **C1** | Shell UI + keypad + errores visibles | Pendiente |
| **C2** | Tema / atajos / responsive | Pendiente |
| **D** | Historial (tras §6.4 + forma del registro) | Pendiente |
| **E** | Unidades + bases; monedas aparte tras §6.1 | Pendiente |

### Fuera de alcance hasta que se pida

- Diseñar la interfaz final de la calculadora
- Agregar librerías, frameworks o herramientas de build
- Resolver los puntos abiertos de la sección 6 por cuenta propia
- Implementar monedas antes de decidir §6.1

---

## 8. Criterio de éxito — Etapa A

- [x] Namespace `window.ProCalc` definido
- [x] `js/utils/errors.js` y `js/utils/numberFormat.js` cargan antes de `app.js`
- [x] `app.js` valida utils y deja `ProCalc.ready === true`
- [x] Sin motor de cálculo, sin UI de calculadora, sin conversiones, sin historial
- [x] Sin librerías externas ni build step
- [x] Puntos abiertos §6 sin resolver (el default de formato es provisional y documentado)
- [x] `spec.md` actualizado con plan aprobado y estado de Etapa A

### Cómo revisar Etapa A

1. Abrir `index.html` en el navegador (sin build).
2. En la consola: `ProCalc.ready` → `true`, `ProCalc.stage` → `"A"`.
3. Probar: `ProCalc.utils.errors.createError("DIVISION_BY_ZERO")`.
4. Probar: `ProCalc.utils.numberFormat.formatNumber(0.1 + 0.2)`.
