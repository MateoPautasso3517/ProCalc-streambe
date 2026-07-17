# 1. Proyecto

## Nombre: ProCalc
**Qué es**: calculadora científica web (operaciones, conversiones, historial, teclado físico/virtual)
**Estado**: base inicial; no inventar pantallas ni features fuera de la tarea

# 2. Fuente de verdad

spec.md define alcance, decisiones y puntos abiertos
Si hay conflicto entre AGENTS.md y spec.md → gana el SPEC
No resolver puntos abiertos del SPEC sin preguntar

# 3. Stack y restricciones técnicas

HTML5 + CSS3 + JavaScript vanilla
Sin frameworks, sin bundlers, sin npm (salvo que se pida)
Scripts clásicos (sin type="module" por ahora)
Estructura plana: index.html, css/, js/, assets/
Persistencia: localStorage solo si el SPEC/tarea lo habilita 
UI en ingles

# 4. Mapa del repositorio

js/app.js → arranque
js/core/ → motor de cálculo
js/converters/ → unidades, monedas, bases
js/ui/ → DOM, teclado, temas, historial, errores
js/utils/ → helpers compartidos
css/ → estilos (ver sección CSS)
assets/ → iconos/imágenes
Regla: no mezclar cálculo con DOM

# 5. CSS

Por defecto: un styles.css
Si la UI crece: se permite dividir en pocos archivos por responsabilidad (base, layout, components, themes), cargados en orden desde index.html
Sin preprocesadores ni CSS-in-JS

# 6. Estilo de código 

Responsabilidades claras, funciones reutilizables, clean code
HTML clases: kebab-case
JS variables/funciones: camelCase
Constantes: UPPER_SNAKE_CASE
Clases JS (si las hay): PascalCase
Refactorizar cuando mejore claridad; no sobre-ingeniería

# 7. Comportamiento del agente 

Antes de un cambio significativo:
Leer spec.md y el código existente
Explicar el plan
Esperar aprobación en cambios grandes
Al implementar: explicar decisiones importantes
Tocar solo archivos necesarios
No crear archivos/carpetas innecesarias
Preservar funcionalidad existente
8. Restricciones 

## DO

Respetar estructura y capas
Manejar errores de forma visible en UI cuando corresponda
Verificar en navegador 

## DON’T 

No eliminar funcionalidades sin aprobación
No patrones complejos innecesarios
No instalar dependencias sin consultar
No agregar Git/build tools/frameworks sin pedirlo
No “resolver” puntos abiertos (monedas API, grados/radianes, precisión, persistencia del historial, etc.) asumiendo una opción
No diseñar la UI final si la tarea no lo pide

# 9. Puntos abiertos → protocolo

Referenciar sección 6 del SPEC
Ante duda: preguntar
No hardcodear una decisión de producto como si estuviera confirmada

# 10. Definition of Done
Cumple la tarea pedida, sin extras
Respeta stack y estructura
Textos de UI en español
No rompe lo existente
Se puede probar sirviendo/abriendo los estáticos, sin build
