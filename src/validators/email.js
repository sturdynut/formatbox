if (SturdyValidator) {
  SturdyValidator.add(new Validator(
    'email',
    function(value) {
      return value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    }
  ));
} else { throw new Error('SturdyValidator Error: Cannot add validator.'); }
