'use strict';
define(
  function() {
    return function(args) {
      var validator = args.validator,
          edgeCases = args.edgeCases,
          emailValidator = null;

      var getValidator = function() {
        return emailValidator || (emailValidator = validator._lookup('email'));
      }

      test('We have an email validator.', function () {
        ok(getValidator());
      });

      test('We can ensure a valid email address.', function () {
        var validEmails = [
          'simple@email.com',
          'simple.dot@email.com',
          'simple@email.co.uk',
          'simple+plus@email.com',
          '"Abc\@def"@example.com',
          '"Fred Bloggs"@example.com',
          '"Joe\\Blow"@example.com',
          '"Abc@def"@example.com',
          'customer/department=shipping@example.com',
          '\$A12345@example.com',
          '!def!xyz%abc@example.com',
          '_somename@example.com'
        ];

        validEmails.forEach(function(email) {
          equal(true, getValidator().isValid(email));
        });

      });

      test('We handle edge cases.', function () {
        edgeCases.forEach(function(email) {
          equal(false, getValidator().isValid(email));
        });
      });
    };
  }
);
