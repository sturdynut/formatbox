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

  var BaseValidator = function (type, validate) {
    this.type = type;
    this.validate = validate;
  };
  BaseValidator.prototype.type = 'base';
  BaseValidator.prototype.validate = function () { };

  window.Sturdy = window.Sturdy || {};
  window.Sturdy.Validator = new Validator();
  window.Sturdy.Validator.Base = BaseValidator;

})(jQuery, window, document);
