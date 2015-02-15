Validator = function (type, validate) {
  this.type = type;
  this.validate = validate;
};
Validator.prototype.type = 'base';
Validator.prototype.validate = function () { throw new Error('\'validat\' method not implemented.')};
