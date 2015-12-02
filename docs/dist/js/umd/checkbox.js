(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.checkbox = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  // Checkbox decorator, to be called after Input
  var Checkbox = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkbox';
    var DATA_KEY = 'mdb.' + NAME;
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
      template: '<span class=\'checkbox-material\'><span class=\'check\'></span></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Checkbox = (function () {
      function Checkbox(element, config) {
        _classCallCheck(this, Checkbox);

        this.element = element;
        this.config = $.extend({}, Default, config);

        this.element.after(this.config.template);
        this.formGroup = _Util['default'].findFormGroup(this.element);

        this._bindEventListeners();
      }

      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */

      _createClass(Checkbox, [{
        key: 'dispose',
        value: function dispose() {
          $.removeData(this.element, DATA_KEY);
          this.element = null;
          this.formGroup = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private
      }, {
        key: '_bindEventListeners',
        value: function _bindEventListeners() {
          var _this = this;

          // checkboxes didn't appear to bubble to the document, so we'll bind these directly
          this.formGroup.find('.checkbox label').hover(function () {
            _Util['default'].addFormGroupFocus(_this.formGroup);
          }, function () {
            _Util['default'].removeFormGroupFocus(_this.formGroup);
          });

          this.element.change(function () {
            _this.element.blur();
          });
        }

        // ------------------------------------------------------------------------
        // static
      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Checkbox(this, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);

      return Checkbox;
    })();

    $.fn[NAME] = Checkbox._jQueryInterface;
    $.fn[NAME].Constructor = Checkbox;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Checkbox._jQueryInterface;
    };

    return Checkbox;
  })(jQuery);

  module.exports = Checkbox;
});