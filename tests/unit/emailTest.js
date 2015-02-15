"use strict";
define(
  function() {
    var run = function() {
      test('This works', function () {
        equal(1, 1);
      })
    };
    return { run: run }
  }
);
