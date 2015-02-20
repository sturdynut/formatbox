Sturdy.Validator.Validators.push(new Sturdy.Validator.ValidatorBase('credit-card', function(value) {
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  // creds: https://gist.github.com/DiegoSalazar/4075533
  var nCheck = 0, nDigit = 0, bEven = false;
  value = value.replace(/\D/g, '');

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}));
