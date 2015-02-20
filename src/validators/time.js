Sturdy.Validator.Validators.push(new Sturdy.Validator.ValidatorBase('time', function(value) {
  return value.match(/^\d{1,2}:\d{2}([ap]m)?$/);
}));
