(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    root.SturdyTextbox = factory(root.jQuery);
  }

}(this, function ($) {
  "use strict";

  var _instance = null;
  var _getInstance = function() {
    return _instance || (_instance = new ValidatorFactory());
  };

  /*
  *   ValidatorFactory:  Prototype for validator factory.  The "MEAT" of this thing.
  *
  *   Properties:
  *     - settings [object]: The config settings.  These may change.
  *   Methods:
  *     - init(options) [null]: Initializes the library.
  *     - push(type, fn) [null]: Pushes a validator to the collection of validators.
  *         - type:  The type of validator, e.g. "Email"
  *         - fn: A function that expects n-number of args and returns true/false.
  */
  var ValidatorFactory = function() {};
  /*
  *   BaseValidator:  Prototype for validators.
  *
  *   Properties:
  *     - type [string]: The type of validator, e.g. "Email"
  *   Methods:
  *     - valid(args*) [boolean]: Returns true/false if valid or not.
  *       Note:  This method may be implemented differently depending upon the type.
  */
  var BaseValidator = function (type, valid) {
    this.type = type;
    if (valid) {
      this.valid = valid;
    }
  };

  // Private
  //

  /*
  *   Makes the library.
  */
  function _make(instance) {
    _extend(instance);
    _addValidators(instance);
  }

  /*
  *   Extends these objects:
  *     - ValidatorFactory
  *     - BaseValidator
  */
  function _extend(instance) {
    $.extend(ValidatorFactory.prototype, {
      settings: {
        prefix: 'data-',
        selector: '[data-type],[data-required]',
        type: 'type',
        on: 'on',
        enabled: true,
        default: 'blur',
        defaultType: 'required',
        pluginEnabled: false,
        success: function($el) {
          $el.addClass('valid').removeClass('invalid');
        },
        fail: function($el) {
          $el.addClass('invalid').removeClass('valid');
        },
        error: function(e) { console.log(e); }
      },
      _validators: [],
      _elements: [],
      init: function (options) {
        options = $.extend({}, instance.settings, options);

        var elements = $(options.selector);
        var haveElements = elements && elements.length > 0;
        var wireUp = instance._wireUp;

        if (haveElements) {
          this._elements = elements.toArray();
          this._elements.forEach(function(el) {
            wireUp(el);
          });
        }
      },
      push: function(type, fn) {
        this._validators.push(new BaseValidator(type, fn));
      },
      _wireUp: function(el) {
        var $el = el.jquery ? el : $(el),
            events = instance._events($el),
            type = $el.data(instance.settings.type),
            defaults = instance._defaults(type);

        var on = defaults.concat(events.filter(function (e) {
          return defaults.indexOf(e) < 0;
        })).join(' ');

        $el.on(on, function() {
          instance._validate($el, type, $el.val());
        });
      },
      _events: function($el) {
        var on = $el.data(instance.settings.on);
        if (on) {
          on = on.split(',');
        }
        return on || [];
      },
      _defaults: function(type) {
        var defaults = ['blur'];
        if (type === 'form') {
          defaults = ['submit'];
        }
        return defaults;
      },
      _validate: function ($el, type, value) {
        var settings = instance.settings;
        var validator = instance._lookup(type);
        try {
          var valid = validator.valid(value);
          if (valid) {
            settings.success($el);
          }
          else {
            settings.fail($el);
          }
        } catch(e) {
          settings.error(e);
        }
      },
      _lookup: function (type) {
        var index = instance._validators.map(function(validator) {
          return validator.type;
        }).indexOf(type);
        return instance._validators[index];
      }
    });

    $.extend(BaseValidator.prototype, {
      valid: function () {
        throw new Error('Validate is not implemented.');
      },
      _isMatch: function (value, regex) {
        return regex.test(value);
      }
    });
  }

  /*
  *   Adds the following validators:
  *     - credit card
  *     - date
  *     - email
  *     - phone
  *     - social security
  *     - time
  *     - url
  *     - form
  */
  var _addValidators = function(instance) {

    // Credit Card
    instance.push('credit-card', function(value) {
      return is.creditCard(value);
    });

    // Date
    instance.push('date', function(value) {
      return is.dateString(value);
    });

    // Email
    instance.push('email', function(value) {
      return is.email(value);
    });

    // Phone
    instance.push('phone', function(value) {
      return is.nanpPhone(value) && is.eppPhone(value);
    });

    // Social Security
    instance.push('social-security', function(value) {
      return is.socialSecurityNumber(value);
    });

    // Time
    instance.push('time', function(value) {
      return is.timeString(value);
    });

    // Time
    instance.push('url', function(value) {
      return is.url(value);
    });
  };

  _make(_getInstance());

  return _getInstance();
}));
