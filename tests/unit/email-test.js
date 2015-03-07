"use strict";
define(
  function() {
    var run = function(sturdyValidator) {
      test('Valid email address', function () {
        var validator = sturdyValidator._lookup('email');
        ok(validator);

        var validEmails = [
          'simple@email.com',
          'simple.dot@email.com',
          'simple@email.co.uk',
          'simple+plus@email.com'
        ];

        validEmails.forEach(function(email) {
          equal(true, validator.isValid(email));
        });

      });

      test('Invalid email address', function () {
        var validator = sturdyValidator._lookup('email');
        ok(validator);

        var invalidEmails = [
          'simpleemailcom',
          'simpleemail.com',
          'simple.dot@emailcom',
          'simple@email'
        ];

        invalidEmails.forEach(function(email) {
          equal(false, validator.isValid(email));
        });

      });
    };
    return { run: run }
  }
);
