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
  ['QUnit', 'jQuery', '../dist/sturdy-validator', 'unit/email-test'],
  function (QUnit, jQuery, sturdyValidator, emailTest) {

    emailTest.run(sturdyValidator);

    QUnit.load();
    QUnit.start();
  }
)
