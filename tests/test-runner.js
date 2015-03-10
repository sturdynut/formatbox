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
  ['QUnit', 'jquery', '../dist/sturdy-validator', 'helpers/edge-cases', 'unit/email-test', 'unit/phone-test'],
  function (QUnit, jQuery, sturdyValidator, edgeCases, emailTest, phoneTest) {
    var defaultOptions = {
      validator: sturdyValidator,
      edgeCases: edgeCases
    };

    emailTest(defaultOptions);
    phoneTest(defaultOptions);

    QUnit.load();
    QUnit.start();
  }
);
