/**
 * ProCalc — unit tests for Stage B1 core (vanilla Node, no npm).
 * Run: node tests/run-core-tests.js
 *
 * Each case documents what it validates in the `why` field.
 */
(function () {
  "use strict";

  var fs = require("fs");
  var path = require("path");
  var vm = require("vm");

  var rootDir = path.join(__dirname, "..");
  var scripts = [
    "js/utils/errors.js",
    "js/utils/numberFormat.js",
    "js/core/result.js",
    "js/core/operations.js",
    "js/core/scientific.js",
    "js/core/calculator.js",
    "js/app.js"
  ];

  var context = {
    window: {},
    console: console,
    Math: Math,
    Number: Number,
    Object: Object
  };
  vm.createContext(context);

  scripts.forEach(function (relativePath) {
    var code = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    vm.runInContext(code, context, { filename: relativePath });
  });

  var ProCalc = context.window.ProCalc;
  var core = ProCalc.core;
  var result = core.result;

  var passed = 0;
  var failed = 0;
  var failures = [];

  function near(actual, expected, epsilon) {
    return Math.abs(actual - expected) < (epsilon || 1e-10);
  }

  function assert(condition, name, why) {
    if (condition) {
      passed += 1;
      console.log("PASS  " + name);
      console.log("      → " + why);
    } else {
      failed += 1;
      failures.push(name);
      console.log("FAIL  " + name);
      console.log("      → " + why);
    }
  }

  console.log("\n=== result helpers ===\n");

  assert(
    result.isValidNumber(3) === true &&
      result.isValidNumber(NaN) === false &&
      result.isValidNumber(Infinity) === false &&
      result.isValidNumber("3") === false,
    "result.isValidNumber",
    "Valida solo numbers finitos; rechaza NaN, Infinity y no-números."
  );

  assert(
    result.ok(4).ok === true && result.ok(4).value === 4,
    "result.ok finite",
    "Envuelve un número finito en { ok: true, value }."
  );

  assert(
    result.ok(Infinity).ok === false && result.ok(Infinity).error.code === "OVERFLOW",
    "result.ok non-finite → OVERFLOW",
    "Un resultado no finito se convierte en error OVERFLOW."
  );

  assert(
    result.fail("DIVISION_BY_ZERO").ok === false &&
      result.fail("DIVISION_BY_ZERO").error.code === "DIVISION_BY_ZERO",
    "result.fail",
    "Construye { ok: false, error } con el código pedido."
  );

  assert(
    result.requireNumber(NaN, "x") !== null &&
      result.requireNumber(NaN, "x").error.code === "INVALID_INPUT" &&
      result.requireNumber(1, "x") === null,
    "result.requireNumber",
    "Devuelve error INVALID_INPUT si no es número finito; null si es válido."
  );

  console.log("\n=== operations — casos correctos ===\n");

  assert(
    core.add(2, 3).ok && core.add(2, 3).value === 5,
    "add(2, 3)",
    "Suma básica correcta."
  );

  assert(
    core.subtract(10, 4).ok && core.subtract(10, 4).value === 6,
    "subtract(10, 4)",
    "Resta básica correcta."
  );

  assert(
    core.multiply(6, 7).ok && core.multiply(6, 7).value === 42,
    "multiply(6, 7)",
    "Multiplicación básica correcta."
  );

  assert(
    core.divide(9, 3).ok && core.divide(9, 3).value === 3,
    "divide(9, 3)",
    "División básica correcta."
  );

  assert(
    core.percent(50).ok && core.percent(50).value === 0.5,
    "percent(50)",
    "Porcentaje unario: x/100."
  );

  assert(
    core.percentOf(10, 200).ok && core.percentOf(10, 200).value === 20,
    "percentOf(10, 200)",
    "Porcentaje de: (a/100)*b."
  );

  assert(
    core.pow(2, 8).ok && core.pow(2, 8).value === 256,
    "pow(2, 8)",
    "Potencia correcta."
  );

  assert(
    core.sqrt(9).ok && core.sqrt(9).value === 3,
    "sqrt(9)",
    "Raíz cuadrada de perfecto cuadrado."
  );

  assert(
    core.nthRoot(27, 3).ok && near(core.nthRoot(27, 3).value, 3),
    "nthRoot(27, 3)",
    "Raíz cúbica correcta."
  );

  assert(
    core.nthRoot(-8, 3).ok && near(core.nthRoot(-8, 3).value, -2),
    "nthRoot(-8, 3)",
    "Raíz impar de negativo permitida."
  );

  assert(
    core.factorial(5).ok && core.factorial(5).value === 120,
    "factorial(5)",
    "Factorial de entero positivo."
  );

  assert(
    core.abs(-7).ok && core.abs(-7).value === 7,
    "abs(-7)",
    "Valor absoluto de negativo."
  );

  console.log("\n=== operations — inválidos ===\n");

  assert(
    !core.add("2", 3).ok && core.add("2", 3).error.code === "INVALID_INPUT",
    "add invalid type",
    "Rechaza entradas no numéricas con INVALID_INPUT."
  );

  assert(
    !core.divide(1, 0).ok && core.divide(1, 0).error.code === "DIVISION_BY_ZERO",
    "divide by zero",
    "División por cero → DIVISION_BY_ZERO."
  );

  assert(
    !core.sqrt(-1).ok && core.sqrt(-1).error.code === "DOMAIN_ERROR",
    "sqrt negative",
    "Raíz de negativo → DOMAIN_ERROR."
  );

  assert(
    !core.nthRoot(-16, 2).ok && core.nthRoot(-16, 2).error.code === "DOMAIN_ERROR",
    "nthRoot even of negative",
    "Raíz par de negativo no soportada."
  );

  assert(
    !core.nthRoot(8, 0).ok && core.nthRoot(8, 0).error.code === "DOMAIN_ERROR",
    "nthRoot degree 0",
    "Grado de raíz 0 → DOMAIN_ERROR."
  );

  assert(
    !core.factorial(-1).ok && core.factorial(-1).error.code === "DOMAIN_ERROR",
    "factorial negative",
    "Factorial negativo → DOMAIN_ERROR."
  );

  assert(
    !core.factorial(3.5).ok && core.factorial(3.5).error.code === "DOMAIN_ERROR",
    "factorial non-integer",
    "Factorial no entero → DOMAIN_ERROR."
  );

  console.log("\n=== operations — límites ===\n");

  assert(
    core.factorial(0).ok && core.factorial(0).value === 1,
    "factorial(0)",
    "Caso límite 0! = 1."
  );

  assert(
    core.factorial(170).ok && Number.isFinite(core.factorial(170).value),
    "factorial(170)",
    "Límite superior aceptado (aún finito en IEEE-754)."
  );

  assert(
    !core.factorial(171).ok && core.factorial(171).error.code === "OVERFLOW",
    "factorial(171)",
    "Por encima de 170 → OVERFLOW."
  );

  assert(
    core.sqrt(0).ok && core.sqrt(0).value === 0,
    "sqrt(0)",
    "Raíz de cero es cero."
  );

  assert(
    core.divide(-6, -2).ok && core.divide(-6, -2).value === 3,
    "divide negatives",
    "División con ambos negativos."
  );

  assert(
    core.pow(0, 0).ok && core.pow(0, 0).value === 1,
    "pow(0, 0)",
    "Límite 0^0 según Math.pow (1 en JS)."
  );

  console.log("\n=== scientific — casos correctos ===\n");

  assert(
    core.sin(30, "deg").ok && near(core.sin(30, "deg").value, 0.5),
    "sin(30, deg)",
    "Seno en grados con angleMode explícito."
  );

  assert(
    core.sin(Math.PI / 2, "rad").ok && near(core.sin(Math.PI / 2, "rad").value, 1),
    "sin(π/2, rad)",
    "Seno en radianes con angleMode explícito."
  );

  assert(
    core.cos(0, "deg").ok && near(core.cos(0, "deg").value, 1),
    "cos(0, deg)",
    "Coseno de 0°."
  );

  assert(
    core.asin(0.5, "deg").ok && near(core.asin(0.5, "deg").value, 30),
    "asin(0.5, deg)",
    "Arcoseno devuelve grados cuando angleMode=deg."
  );

  assert(
    core.log10(1000).ok && near(core.log10(1000).value, 3),
    "log10(1000)",
    "Logaritmo decimal correcto."
  );

  assert(
    core.ln(core.E).ok && near(core.ln(core.E).value, 1),
    "ln(e)",
    "Logaritmo natural de e."
  );

  assert(
    core.exp(0).ok && core.exp(0).value === 1,
    "exp(0)",
    "Exponencial de 0."
  );

  assert(
    core.pow10(3).ok && core.pow10(3).value === 1000,
    "pow10(3)",
    "Potencia de 10."
  );

  assert(
    core.scientificParts(1234).ok &&
      core.scientificParts(1234).value.exponent === 3 &&
      near(core.scientificParts(1234).value.coefficient, 1.234),
    "scientificParts(1234)",
    "Partes notación científica: coeficiente * 10^exponente."
  );

  console.log("\n=== scientific — inválidos ===\n");

  assert(
    !core.sin(30).ok && core.sin(30).error.code === "INVALID_INPUT",
    "sin without angleMode",
    "Sin angleMode no se asume default de producto (§6.2 abierto)."
  );

  assert(
    !core.sin(30, "grads").ok && core.sin(30, "grads").error.code === "INVALID_INPUT",
    "sin invalid angleMode",
    "angleMode distinto de deg|rad → INVALID_INPUT."
  );

  assert(
    !core.asin(2, "rad").ok && core.asin(2, "rad").error.code === "DOMAIN_ERROR",
    "asin out of domain",
    "Arcoseno fuera de [-1,1] → DOMAIN_ERROR."
  );

  assert(
    !core.log10(0).ok && core.log10(0).error.code === "DOMAIN_ERROR",
    "log10(0)",
    "Log de no positivo → DOMAIN_ERROR."
  );

  assert(
    !core.ln(-2).ok && core.ln(-2).error.code === "DOMAIN_ERROR",
    "ln negative",
    "Ln de negativo → DOMAIN_ERROR."
  );

  assert(
    !core.tan(90, "deg").ok && core.tan(90, "deg").error.code === "DOMAIN_ERROR",
    "tan(90, deg)",
    "Tangente indefinida cerca de 90° → DOMAIN_ERROR."
  );

  console.log("\n=== scientific — límites ===\n");

  assert(
    core.scientificParts(0).ok &&
      core.scientificParts(0).value.coefficient === 0 &&
      core.scientificParts(0).value.exponent === 0,
    "scientificParts(0)",
    "Cero se mapea a coeficiente 0 y exponente 0."
  );

  assert(
    core.asin(-1, "deg").ok && near(core.asin(-1, "deg").value, -90),
    "asin(-1, deg)",
    "Borde inferior del dominio de arcsin."
  );

  assert(
    core.acos(1, "rad").ok && near(core.acos(1, "rad").value, 0),
    "acos(1, rad)",
    "Borde superior del dominio de arccos."
  );

  assert(
    core.log10(1).ok && core.log10(1).value === 0,
    "log10(1)",
    "Log10(1) = 0 (borde positivo mínimo típico)."
  );

  assert(
    ProCalc.stage === "B1" && ProCalc.ready === true,
    "bootstrap stage B1",
    "Tras el refactor el arranque sigue en etapa B1."
  );

  console.log("\n=== summary ===");
  console.log("Passed: " + passed);
  console.log("Failed: " + failed);
  if (failures.length) {
    console.log("Failing cases: " + failures.join(", "));
    process.exitCode = 1;
  } else {
    console.log("All tests passed.");
  }
})();
