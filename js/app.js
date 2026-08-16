/**
 * ProCalc — application bootstrap (Stage A).
 * Wires shared utils only. Core, UI, converters, and history come in later stages.
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

  function boot() {
    assertUtilsReady();
    root.stage = "A";
    root.ready = true;
    console.log("ProCalc: Stage A ready (utils + bootstrap).");
  }

  boot();
})(window);
