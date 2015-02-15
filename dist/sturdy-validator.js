/*
 *  Sturdy Validator - v0.0.1
 *  A validator that just works.
 *  https://github.com/sturdynut/sturdy-validator
 *
 *  Made by Matti Salokangas
 *  Under MIT License
 */
(function ($, window, document, undefined) {

  "use strict";

  var Validator = function() {};
  Validator.prototype.validators = [];
  Validator.prototype.add = function (validator) {
    this.validators.push(validator);
  };
  Validator.prototype.lookup = function (type) {
    var index = this.validators.map(function(validator) {
      return validator.type;
    }).indexOf(type);
    return this.validators[index];
  };
  Validator.prototype.init = function (options) {
    var defaults = {
      enabled: true,
      validators: this.validators
    };
    options = $.extend({}, defaults, options);

    this._initPlugIn(options);
  };
  Validator.prototype._initPlugIn = function (options) {
    var pluginName = "validate",
      defaults = {
        enabled: options.enabled,
        defaultEvent: 'keyup',
        defaultType: 'email',
        success: function() {},
        fail: function() {},
        error: function() {}
      };

    function Plugin (element, options) {
      this.element = element;
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    $.extend(Plugin.prototype, {
      init: function () {
        var $el = $(this.element),
            settings = this.settings;

        return settings.enabled ?
          this._processElement($el, settings) :
          $el;
      },
      _processElement: function(el, settings) {
        settings = $.extend({}, defaults, settings);

        var self = this;
        el.on(settings.event || settings.defaultEvent, function() {
          self._validate(el, settings);
        });

        return el;
      },
      _validate: function (el, settings) {
        var validator = window.Sturdy.Validator.lookup(settings.type || settings.defaultType);
        try {
          (validator.validate(el.val()) ?
            settings.success :
            settings.fail)();
        } catch(e) {
          settings.error(e);
        }
      }
    });

    $.fn[pluginName] = function (options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  };

  window.Sturdy = window.Sturdy || {};
  window.Sturdy.Validator = new Validator();

})(jQuery, window, document);
;if (Sturdy && Sturdy.Validator) {
  Sturdy.Validator.Base = function (type, validate) {
    this.type = type;
    this.validate = validate;
  };
  Sturdy.Validator.Base.prototype.type = 'base';
  Sturdy.Validator.Base.prototype.validate = function () { throw new Error('\'validat\' method not implemented.')};
} else { throw new Error('Sturdy Error: undefined.'); }
;if (Sturdy && Sturdy.Validator) {
  Sturdy.Validator.add(new Sturdy.Validator.Base(
    'email',
    function(value) {
      return value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    }
  ));
} else { throw new Error('Sturdy Error: Cannot add validator.'); }
