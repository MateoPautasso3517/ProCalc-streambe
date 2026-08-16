/**
 * ProCalc — shared error helpers (Stage A).
 * UI copy stays in English per spec §5.4. Does not resolve open product decisions.
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});
  var utils = root.utils || (root.utils = {});

  var ERROR_CODES = {
    INVALID_INPUT: "INVALID_INPUT",
    DIVISION_BY_ZERO: "DIVISION_BY_ZERO",
    DOMAIN_ERROR: "DOMAIN_ERROR",
    OVERFLOW: "OVERFLOW",
    NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
    UNKNOWN: "UNKNOWN"
  };

  var DEFAULT_MESSAGES = {
    INVALID_INPUT: "Invalid input.",
    DIVISION_BY_ZERO: "Cannot divide by zero.",
    DOMAIN_ERROR: "Value is outside the allowed domain.",
    OVERFLOW: "Result is out of range.",
    NOT_IMPLEMENTED: "This feature is not implemented yet.",
    UNKNOWN: "Something went wrong."
  };

  /**
   * @param {string} code
   * @param {string} [message]
   * @param {Object} [details]
   * @returns {{ code: string, message: string, details: Object }}
   */
  function createError(code, message, details) {
    var resolvedCode = ERROR_CODES[code] ? code : ERROR_CODES.UNKNOWN;
    return {
      code: resolvedCode,
      message: message || DEFAULT_MESSAGES[resolvedCode] || DEFAULT_MESSAGES.UNKNOWN,
      details: details || {}
    };
  }

  /**
   * @param {unknown} value
   * @returns {value is { code: string, message: string }}
   */
  function isAppError(value) {
    return Boolean(
      value &&
        typeof value === "object" &&
        typeof value.code === "string" &&
        typeof value.message === "string"
    );
  }

  utils.errors = {
    ERROR_CODES: ERROR_CODES,
    DEFAULT_MESSAGES: DEFAULT_MESSAGES,
    createError: createError,
    isAppError: isAppError
  };
})(window);
