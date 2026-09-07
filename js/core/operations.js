/**
 * ProCalc — basic arithmetic operations (Stage B1).
 * Pure functions; no DOM. Returns { ok, value } or { ok, error }.
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});
  var core = root.core || (root.core = {});
  var result = core.result;

  if (!result) {
    throw new Error(
      "ProCalc: core.result missing. Load result.js before operations.js."
    );
  }

  function add(a, b) {
    return result.requireNumber(a, "a") || result.requireNumber(b, "b") || result.ok(a + b);
  }

  function subtract(a, b) {
    return result.requireNumber(a, "a") || result.requireNumber(b, "b") || result.ok(a - b);
  }

  function multiply(a, b) {
    return result.requireNumber(a, "a") || result.requireNumber(b, "b") || result.ok(a * b);
  }

  function divide(a, b) {
    var invalid = result.requireNumber(a, "a") || result.requireNumber(b, "b");
    if (invalid) {
      return invalid;
    }
    if (b === 0) {
      return result.fail("DIVISION_BY_ZERO");
    }
    return result.ok(a / b);
  }

  /** percent(x) → x / 100 */
  function percent(x) {
    return result.requireNumber(x, "x") || result.ok(x / 100);
  }

  /** percentOf(a, b) → (a / 100) * b */
  function percentOf(a, b) {
    return (
      result.requireNumber(a, "a") ||
      result.requireNumber(b, "b") ||
      result.ok((a / 100) * b)
    );
  }

  function pow(base, exponent) {
    var invalid =
      result.requireNumber(base, "base") || result.requireNumber(exponent, "exponent");
    if (invalid) {
      return invalid;
    }
    return result.ok(Math.pow(base, exponent));
  }

  function sqrt(x) {
    var invalid = result.requireNumber(x, "x");
    if (invalid) {
      return invalid;
    }
    if (x < 0) {
      return result.fail("DOMAIN_ERROR", "Square root requires a non-negative value.", {
        value: x
      });
    }
    return result.ok(Math.sqrt(x));
  }

  /** nthRoot(x, n) → x^(1/n) */
  function nthRoot(x, n) {
    var invalid = result.requireNumber(x, "x") || result.requireNumber(n, "n");
    if (invalid) {
      return invalid;
    }
    if (n === 0) {
      return result.fail("DOMAIN_ERROR", "Root degree cannot be zero.", { n: n });
    }
    if (x < 0) {
      if (Math.abs(n % 2) !== 1) {
        return result.fail(
          "DOMAIN_ERROR",
          "Even roots of negative values are not supported.",
          { value: x, n: n }
        );
      }
      return result.ok(-Math.pow(-x, 1 / n));
    }
    return result.ok(Math.pow(x, 1 / n));
  }

  /**
   * Factorial for non-negative integers only.
   * Values above 170 overflow IEEE-754 range.
   */
  function factorial(n) {
    var invalid = result.requireNumber(n, "n");
    if (invalid) {
      return invalid;
    }
    if (n < 0 || !Number.isInteger(n)) {
      return result.fail(
        "DOMAIN_ERROR",
        "Factorial requires a non-negative integer.",
        { value: n }
      );
    }
    if (n > 170) {
      return result.fail("OVERFLOW", "Factorial result is out of range.", { value: n });
    }
    var product = 1;
    for (var i = 2; i <= n; i += 1) {
      product *= i;
    }
    return result.ok(product);
  }

  function abs(x) {
    return result.requireNumber(x, "x") || result.ok(Math.abs(x));
  }

  core.operations = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    percent: percent,
    percentOf: percentOf,
    pow: pow,
    sqrt: sqrt,
    nthRoot: nthRoot,
    factorial: factorial,
    abs: abs
  };
})(window);
