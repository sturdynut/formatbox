/*
 *  Sturdy Validator - v0.0.1
 *  A validator that just works.
 *  https://github.com/sturdynut/sturdy-validator
 *
 *  Made by Matti Salokangas
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

  "use strict";

  var pluginName = "validate",
    defaults = {
      enabled: true,
      defaultEvent: 'keyup',
      defaultType: 'email',
      success: function() {},
      fail: function() {},
      error: function() {}
    };

  function Validator(type, validate) {
    this.type = type;
    this.validate = validate;
  }

  $.extend(Validator.prototype, {
    type: null,
    validate: function () {}
  });

  var EmailValidator = new Validator('email', function(value) {
    return value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  });

  function ValidatorFactory () {
    this.factories = [
      EmailValidator
    ];
  }

  $.extend(ValidatorFactory.prototype, {
    lookup: function (type) {
      var index = this.factories.map(function(factory) {
        return factory.type;
      }).indexOf(type);
      return this.factories[index];
    }
  });

  function Plugin (element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._validatorFactory = new ValidatorFactory();
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend(Plugin.prototype, {
    init: function () {
      var $el = $(this.element),
          settings = this.settings;

      return settings.enabled ?
        this.processElement($el, settings) :
        $el;
    },
    processElement: function(el, settings) {
      settings = $.extend({}, defaults, settings);

      var self = this;
      el.on(settings.event || settings.defaultEvent, function() {
        self.validate(el, settings);
      });

      return el;
    },
    validate: function (el, settings) {
      var factory = this._validatorFactory.lookup(settings.type || settings.defaultType);
      try {
        (factory.validate(el.val()) ?
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

})(jQuery, window, document);
