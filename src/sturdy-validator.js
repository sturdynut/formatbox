(function ($, window, document, undefined) {

  "use strict";

  var SturdyValidator = function() {};
  SturdyValidator.prototype.validators = [];
  SturdyValidator.prototype.add = function (validator) {
    this.validators.push(validator);
  };
  SturdyValidator.prototype.lookup = function (type) {
    var index = this.validators.map(function(validator) {
      return validator.type;
    }).indexOf(type);
    return this.validators[index];
  };
  SturdyValidator.prototype.init = function (options) {
    var defaults = {
      enabled: true,
      validators: this.validators
    };
    options = $.extend({}, defaults, options);

    this._initPlugIn(options);
  };
  SturdyValidator.prototype._initPlugIn = function (options) {
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
        var validator = window.SturdyValidator.lookup(settings.type || settings.defaultType);
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

  window.SturdyValidator = new SturdyValidator();

})(jQuery, window, document);
