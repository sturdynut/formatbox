"use strict";

require.config({
  paths: {
    'QUnit': 'qunit'
  },
  shim: {
    'QUnit': {
      exports: 'QUnit',
      init: function() {
        QUnit.config.autoload = false;
        QUnit.config.autostart = false;
      }
    }
  }
});

require(
  ['QUnit', 'jquery', '../dist/sturdy-validator', 'unit/email-test'],
  function (QUnit, sturdyValidator, emailTest) {
    emailTest.run();

    QUnit.load();
    QUnit.start();
  }
)
