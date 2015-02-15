if (Sturdy && Sturdy.Validator) {
  Sturdy.Validator.add(new Sturdy.Validator.Base(
    'email',
    function(value) {
      return value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    }
  ));
} else { throw new Error('Sturdy Error: Cannot add validator.'); }
