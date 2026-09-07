/**
 * ProCalc — scientific operations (Stage B1).
 * Pure functions; no DOM. Angle mode must be passed explicitly (§6.2 still open).
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});
  var core = root.core || (root.core = {});
  var result = core.result;

  if (!result) {
    throw new Error(
      "ProCalc: core.result missing. Load result.js before scientific.js."
    );
  }

  var ANGLE_MODES = {
    DEG: "deg",
    RAD: "rad"
  };

  var PI = Math.PI;
  var E = Math.E;
  var NEAR_ZERO = 1e-12;

  function requireAngleMode(angleMode) {
    if (angleMode !== ANGLE_MODES.DEG && angleMode !== ANGLE_MODES.RAD) {
      return result.fail(
        "INVALID_INPUT",
        'angleMode must be "deg" or "rad" (spec §6.2 still open; caller must choose).',
        { angleMode: angleMode }
      );
    }
    return null;
  }

  function toRadians(value, angleMode) {
    return angleMode === ANGLE_MODES.DEG ? (value * PI) / 180 : value;
  }

  function fromRadians(value, angleMode) {
    return angleMode === ANGLE_MODES.DEG ? (value * 180) / PI : value;
  }

  function sin(x, angleMode) {
    return (
      result.requireNumber(x, "x") ||
      requireAngleMode(angleMode) ||
      result.ok(Math.sin(toRadians(x, angleMode)))
    );
  }

  function cos(x, angleMode) {
    return (
      result.requireNumber(x, "x") ||
      requireAngleMode(angleMode) ||
      result.ok(Math.cos(toRadians(x, angleMode)))
    );
  }

  function tan(x, angleMode) {
    var invalid = result.requireNumber(x, "x") || requireAngleMode(angleMode);
    if (invalid) {
      return invalid;
    }
    var radians = toRadians(x, angleMode);
    if (Math.abs(Math.cos(radians)) < NEAR_ZERO) {
      return result.fail("DOMAIN_ERROR", "Tangent is undefined for this angle.", {
        value: x,
        angleMode: angleMode
      });
    }
    return result.ok(Math.tan(radians));
  }

  function asin(x, angleMode) {
    var invalid = result.requireNumber(x, "x") || requireAngleMode(angleMode);
    if (invalid) {
      return invalid;
    }
    if (x < -1 || x > 1) {
      return result.fail("DOMAIN_ERROR", "Arcsine requires a value between -1 and 1.", {
        value: x
      });
    }
    return result.ok(fromRadians(Math.asin(x), angleMode));
  }

  function acos(x, angleMode) {
    var invalid = result.requireNumber(x, "x") || requireAngleMode(angleMode);
    if (invalid) {
      return invalid;
    }
    if (x < -1 || x > 1) {
      return result.fail(
        "DOMAIN_ERROR",
        "Arccosine requires a value between -1 and 1.",
        { value: x }
      );
    }
    return result.ok(fromRadians(Math.acos(x), angleMode));
  }

  function atan(x, angleMode) {
    return (
      result.requireNumber(x, "x") ||
      requireAngleMode(angleMode) ||
      result.ok(fromRadians(Math.atan(x), angleMode))
    );
  }

  function log10(x) {
    var invalid = result.requireNumber(x, "x");
    if (invalid) {
      return invalid;
    }
    if (x <= 0) {
      return result.fail("DOMAIN_ERROR", "Logarithm requires a positive value.", {
        value: x
      });
    }
    return result.ok(Math.log10(x));
  }

  function ln(x) {
    var invalid = result.requireNumber(x, "x");
    if (invalid) {
      return invalid;
    }
    if (x <= 0) {
      return result.fail("DOMAIN_ERROR", "Natural log requires a positive value.", {
        value: x
      });
    }
    return result.ok(Math.log(x));
  }

  function exp(x) {
    return result.requireNumber(x, "x") || result.ok(Math.exp(x));
  }

  /** pow10(x) → 10^x */
  function pow10(x) {
    return result.requireNumber(x, "x") || result.ok(Math.pow(10, x));
  }

  /**
   * Split a number into scientific notation parts: coefficient * 10^exponent.
   * Display precision remains open (§6.3); this only returns numeric parts.
   */
  function scientificParts(x) {
    var invalid = result.requireNumber(x, "x");
    if (invalid) {
      return invalid;
    }
    if (x === 0) {
      return { ok: true, value: { coefficient: 0, exponent: 0 } };
    }
    var exponent = Math.floor(Math.log10(Math.abs(x)));
    var coefficient = x / Math.pow(10, exponent);
    if (!Number.isFinite(coefficient) || !Number.isFinite(exponent)) {
      return result.fail("OVERFLOW", "Result is out of range.", { value: x });
    }
    return {
      ok: true,
      value: {
        coefficient: coefficient,
        exponent: exponent
      }
    };
  }

  core.scientific = {
    ANGLE_MODES: ANGLE_MODES,
    PI: PI,
    E: E,
    sin: sin,
    cos: cos,
    tan: tan,
    asin: asin,
    acos: acos,
    atan: atan,
    log10: log10,
    ln: ln,
    exp: exp,
    pow10: pow10,
    scientificParts: scientificParts
  };
})(window);
