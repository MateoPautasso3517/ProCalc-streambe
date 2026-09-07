/**
 * ProCalc — shared result helpers for the core contract (B1 refactor).
 * { ok: true, value } | { ok: false, error }. No DOM.
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});
  var core = root.core || (root.core = {});
  var createError = root.utils.errors.createError;

  function isValidNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

  function fail(code, message, details) {
    return { ok: false, error: createError(code, message, details) };
  }

  function ok(value) {
    if (!Number.isFinite(value)) {
      return fail("OVERFLOW", "Result is out of range.", { value: value });
    }
    return { ok: true, value: value };
  }

  function requireNumber(value, name) {
    if (!isValidNumber(value)) {
      return fail("INVALID_INPUT", "Expected a finite number for " + name + ".", {
        name: name,
        value: value
      });
    }
    return null;
  }

  core.result = {
    isValidNumber: isValidNumber,
    ok: ok,
    fail: fail,
    requireNumber: requireNumber
  };
})(window);
