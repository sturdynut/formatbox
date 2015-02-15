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
  ['QUnit', 'unit/emailTest'],
  function (QUnit, emailTest) {
    emailTest.run();

    QUnit.load();
    QUnit.start();
  }
)
