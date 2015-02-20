Sturdy.Validator.Validators.push(new Sturdy.Validator.ValidatorBase('social-security', function(value) {
  return value.match(/^\d{3}-\d{2}-\d{4}$/);
}));
