if (Sturdy && Sturdy.Validator) {
  Sturdy.Validator.Base = function (type, validate) {
    this.type = type;
    this.validate = validate;
  };
  Sturdy.Validator.Base.prototype.type = 'base';
  Sturdy.Validator.Base.prototype.validate = function () { throw new Error('\'validat\' method not implemented.')};
} else { throw new Error('Sturdy Error: undefined.'); }
