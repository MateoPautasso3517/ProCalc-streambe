/**
 * ProCalc — number formatting stub (Stage A).
 * Precision / rounding policy remains an open point (spec §6.3).
 * The default below is only a temporary wiring fallback, not a product decision.
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});
  var utils = root.utils || (root.utils = {});

  /** Provisional fallback until §6.3 is decided. Do not treat as final UX policy. */
  var PROVISIONAL_FRACTION_DIGITS = 10;

  /**
   * @param {unknown} value
   * @param {{ fractionDigits?: number }} [options]
   * @returns {string}
   */
  function formatNumber(value, options) {
    var opts = options || {};
    var fractionDigits =
      typeof opts.fractionDigits === "number"
        ? opts.fractionDigits
        : PROVISIONAL_FRACTION_DIGITS;

    if (typeof value !== "number" || !isFinite(value)) {
      return String(value);
    }

    if (Object.is(value, -0)) {
      return "0";
    }

    var fixed = value.toFixed(fractionDigits);
    return fixed
      .replace(/(\.\d*?[1-9])0+$/, "$1")
      .replace(/\.0+$/, "")
      .replace(/\.$/, "");
  }

  utils.numberFormat = {
    PROVISIONAL_FRACTION_DIGITS: PROVISIONAL_FRACTION_DIGITS,
    formatNumber: formatNumber
  };
})(window);
