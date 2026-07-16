# ProCalc — Especificación del proyecto

## 1. Resumen

**ProCalc** es una aplicación web de calculadora científica con conversiones, historial y una interfaz usable desde teclado físico y virtual.

**Stack:** HTML, CSS y JavaScript vanilla (sin frameworks ni bundlers en esta etapa).

**Estado actual:** solo base inicial del proyecto (estructura, punto de entrada y esta especificación). Sin funcionalidades implementadas.

---

## 2. Decisiones técnicas confirmadas

| Decisión | Elección | Motivo |
|---|---|---|
| Estructura de carpetas | Plana en la raíz (`index.html`, `css/`, `js/`, `assets/`) | Preferencia del producto; simple de servir y de navegar |
| JavaScript | Scripts clásicos (sin `type="module"` por ahora) | Preferencia actual; se puede migrar a módulos ES más adelante si hace falta |
| Dependencias | Ninguna librería externa | Mantener el proyecto liviano y sin tooling innecesario |
| Control de versiones | Sin repositorio Git en esta etapa | Preferencia actual |
| Pantallas | No se implementan pantallas finales aún | Esta etapa solo define la base |

---

## 3. Alcance funcional (requisitos)

Funcionalidades pedidas. **No están implementadas en esta etapa**; quedan como alcance del producto.

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
│   ├── core/           # Motor de cálculo (futuro)
│   ├── converters/     # Conversiones de unidades, monedas y bases (futuro)
│   ├── ui/             # Interfaz, teclado, historial, temas (futuro)
│   └── utils/          # Utilidades compartidas (futuro)
└── assets/
    ├── icons/          # Iconos (futuro)
    └── images/         # Imágenes (futuro)
```

### Responsabilidad prevista de cada carpeta `js/`

- **`core/`** — evaluación de expresiones, operaciones básicas y científicas, pasos de cálculo.
- **`converters/`** — unidades, monedas y bases numéricas.
- **`ui/`** — DOM, teclado virtual/físico, atajos, modo oscuro, estados de carga/error, historial.
- **`utils/`** — helpers reutilizables (formato numérico, validaciones, etc.).

Los subdirectorios de `js/` y `assets/` existen como base escalable; el código de dominio se agregará en etapas posteriores.

---

## 5. Decisiones técnicas documentadas (esta etapa)

### 5.1 Sin build step

Se sirve HTML/CSS/JS estáticos. No hay npm, Vite, Webpack ni similares por ahora.

### 5.2 Organización de scripts clásicos

`index.html` cargará los scripts con etiquetas `<script>` en orden de dependencia. El único script activo hoy es `js/app.js`.

### 5.3 Estilos

Un único archivo `css/styles.css` como hoja global. Temas (claro/oscuro) y layout responsive se definirán cuando se implemente la interfaz.

### 5.4 Idioma de la interfaz

Se asume **ingles** para textos de UI, mensajes de error e historial, coherente con la comunicación del proyecto. Si se requiere otro idioma o i18n, debe confirmarse antes de implementar pantallas.

---

## 6. Puntos abiertos (pendientes de decisión)

Estos puntos **no se resuelven en esta etapa**. Hay que definirlos antes de implementar la funcionalidad correspondiente:

1. **Monedas:** ¿tasas fijas/manuales o API externa en tiempo real? Si es API, ¿cuál y con qué política de actualización/caché?
2. **Ángulos trigonométricos:** ¿grados, radianes, o ambos con selector?
3. **Precisión numérica:** ¿cuántos decimales mostrar y cómo redondear?
4. **Historial:** ¿solo en memoria de la sesión o persistencia (`localStorage`)?
5. **Pasos del cálculo:** ¿para todas las operaciones o solo para un subconjunto (p. ej. expresiones compuestas)?
6. **Nombre del producto en UI:** confirmar si se muestra siempre como **ProCalc**.

---

## 7. Fuera de alcance de esta etapa

- Implementar operaciones, conversiones o historial
- Diseñar la interfaz final de la calculadora
- Agregar librerías, frameworks o herramientas de build
- Inicializar Git
- Resolver los puntos abiertos de la sección 6

---

## 8. Criterio de éxito de la etapa actual

- [x] Proyecto HTML/CSS/JS creado
- [x] Estructura de carpetas clara y escalable
- [x] `spec.md` en la raíz con alcance y decisiones
- [x] Sin funcionalidades inventadas ni pantallas finales
- [x] Sin librerías innecesarias
- [x] Sin repositorio Git
