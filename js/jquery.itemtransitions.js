/**
 * Item transition jquery plugin
 *
 * Tutorial: http://wp-dreams.com/item-transition-inspiration-with-jquery/ 
 * Based on  http://tympanus.net/codrops/2014/03/18/inspiration-for-item-transitions/
 * 
 * @author Ernest Marcinko http://wp-dreams.com
 * @url wp-dreams.com
 * @version 1.0  
 */

(function ($) {
  var methods = {

    init: function (options, elem) {
      var $this = this;

      this.elem = elem;
      this.$elem = $(elem);

      $this.o = $.extend({
        componentSel: '.component',
        itemsSel: 'ul.itemwrap li',
        prevClass: 'prev',
        nextClass: 'next',
        animation: 'fxCorner',
        selectName: 'fxselect',
        animationStart: function (event, node, direction) {
          return;
        },
        animationEnd: function (event, node, direction) {
          return;
        }
      }, options);
      $this.n = new Object();
      $this.n.container = $(this.elem);
      $this.current = 0;
      $this.items = $($this.o.itemsSel, $this.n.container);
      $this.current = $($this.o.itemsSel + '.current', $this.n.container);
      $this.component = $($this.o.componentSel, $this.n.container);
      $this.select = $('select[name="' + $this.o.selectName + '"]');
      $this.prevItem = null;
      $this.nextItem = null;

      $this.component.addClass($this.o.animation);

      $this.initEvents();
      //return;       
      return this;
    },

    initEvents: function () {
      var $this = this;

      $this.n.container.on('click swipeleft', "." + $this.o.prevClass, function (e) {
        e.preventDefault();
        $this.prev(e);

      });
      $this.n.container.on('click swiperight', "." + $this.o.nextClass, function (e) {
        e.preventDefault();
        $this.next(e);
      });
    },

    reinitItems: function () {
      var $this = this;

      $this.items = $($this.o.itemsSel, $this.n.container);
      $this.itemsCount = $this.items.length;
      $this.current = $($this.o.itemsSel + '.current', $this.n.container);
    },

    classChanged: function () {
      var $this = this;

      if ($this.select.length < 1) return;
      var newClass = $this.select.find(":selected").val();
      if (newClass != '' && newClass.startsWith('fx')) {
        $this.component.get(0).className =
          $this.component.get(0).className.replace(/\bfx.*?\b/g, '');
        $this.component.addClass(newClass);
      }
    },

    prev: function (e) {
      var $this = this;

      // See if new elements were added or not.
      $this.reinitItems();
      $this.classChanged();

      $this.prevItem = ($this.current.prev().length > 0 ? $this.current.prev() : $($this.items[$this.itemsCount - 1]));

      $this.animationStart(e, 'prev');

      $this.current.addClass('navOutPrev');
      $this.prevItem.addClass('navInPrev');

      $this.current
        .unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd')
        .bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
          $this.current.removeClass('current');
          $this.prevItem.addClass('current');
          $this.items.removeClass('navOutNext navInNext navOutPrev navInPrev');
          $this.animationEnd(e, 'prev');
        });
    },

    next: function (e) {
      var $this = this;

      // See if new elements were added or not.
      $this.reinitItems();
      $this.classChanged();

      $this.nextItem = ($this.current.next().length > 0 ? $this.current.next() : $($this.items[0]));

      $this.animationStart(e, 'next');

      $this.current.addClass('navOutNext');
      $this.nextItem.addClass('navInNext');
      $this.current
        .unbind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd')
        .bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
          $this.current.removeClass('current');
          $this.nextItem.addClass('current');
          $this.items.removeClass('navOutNext navInNext navOutPrev navInPrev');
          $this.animationEnd(e, 'next');
        });
    },

    animationStart: function (event, direction) {
      var $this = this;
      $this.o.animationEnd(event, this, direction);
    },

    animationEnd: function (event, direction) {
      var $this = this;
      $this.o.animationEnd(event, this, direction);
    },

    func: function () {
      var $this = this;

    },

    destroy: function () {
      return this.each(function () {
        var $this = $.extend({}, this, methods);
        $(window).unbind($this);
      })
    }
  }

  // Object.create support test, and fallback for browsers without it
  if (typeof Object.create !== 'function') {
    Object.create = function (o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }


  // Create a plugin based on a defined object
  $.plugin = function (name, object) {
    $.fn[name] = function (options) {
      return this.each(function () {
        if (!$.data(this, name)) {
          $.data(this, name, Object.create(object).init(
            options, this));
        }
      });
    };
  };

  $.plugin('itemtransitions', methods);

  if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
      return this.indexOf(str) == 0;
    };
  }

  function is_touch_device() {
    return !!("ontouchstart" in window) ? 1 : 0;
  }
})(jQuery);
