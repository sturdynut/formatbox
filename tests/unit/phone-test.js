'use strict';
define(
  function() {
    return function(args) {
      var validator = args.validator;
      var edgeCases = args.edgeCases;
      var phoneValidator = null;

      var getValidator = function() {
        return phoneValidator || (phoneValidator = validator._lookup('phone'));
      }

      test('We have a phone validator.', function () {
        ok(getValidator());
      });

      test('We can ensure a valid phone number.', function () {
        var validphoneNumbers = [
          '555-555-5555'
        ];

        validphoneNumbers.forEach(function(phoneNumber) {
          equal(true, getValidator().isValid(phoneNumber));
        });

      });

      test('We handle edge cases.', function () {
        edgeCases.forEach(function(phoneNumber) {
          equal(false, getValidator().isValid(phoneNumber));
        });
      });
    };
  }
);
