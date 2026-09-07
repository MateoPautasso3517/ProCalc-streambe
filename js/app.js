/**
 * ProCalc — application bootstrap (Stage B1).
 * Wires utils + core. UI, converters, and history come in later stages.
 */
(function (global) {
  "use strict";

  var root = global.ProCalc || (global.ProCalc = {});

  function assertUtilsReady() {
    var utils = root.utils;
    if (!utils || !utils.errors || !utils.numberFormat) {
      throw new Error("ProCalc: utils failed to load. Check script order in index.html.");
    }
  }

  function assertCoreReady() {
    var core = root.core;
    if (!core || !core.add || !core.sin || !core.scientificParts) {
      throw new Error("ProCalc: core failed to load. Check script order in index.html.");
    }
  }

  function boot() {
    assertUtilsReady();
    assertCoreReady();
    root.stage = "B1";
    root.ready = true;
    console.log("ProCalc: Stage B1 ready (utils + core operations).");
  }

  boot();
})(window);
