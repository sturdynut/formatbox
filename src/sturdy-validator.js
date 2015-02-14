;(function ($, window, document, undefined) {

  "use strict";

  var pluginName = "validate",
    defaults = {
    enabled: true,
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
        this.processElement($el, settings) :
        $el;
    },
    processElement: function(el, settings) {
      settings = $.extend({}, defaults, settings);

      try {
        (this.validate(el, settings) ?
          settings.success :
          settings.fail)();
      } catch(e) {
        settings.error(e);
      }

      return el;
    },
    validate: function (el, settings) {
      // TODO: Implement this method.
      return true;
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
