/**
 * ProCalc — core facade (Stage B1).
 * Aggregates basic and scientific operations under ProCalc.core.
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});
  var core = root.core || (root.core = {});
  var resultHelpers = core.result;
  var operations = core.operations;
  var scientific = core.scientific;

  if (!resultHelpers || !operations || !scientific) {
    throw new Error(
      "ProCalc: core modules missing. Load result.js, operations.js and scientific.js before calculator.js."
    );
  }

  root.core = {
    result: resultHelpers,
    operations: operations,
    scientific: scientific,
    ANGLE_MODES: scientific.ANGLE_MODES,
    PI: scientific.PI,
    E: scientific.E,
    add: operations.add,
    subtract: operations.subtract,
    multiply: operations.multiply,
    divide: operations.divide,
    percent: operations.percent,
    percentOf: operations.percentOf,
    pow: operations.pow,
    sqrt: operations.sqrt,
    nthRoot: operations.nthRoot,
    factorial: operations.factorial,
    abs: operations.abs,
    sin: scientific.sin,
    cos: scientific.cos,
    tan: scientific.tan,
    asin: scientific.asin,
    acos: scientific.acos,
    atan: scientific.atan,
    log10: scientific.log10,
    ln: scientific.ln,
    exp: scientific.exp,
    pow10: scientific.pow10,
    scientificParts: scientific.scientificParts
  };
})(window);
