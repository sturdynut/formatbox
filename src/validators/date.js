Sturdy.Validator.Validators.push(new Sturdy.Validator.ValidatorBase('date', function(value) {
  return value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
}));
