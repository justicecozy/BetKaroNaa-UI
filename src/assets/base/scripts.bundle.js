/**
 * @class cApp  Custom App class
 */

var cApp = function () {

  return {

    /**
    * Blocks element with loading indiciator using http://malsup.com/jquery/block/
    * @param {object} target jQuery element object
    * @param {object} options
    */
    block: function (target, options) {
      var el = $(target);

      options = $.extend(true, {
        opacity: 0.1,
        overlayColor: '',
        state: '',
        type: 'loader',
        centerX: true,
        centerY: true,
        message: '',
        shadow: true,
        width: 'auto'
      }, options);

      var skin;
      var state;
      var loading;
      skin = options.skin ? 'loader--skin-' + options.skin : '';
      state = options.state ? 'loader--' + options.state : '';
      size = options.size ? 'loader--' + options.size : '';
      loading = '<div class="loader ' + skin + ' ' + state + ' ' + size + '"></div';

      if (options.message && options.message.length > 0) {
        var classes = 'blockui ' + (options.shadow === false ? 'blockui-no-shadow' : '');

        html = '<div class="' + classes + '"><span>' + options.message + '</span><span>' + loading + '</span></div>';
      } else {
        html = loading;
      }

      var params = {
        message: html,
        centerY: options.centerY,
        centerX: options.centerX,
        css: {
          top: '30%',
          left: '50%',
          border: '0',
          padding: '0',
          backgroundColor: 'none',
          width: options.width,
          transform: 'translate(calc(-50% + 0.5px), calc(-50% + 0.5px))',
        },
        overlayCSS: {
          backgroundColor: options.overlayColor,
          opacity: options.opacity,
          cursor: 'wait'
        },
        onUnblock: function () {
          if (el) {
            el.css('position', '');
            el.css('zoom', '');
          }
        }
      };

      if (target == 'body') {
        params.css.top = '50%';
        $.blockUI(params);
      } else {
        var el = $(target);
        el.block(params);
      }
    },

    /**
    * Un-blocks the blocked element
    * @param {object} target jQuery element object
    */
    unblock: function (target) {
      if (target && target != 'body') {
        $(target).unblock();
      } else {
        $.unblockUI();
      }
    },

    /**
    * Blocks the page body element with loading indicator
    * @param {object} options
    */
    blockPage: function (options) {
      return cApp.block('body', options);
    },

    /**
    * Un-blocks the blocked page body element
    */
    unblockPage: function () {
      return cApp.unblock('body');
    }
  };
}();
// jquery extension to add animation class into element
jQuery.fn.extend({
  animateClass: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    jQuery(this).addClass('animated ' + animationName).one(animationEnd, function () {
      jQuery(this).removeClass('animated ' + animationName);
    });

    if (callback) {
      jQuery(this).one(animationEnd, callback);
    }
  },
  animateDelay: function (value) {
    var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
    for (var i = 0; i < vendors.length; i++) {
      jQuery(this).css(vendors[i] + 'animation-delay', value);
    }
  },
  animateDuration: function (value) {
    var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
    for (var i = 0; i < vendors.length; i++) {
      jQuery(this).css(vendors[i] + 'animation-duration', value);
    }
  }
});



var cUtil = function () {
  var resizeHandlers = [];

  /** @type {object} breakpoints The device width breakpoints **/
  var breakpoints = {
    sm: 576, // Small screen / phone
    md: 768, // Medium screen / tablet
    lg: 992, // Large screen / desktop
    xl: 1200 // Extra large screen / wide desktop
  };

  /** @type {object} colors State colors **/
  var colors = {
    brand: '#716aca',
    metal: '#c4c5d6',
    light: '#ffffff',
    accent: '#00c5dc',
    primary: '#5867dd',
    success: '#34bfa3',
    info: '#36a3f7',
    warning: '#ffb822',
    danger: '#f4516c'
  };

  /**
  * Handle window resize event with some
  * delay to attach event handlers upon resize complete
  */
  var _windowResizeHandler = function () {
    var resize;
    var _runResizeHandlers = function () {
      // reinitialize other subscribed elements
      for (var i = 0; i < resizeHandlers.length; i++) {
        var each = resizeHandlers[i];
        each.call();
      }
    };

    jQuery(window).resize(function () {
      if (resize) {
        clearTimeout(resize);
      }
      resize = setTimeout(function () {
        _runResizeHandlers();
      }, 250); // wait 50ms until window resize finishes.
    });
  };

  return {
    /**
    * Class main initializer.
    * @param {object} options.
    * @returns null
    */
    //main function to initiate the theme
    init: function (options) {
      if (options && options.breakpoints) {
        breakpoints = options.breakpoints;
      }

      if (options && options.colors) {
        colors = options.colors;
      }

      _windowResizeHandler();
    },

    /**
    * Adds window resize event handler.
    * @param {function} callback function.
    */
    addResizeHandler: function (callback) {
      resizeHandlers.push(callback);
    },

    /**
    * Trigger window resize handlers.
    */
    runResizeHandlers: function () {
      _runResizeHandlers();
    },

    /**
    * Get GET parameter value from URL.
    * @param {string} paramName Parameter name.
    * @returns {string}
    */
    getURLParam: function (paramName) {
      var searchString = window.location.search.substring(1),
        i, val, params = searchString.split("&");

      for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
          return unescape(val[1]);
        }
      }

      return null;
    },

    /**
    * Checks whether current device is mobile touch.
    * @returns {boolean}
    */
    isMobileDevice: function () {
      return (this.getViewPort().width < this.getBreakpoint('lg') ? true : false);
    },

    /**
    * Checks whether current device is desktop.
    * @returns {boolean}
    */
    isDesktopDevice: function () {
      return cUtil.isMobileDevice() ? false : true;
    },

    /**
    * Gets browser window viewport size. Ref: http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
    * @returns {object}
    */
    getViewPort: function () {
      var e = window,
        a = 'inner';
      if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
      }

      return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
      };
    },

    /**
    * Checks whether given device mode is currently activated.
    * @param {string} mode Responsive mode name(e.g: desktop, desktop-and-tablet, tablet, tablet-and-mobile, mobile)
    * @returns {boolean}
    */
    isInResponsiveRange: function (mode) {
      var breakpoint = this.getViewPort().width;

      if (mode == 'general') {
        return true;
      } else if (mode == 'desktop' && breakpoint >= (this.getBreakpoint('lg') + 1)) {
        return true;
      } else if (mode == 'tablet' && (breakpoint >= (this.getBreakpoint('md') + 1) && breakpoint < this.getBreakpoint('lg'))) {
        return true;
      } else if (mode == 'mobile' && breakpoint <= this.getBreakpoint('md')) {
        return true;
      } else if (mode == 'desktop-and-tablet' && breakpoint >= (this.getBreakpoint('md') + 1)) {
        return true;
      } else if (mode == 'tablet-and-mobile' && breakpoint <= this.getBreakpoint('lg')) {
        return true;
      }

      return false;
    },

    /**
    * Generates unique ID for give prefix.
    * @param {string} prefix Prefix for generated ID
    * @returns {boolean}
    */
    getUniqueID: function (prefix) {
      return prefix + Math.floor(Math.random() * (new Date()).getTime());
    },

    /**
    * Gets window width for give breakpoint mode.
    * @param {string} mode Responsive mode name(e.g: xl, lg, md, sm)
    * @returns {number}
    */
    getBreakpoint: function (mode) {
      if ($.inArray(mode, breakpoints)) {
        return breakpoints[mode];
      }
    },

    /**
    * Checks whether object has property matchs given key path.
    * @param {object} obj Object contains values paired with given key path
    * @param {string} keys Keys path seperated with dots
    * @returns {object}
    */
    isset: function (obj, keys) {
      var stone;

      keys = keys || '';

      if (keys.indexOf('[') !== -1) {
        throw new Error('Unsupported object path notation.');
      }

      keys = keys.split('.');

      do {
        if (obj === undefined) {
          return false;
        }

        stone = keys.shift();

        if (!obj.hasOwnProperty(stone)) {
          return false;
        }

        obj = obj[stone];

      } while (keys.length);

      return true;
    },

    /**
    * Gets highest z-index of the given element parents
    * @param {object} el jQuery element object
    * @returns {number}
    */
    getHighestZindex: function (el) {
      var elem = $(el),
        position, value;

      while (elem.length && elem[0] !== document) {
        // Ignore z-index if position is set to a value where z-index is ignored by the browser
        // This makes behavior of this function consistent across browsers
        // WebKit always returns auto if the element is positioned
        position = elem.css("position");

        if (position === "absolute" || position === "relative" || position === "fixed") {
          // IE returns 0 when zIndex is not specified
          // other browsers return a string
          // we ignore the case of nested elements with an explicit value of 0
          // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt(elem.css("zIndex"), 10);
          if (!isNaN(value) && value !== 0) {
            return value;
          }
        }
        elem = elem.parent();
      }
    },

    /**
    * Checks whether the element has given classes
    * @param {object} el jQuery element object
    * @param {string} Classes string
    * @returns {boolean}
    */
    hasClasses: function (el, classes) {
      var classesArr = classes.split(" ");

      for (var i = 0; i < classesArr.length; i++) {
        if (el.hasClass(classesArr[i]) == false) {
          return false;
        }
      }

      return true;
    },

    /**
    * Gets element actual/real width
    * @param {object} el jQuery element object
    * @returns {number}
    */
    realWidth: function (el) {
      var clone = $(el).clone();
      clone.css("visibility", "hidden");
      clone.css('overflow', 'hidden');
      clone.css("height", "0");
      $('body').append(clone);
      var width = clone.outerWidth();
      clone.remove();

      return width;
    },

    /**
    * Checks whether the element has any parent with fixed position
    * @param {object} el jQuery element object
    * @returns {boolean}
    */
    hasFixedPositionedParent: function (el) {
      var result = false;

      el.parents().each(function () {
        if ($(this).css('position') == 'fixed') {
          result = true;
          return;
        }
      });

      return result;
    },

    /**
    * Simulates delay
    */
    sleep: function (milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
          break;
        }
      }
    },

    /**
    * Gets randomly generated integer value within given min and max range
    * @param {number} min Range start value
    * @param {number} min Range end value
    * @returns {number}
    */
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
    * Gets state color's hex code by color name
    * @param {string} name Color name
    * @returns {string}
    */
    getColor: function (name) {
      return colors[name];
    },

    /**
    * Checks whether Angular library is included
    * @returns {boolean}
    */
    isAngularVersion: function () {
      return window.Zone !== undefined ? true : false;
    }
  }
}();

//== Initialize cUtil class on document ready
$(document).ready(function () {
  cUtil.init();
});




(function ($) {

  if (typeof cUtil === 'undefined') throw new Error(
    'cUtil is required and must be included before cDatatable.');

  // plugin setup
  $.fn.cDatatable = function (options) {
    if ($(this).hasClass('c-datatable--loaded')) return;
    if ($(this).length === 0) throw new Error('No cDatatable element exist.');
    if ($(this).attr('id') === '') throw new Error('ID is required.');

    // global variables
    var datatable = this;

    // debug enabled?
    // 1) state will be cleared on each refresh
    // 2) enable some logs
    // 3) etc.
    datatable.debug = false;

    /********************
     ** PRIVATE METHODS
     ********************/
    var dt = {
      offset: 110,
      stateId: 'm-meta',

      init: function (options) {
        dt.setupBaseDOM.call();
        dt.setupDOM(datatable.table);
        // set custom query from options
        API.setDataSourceQuery(API.getOption('data.source.read.params.query'));

        // on event after layout had done setup, show datatable
        $(datatable).on('c-datatable--on-layout-updated', dt.afterRender);

        if (datatable.debug) dt.stateRemove(dt.stateId);

        // get data
        if (options.data.type === 'remote' || options.data.type === 'local') {
          if (options.data.saveState === false
            || options.data.saveState.cookie === false
            && options.data.saveState.webstorage === false) {
            dt.stateRemove(dt.stateId);
          }
          // get data for local
          if (options.data.type === 'local' &&
            typeof options.data.source === 'object') {
            if (options.data.source === null) {
              // this is html table
              dt.extractTable();
            }
            datatable.dataSet = datatable.originalDataSet
              = dt.dataMapCallback(options.data.source);
          }
          dt.dataRender();
        }

        dt.setHeadTitle.call();
        dt.setHeadTitle.call(this, datatable.tableFoot);

        // for normal table, setup layout right away
        if (options.data.type === null) {
          dt.setupCellField.call();
          dt.setupTemplateCell.call();
          // setup extra system column properties
          dt.setupSystemColumn.call();
        }

        // hide header
        if (typeof options.layout.header !== 'undefined' &&
          options.layout.header === false) {
          $(datatable.table).find('thead').remove();
        }

        // hide footer
        if (typeof options.layout.footer !== 'undefined' &&
          options.layout.footer === false) {
          $(datatable.table).find('tfoot').remove();
        }

        // for normal, run layoutUpdate
        if (options.data.type === null ||
          options.data.type === 'local') dt.layoutUpdate();

        $(window).resize(dt.fullRender);

        // main menu collapse, redraw datatable when document size changed
        // new ResizeSensor(datatable, function () {
        // 	API.redraw();
        // });

        $(datatable).height('');

        $(API.getOption('search.input')).on('keyup', function (e) {
          API.search($(this).val().toLowerCase());
        });

        return datatable;
      },

      /**
       * Extract static HTML table content into datasource
       */
      extractTable: function () {
        var columns = [];
        var headers = $(datatable).
          find('tr:first-child th').
          get().
          map(function (cell, i) {
            var field = $(cell).data('field');
            if (typeof field === 'undefined') {
              field = $(cell).text();
            }
            var column = { field: field, title: field };
            for (var ii in options.columns) {
              if (options.columns[ii].field === field) {
                column = $.extend(true, {}, options.columns[ii], column);
              }
            }
            columns.push(column);
            return field;
          });
        // auto create columns config
        options.columns = columns;

        var data = $(datatable).find('tr').get().map(function (row) {
          return $(row).find('td').get().map(function (cell, i) {
            return $(cell).html();
          });
        });
        var source = [];
        $.each(data, function (i, row) {
          if (row.length === 0) return;
          var td = {};
          $.each(row, function (index, value) {
            td[headers[index]] = value;
          });
          source.push(td);
        });
        options.data.source = source;
      },

      /**
       * This method will run each time window resize
       */
      layoutUpdate: function () {
        // setup nested datatable, if option enabled
        dt.setupSubDatatable.call();

        // setup extra system column properties
        dt.setupSystemColumn.call();

        dt.columnHide.call();

        dt.sorting.call();

        // setup cell hover event
        dt.setupHover.call();

        if (typeof options.detail === 'undefined'
          // temporary disable lock column in subtable
          && dt.getDepth() === 1) {
          // lock columns handler
          dt.lockTable.call();
        }

        $(datatable).
          trigger('c-datatable--on-layout-updated',
            { table: $(datatable.table).attr('id') });
      },

      lockTable: function () {
        // todo; revise lock table responsive
        var lock = {
          lockEnabled: false,
          init: function () {
            // check if table should be locked columns
            lock.lockEnabled = $.grep(options.columns, function (n, i) {
              return typeof n.locked !== 'undefined' && n.locked !== false;
            });
            if (lock.lockEnabled.length === 0) return;

            if (!dt.isLocked()) {
              // for disable lock table
              datatable.oriTable = $(datatable.table).clone();
            }

            lock.enable();
          },
          enable: function () {
            var enableLock = function (tablePart) {
              var lockEnabled = lock.lockEnabledColumns();
              if (lockEnabled.left.length === 0 &&
                lockEnabled.right.length === 0) {
                return;
              }

              // check if already has lock column
              if ($(tablePart).find('.c-datatable__lock').length > 0) {
                dt.log('Locked container already exist in: ', tablePart);
                return;
              }
              // check if no rows exists
              if ($(tablePart).find('.c-datatable__row').length === 0) {
                dt.log('No row exist in: ', tablePart);
                return;
              }

              // locked div container
              var lockLeft = $('<div/>').
                addClass('c-datatable__lock c-datatable__lock--left');
              var lockScroll = $('<div/>').
                addClass('c-datatable__lock c-datatable__lock--scroll');
              var lockRight = $('<div/>').
                addClass('c-datatable__lock c-datatable__lock--right');

              $(tablePart).find('.c-datatable__row').each(function () {
                var rowLeft = $('<tr/>').
                  addClass('c-datatable__row').
                  appendTo(lockLeft);
                var rowScroll = $('<tr/>').
                  addClass('c-datatable__row').
                  appendTo(lockScroll);
                var rowRight = $('<tr/>').
                  addClass('c-datatable__row').
                  appendTo(lockRight);
                $(this).find('.c-datatable__cell').each(function () {
                  var locked = $(this).data('locked');
                  if (typeof locked !== 'undefined') {
                    if (typeof locked.left !== 'undefined' || locked === true) {
                      // default locked to left
                      $(this).appendTo(rowLeft);
                    }
                    if (typeof locked.right !== 'undefined') {
                      $(this).appendTo(rowRight);
                    }
                  } else {
                    $(this).appendTo(rowScroll);
                  }
                });
                // remove old row
                $(this).remove();
              });

              if (lockEnabled.left.length > 0) {
                $(datatable.wrap).addClass('c-datatable--lock');
                $(lockLeft).appendTo(tablePart);
              }
              if (lockEnabled.left.length > 0 || lockEnabled.right.length > 0) {
                $(lockScroll).appendTo(tablePart);
              }
              if (lockEnabled.right.length > 0) {
                $(datatable.wrap).addClass('c-datatable--lock');
                $(lockRight).appendTo(tablePart);
              }
            };

            $(datatable.table).find('thead,tbody,tfoot').each(function () {
              var tablePart = this;
              if ($(this).find('.c-datatable__lock').length === 0) {
                $(this).ready(function () {
                  enableLock(tablePart);
                });
              }
            });
          },
          /**
           * Check if columns have locked enabled
           * @returns {{left: Array, right: Array}}
           */
          lockEnabledColumns: function () {
            var screen = $(window).width();
            var columns = options.columns;
            var enabled = { left: [], right: [] };
            $.each(columns, function (i, column) {
              if (typeof column.locked !== 'undefined') {
                if (typeof column.locked.left !== 'undefined') {
                  if (cUtil.getBreakpoint(column.locked.left) <= screen) {
                    enabled['left'].push(column.locked.left);
                  }
                }
                if (typeof column.locked.right !== 'undefined') {
                  if (cUtil.getBreakpoint(column.locked.right) <= screen) {
                    enabled['right'].push(column.locked.right);
                  }
                }
              }
            });
            return enabled;
          },
        };
        lock.init();
        return lock;
      },

      /**
       * Render everything for resize
       */
      fullRender: function () {
        dt.spinnerCallback(true);
        $(datatable.wrap).removeClass('c-datatable--loaded');
        if (dt.isLocked()) {
          var content = $(datatable.oriTable).children();
          if (content.length > 0) {
            $(datatable.wrap).removeClass('c-datatable--lock');
            $(datatable.table).empty().html(content);
            datatable.oriTable = null;
            dt.setupCellField.call();
            API.redraw();
          }
          dt.updateTableComponents.call();
        }
        dt.insertData();
      },

      /**
       * After render event, called by c-datatable--on-layout-updated
       * @param e
       * @param args
       */
      afterRender: function (e, args) {
        if (args.table === $(datatable.table).attr('id')) {
          if (!dt.isLocked()) API.redraw();
          $(datatable).ready(function () {
            // row even class
            $(datatable.tableBody).
              find('.c-datatable__row:even').
              addClass('c-datatable__row--even');
            if (dt.isLocked()) API.redraw();
            $(datatable.tableBody).css('visibility', '');
            $(datatable.wrap).addClass('c-datatable--loaded');
            dt.scrollbar.call();
            dt.spinnerCallback(false);
          });
        }
      },

      setupHover: function () {
        $(datatable.tableBody).
          find('.c-datatable__cell').
          off('mouseenter', 'mouseleave').
          on('mouseenter', function () {
            // normal table
            var row = $(this).
              closest('.c-datatable__row').
              addClass('c-datatable__row--hover');
            var index = $(row).index() + 1;

            // lock table
            $(row).
              closest('.c-datatable__lock').
              parent().
              find('.c-datatable__row:nth-child(' + index + ')').
              addClass('c-datatable__row--hover');
          }).
          on('mouseleave', function () {
            // normal table
            var row = $(this).
              closest('.c-datatable__row').
              removeClass('c-datatable__row--hover');
            var index = $(row).index() + 1;

            // look table
            $(row).
              closest('.c-datatable__lock').
              parent().
              find('.c-datatable__row:nth-child(' + index + ')').
              removeClass('c-datatable__row--hover');
          });
      },

      /**
       * Adjust width of locked table containers by resize handler
       * @returns {number}
       */
      adjustLockContainer: function () {
        if (!dt.isLocked()) return 0;

        // refer to head dimension
        var containerWidth = $(datatable.tableHead).width();
        var lockLeft = $(datatable.tableHead).
          find('.c-datatable__lock--left').
          width();
        var lockRight = $(datatable.tableHead).
          find('.c-datatable__lock--right').
          width();

        if (typeof lockLeft === 'undefined') lockLeft = 0;
        if (typeof lockRight === 'undefined') lockRight = 0;

        var lockScroll = Math.floor(containerWidth - lockLeft - lockRight);
        $(datatable.table).
          find('.c-datatable__lock--scroll').
          css('width', lockScroll);

        return lockScroll;
      },

      /**
       * todo; not in use
       */
      dragResize: function () {
        var pressed = false;
        var start = undefined;
        var startX, startWidth;
        $(datatable.tableHead).
          find('.c-datatable__cell').
          mousedown(function (e) {
            start = $(this);
            pressed = true;
            startX = e.pageX;
            startWidth = $(this).width();
            $(start).addClass('c-datatable__cell--resizing');

          }).
          mousemove(function (e) {
            if (pressed) {
              var i = $(start).index();
              var tableBody = $(datatable.tableBody);
              var ifLocked = $(start).closest('.c-datatable__lock');

              if (ifLocked) {
                var lockedIndex = $(ifLocked).index();
                tableBody = $(datatable.tableBody).
                  find('.c-datatable__lock').
                  eq(lockedIndex);
              }

              $(tableBody).find('.c-datatable__row').each(function (tri, tr) {
                $(tr).
                  find('.c-datatable__cell').
                  eq(i).
                  width(startWidth + (e.pageX - startX)).
                  children().
                  width(startWidth + (e.pageX - startX));
              });

              $(start).children().width(startWidth + (e.pageX - startX));
            }

          }).
          mouseup(function () {
            $(start).removeClass('c-datatable__cell--resizing');
            pressed = false;
          });

        $(document).mouseup(function () {
          $(start).removeClass('c-datatable__cell--resizing');
          pressed = false;
        });
      },

      /**
       * To prepare placeholder for table before content is loading
       */
      initHeight: function () {
        if (options.layout.height && options.layout.scroll) {
          var theadHeight = $(datatable.tableHead).
            find('.c-datatable__row').
            height();
          var tfootHeight = $(datatable.tableFoot).
            find('.c-datatable__row').
            height();
          var bodyHeight = options.layout.height;
          if (typeof theadHeight !== 'undefined') bodyHeight -= theadHeight;
          if (typeof tfootHeight !== 'undefined') bodyHeight -= tfootHeight;
          $(datatable.tableBody).css('max-height', bodyHeight);
        }
      },

      /**
       * Setup base DOM (table, thead, tbody, tfoot) and create if not exist.
       */
      setupBaseDOM: function () {
        // keep original state before cDatatable initialize
        datatable.old = $(datatable).clone();

        // if (API.getOption('layout.height')) $(datatable.wrap).height(API.getOption('layout.height'));

        // main element
        if ($(datatable).prop('tagName') === 'TABLE') {
          // if main init element is <table>, wrap with div
          datatable.table = $(datatable).
            removeClass('c-datatable').
            addClass('c-datatable__table');
          if ($(datatable.table).parents('.c-datatable').length === 0) {
            datatable.table.wrap($('<div/>').
              addClass('c-datatable').
              addClass('c-datatable--' + options.layout.theme));
            datatable.wrap = $(datatable.table).parent();
          }
        } else {
          // create table
          datatable.wrap = $(datatable).
            addClass('c-datatable').
            addClass('c-datatable--' + options.layout.theme);
          datatable.table = $('<table/>').
            addClass('c-datatable__table').
            appendTo(datatable);
        }

        if (typeof options.layout.class !== 'undefined') {
          $(datatable.wrap).addClass(options.layout.class);
        }

        $(datatable.table).
          removeClass('c-datatable--destroyed').
          css('display', 'block').
          attr('id', cUtil.getUniqueID('c-datatable--'));

        // predefine table height
        if (API.getOption('layout.height')) $(datatable.table).
          css('max-height', API.getOption('layout.height'));

        // for normal table load
        if (options.data.type === null) {
          $(datatable.table).css('width', '').css('display', '');
        }

        // create table head element
        datatable.tableHead = $(datatable.table).find('thead');
        if ($(datatable.tableHead).length === 0) {
          datatable.tableHead = $('<thead/>').prependTo(datatable.table);
        }

        // create table head element
        datatable.tableBody = $(datatable.table).find('tbody');
        if ($(datatable.tableBody).length === 0) {
          datatable.tableBody = $('<tbody/>').appendTo(datatable.table);
        }

        if (typeof options.layout.footer !== 'undefined' &&
          options.layout.footer) {
          // create table foot element
          datatable.tableFoot = $(datatable.table).find('tfoot');
          if ($(datatable.tableFoot).length === 0) {
            datatable.tableFoot = $('<tfoot/>').appendTo(datatable.table);
          }
        }
      },

      /**
       * Set column data before table manipulation.
       */
      setupCellField: function (tableParts) {
        if (typeof tableParts === 'undefined') tableParts = $(datatable.table).
          children();
        var columns = options.columns;
        $.each(tableParts, function (part, tablePart) {
          $(tablePart).find('.c-datatable__row').each(function (tri, tr) {
            // prepare data
            $(tr).find('.c-datatable__cell').each(function (tdi, td) {
              if (typeof columns[tdi] !== 'undefined') {
                $(td).data(columns[tdi]);
              }
            });
          });
        });
      },

      /**
       * Set column template callback
       * @param tablePart
       */
      setupTemplateCell: function (tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        var columns = options.columns;
        $(tablePart).find('.c-datatable__row').each(function (tri, tr) {
          // row data object, if any
          var obj = $(tr).data('obj') || {};

          // row callback
          var rowCallback = API.getOption('rows.callback');
          if (typeof rowCallback === 'function') {
            rowCallback(tr, obj, tri);
          }

          obj['getIndex'] = function () {
            return tri;
          };
          obj['getDatatable'] = function () {
            return datatable;
          };

          // if data object is undefined, collect from table
          if (typeof obj === 'undefined') {
            obj = {};
            $(tr).find('.c-datatable__cell').each(function (tdi, td) {
              // get column settings by field
              var column = $.grep(columns, function (n, i) {
                return $(td).data('field') === n.field;
              })[0];
              if (typeof column !== 'undefined') {
                obj[column['field']] = $(td).text();
              }
            });
          }

          $(tr).find('.c-datatable__cell').each(function (tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function (n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              // column template
              if (typeof column.template !== 'undefined') {
                var finalValue = '';
                // template string
                if (typeof column.template === 'string') {
                  finalValue = dt.dataPlaceholder(column.template, obj);
                }
                // template callback function
                if (typeof column.template === 'function') {
                  finalValue = column.template(obj);
                }
                var span = $('<span/>').append(finalValue);
                // insert to cell, wrap with span
                $(td).html(span);

                // set span overflow
                if (typeof column.overflow !== 'undefined') {
                  $(span).css('overflow', column.overflow);
                }
              }
            }
          });
        });
      },

      /**
       * Setup extra system column properties
       * Note: selector checkbox, subtable toggle
       */
      setupSystemColumn: function () {
        datatable.dataSet = datatable.dataSet || [];
        // no records available
        if (datatable.dataSet.length === 0) return;

        var columns = options.columns;
        $(datatable.tableBody).
          find('.c-datatable__row').
          each(function (tri, tr) {
            $(tr).find('.c-datatable__cell').each(function (tdi, td) {
              // get column settings by field
              var column = $.grep(columns, function (n, i) {
                return $(td).data('field') === n.field;
              })[0];
              if (typeof column !== 'undefined') {
                var value = $(td).text();

                // enable column selector
                if (typeof column.selector !== 'undefined' &&
                  column.selector !== false) {
                  // check if checkbox exist
                  if ($(td).find('.c-checkbox [type="checkbox"]').length >
                    0) return;
                  $(td).addClass('c-datatable__cell--check');
                  // append checkbox
                  var chk = $('<label/>').
                    addClass('c-checkbox c-checkbox--single').
                    append($('<input/>').
                      attr('type', 'checkbox').
                      attr('value', value).
                      on('click', function () {
                        if ($(this).is(':checked')) {
                          // add checkbox active row class
                          API.setActive(this);
                        } else {
                          // add checkbox active row class
                          API.setInactive(this);
                        }
                      })).
                    append($('<span/>'));

                  // checkbox selector has outline style
                  if (typeof column.selector.class !== 'undefined') {
                    $(chk).addClass(column.selector.class);
                  }

                  $(td).children().html(chk);
                }

                // enable column subtable toggle
                if (typeof column.subtable !== 'undefined' &&
                  column.subtable) {
                  // check if subtable toggle exist
                  if ($(td).find('.c-datatable__toggle-subtable').length >
                    0) return;
                  // append subtable toggle
                  $(td).
                    children().
                    html($('<a/>').
                      addClass('c-datatable__toggle-subtable').
                      attr('href', '#').
                      attr('data-value', value).
                      append($('<i/>').
                        addClass(API.getOption(
                          'layout.icons.rowDetail.collapse'))));
                }
              }
            });
          });

        // init checkbox for header/footer
        var initCheckbox = function (tr) {
          // get column settings by field
          var column = $.grep(columns, function (n, i) {
            return typeof n.selector !== 'undefined' && n.selector !== false;
          })[0];

          if (typeof column !== 'undefined') {
            // enable column selector
            if (typeof column.selector !== 'undefined' &&
              column.selector !== false) {
              var td = $(tr).find('[data-field="' + column.field + '"]');
              // check if checkbox exist
              if ($(td).find('.c-checkbox [type="checkbox"]').length >
                0) return;
              $(td).addClass('c-datatable__cell--check');

              // todo; check all, for server pagination
              // append checkbox
              var chk = $('<label/>').
                addClass('c-checkbox c-checkbox--single c-checkbox--all').
                append($('<input/>').
                  attr('type', 'checkbox').
                  on('click', function () {
                    if ($(this).is(':checked')) {
                      API.setActiveAll(true);
                    } else {
                      API.setActiveAll(false);
                    }
                  })).
                append($('<span/>'));

              // checkbox selector has outline style
              if (typeof column.selector.class !== 'undefined') {
                $(chk).addClass(column.selector.class);
              }

              $(td).children().html(chk);
            }
          }
        };

        if (typeof options.layout.header !== 'undefined' &&
          options.layout.header === true) {
          initCheckbox(
            $(datatable.tableHead).find('.c-datatable__row').first());
        }
        if (typeof options.layout.footer !== 'undefined' &&
          options.layout.footer === true) {
          initCheckbox(
            $(datatable.tableFoot).find('.c-datatable__row').first());
        }
      },

      /**
       * Adjust width to match container size
       */
      adjustCellsWidth: function () {
        // get table width
        var containerWidth = $(datatable.tableHead).width();

        // offset reserved for sort icon
        var sortOffset = 20;

        // get total number of columns
        var columns = dt.getOneRow(datatable.tableHead, 1).length;
        if (columns > 0) {
          //  remove reserved sort icon width
          containerWidth = containerWidth - (sortOffset * columns);
          var minWidth = Math.floor(containerWidth / columns);

          // minimum width
          if (minWidth <= dt.offset) {
            minWidth = dt.offset;
          }

          $(datatable.table).
            find('.c-datatable__row').
            find('.c-datatable__cell').
            each(function (tdi, td) {
              var width = minWidth;
              var dataWidth = $(td).data('width');
              if (typeof dataWidth !== 'undefined') {
                width = dataWidth;
              }
              $(td).children().css('width', width);
            });
        }
      },

      /**
       * Adjust height to match container size
       */
      adjustCellsHeight: function () {
        $(datatable.table).find('.c-datatable__row');
        $.each($(datatable.table).children(), function (part, tablePart) {
          for (var i = 1; i <= dt.getTotalRows(tablePart); i++) {
            var rows = dt.getOneRow(tablePart, i, false);
            if ($(rows).length > 0) {
              var maxHeight = Math.max.apply(null, $(rows).map(function () {
                return $(this).height();
              }).get());
              $(rows).css('height', Math.ceil(maxHeight));
            }
          }
        });
      },

      /**
       * Setup table DOM and classes
       */
      setupDOM: function (table) {
        // set table classes
        $(table).find('> thead').addClass('c-datatable__head');
        $(table).find('> tbody').addClass('c-datatable__body');
        $(table).find('> tfoot').addClass('c-datatable__foot');
        $(table).find('tr').addClass('c-datatable__row');
        $(table).find('tr > th, tr > td').addClass('c-datatable__cell');
        $(table).find('tr > th, tr > td').each(function (i, td) {
          if ($(td).find('span').length === 0) {
            $(td).wrapInner($('<span/>').width(dt.offset));
          }
        });
      },

      /**
       * Default scrollbar
       * @returns {{tableLocked: null, init: init, onScrolling: onScrolling}}
       */
      scrollbar: function () {
        var scroll = {
          tableLocked: null,
          mcsOptions: {
            scrollInertia: 0,
            autoDraggerLength: true,
            autoHideScrollbar: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            mouseWheel: {
              scrollAmount: 120,
              preventDefault: false,
            },
            advanced: {
              updateOnContentResize: true,
              autoExpandHorizontalScroll: true,
            },
            theme: 'minimal-dark',
          },
          init: function () {
            var screen = cUtil.getViewPort().width;
            // setup scrollable datatable
            if (options.layout.scroll) {
              // add scrollable datatable class
              $(datatable.wrap).addClass('c-datatable--scroll');

              var scrollable = $(datatable.tableBody).
                find('.c-datatable__lock--scroll');
              if ($(scrollable).length > 0) {
                scroll.scrollHead = $(datatable.tableHead).
                  find('> .c-datatable__lock--scroll > .c-datatable__row');
                scroll.scrollFoot = $(datatable.tableFoot).
                  find('> .c-datatable__lock--scroll > .c-datatable__row');
                scroll.tableLocked = $(datatable.tableBody).
                  find('.c-datatable__lock:not(.c-datatable__lock--scroll)');
                if (screen > cUtil.getBreakpoint('lg')) {
                  scroll.mCustomScrollbar(scrollable);
                } else {
                  scroll.defaultScrollbar(scrollable);
                }
              } else {
                scroll.scrollHead = $(datatable.tableHead).
                  find('> .c-datatable__row');
                scroll.scrollFoot = $(datatable.tableFoot).
                  find('> .c-datatable__row');
                if (screen > cUtil.getBreakpoint('lg')) {
                  scroll.mCustomScrollbar(datatable.tableBody);
                } else {
                  scroll.defaultScrollbar(datatable.tableBody);
                }
              }
            } else {
              $(datatable.table).
                css('height', 'auto').
                css('overflow-x', 'auto');
            }
          },
          defaultScrollbar: function (scrollable) {
            $(scrollable).
              css('overflow', 'auto').
              css('max-height', API.getOption('layout.height')).
              on('scroll', scroll.onScrolling);
          },
          onScrolling: function (e) {
            var left = $(this).scrollLeft();
            var top = $(this).scrollTop();
            $(scroll.scrollHead).css('left', -left);
            $(scroll.scrollFoot).css('left', -left);
            $(scroll.tableLocked).each(function (i, table) {
              $(table).css('top', -top);
            });
          },
          mCustomScrollbar: function (scrollable) {
            var height = API.getOption('layout.height');
            // vertical and horizontal scrollbar
            var axis = 'xy';
            if (height === null) {
              // horizontal scrollbar
              axis = 'x';
            }
            var mcsOptions = $.extend({}, scroll.mcsOptions, {
              axis: axis,
              setHeight: $(datatable.tableBody).height(),
              callbacks: {
                whileScrolling: function () {
                  var mcs = this.mcs;
                  $(scroll.scrollHead).css('left', mcs.left);
                  $(scroll.scrollFoot).css('left', mcs.left);
                  $(scroll.tableLocked).each(function (i, table) {
                    $(table).css('top', mcs.top);
                  });
                },
              },
            });

            if (API.getOption('layout.smoothScroll.scrollbarShown') === true) {
              $(scrollable).attr('data-scrollbar-shown', 'true');
            }

            // create a new instance for table body with scrollbar
            dt.mCustomScrollbar(scrollable, mcsOptions);
            $(scrollable).mCustomScrollbar('scrollTo', 'top');
          },
        };
        scroll.init();
        return scroll;
      },

      /**
       * Init custom scrollbar and reset position
       * @param element
       * @param options
       */
      mCustomScrollbar: function (element, options) {
        $(datatable.tableBody).css('overflow', '');
        // check if any custom scrollbar exist in the element
        if ($(element).find('.mCustomScrollbar').length === 0) {
          if ($(datatable.tableBody).hasClass('mCustomScrollbar')) {
            $(datatable.tableBody).mCustomScrollbar('destroy');
          }
          $(element).mCustomScrollbar(options);
        }
      },

      /**
       * Set column title from options.columns settings
       */
      setHeadTitle: function (tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableHead;
        var columns = options.columns;
        var row = $(tablePart).find('.c-datatable__row');
        var ths = $(tablePart).find('.c-datatable__cell');
        if ($(row).length === 0) {
          row = $('<tr/>').appendTo(tablePart);
        }
        $.each(columns, function (i, column) {
          var th = $(ths).eq(i);
          if ($(th).length === 0) {
            th = $('<th/>').appendTo(row);
          }
          // set column title
          if (typeof column['title'] !== 'undefined') {
            $(th).
              html(column['title']).
              attr('data-field', column.field).
              data(column);
          }
          // apply text align to thead/tfoot
          if (typeof column.textAlign !== 'undefined') {
            var align = typeof datatable.textAlign[column.textAlign] !==
              'undefined' ? datatable.textAlign[column.textAlign] : '';
            $(th).addClass(align);
          }
        });
        dt.setupDOM(tablePart);
      },

      /**
       * Initiate to get remote or local data via ajax
       */
      dataRender: function (action) {
        $(datatable.table).
          siblings('.c-datatable__pager').
          removeClass('c-datatable--paging-loaded');

        var buildMeta = function () {
          datatable.dataSet = datatable.dataSet || [];
          dt.localDataUpdate();
          // local pagination meta
          var meta = API.getDataSourceParam('pagination');
          if (meta.perpage === 0) {
            meta.perpage = options.data.pageSize || 10;
          }
          meta.total = datatable.dataSet.length;
          var start = Math.max(meta.perpage * (meta.page - 1), 0);
          var end = Math.min(start + meta.perpage, meta.total);
          datatable.dataSet = $(datatable.dataSet).slice(start, end);
          return meta;
        };

        var afterGetData = function (result) {
          $(datatable.wrap).removeClass('c-datatable--error');
          // pagination enabled
          if (options.pagination) {
            if (options.data.serverPaging && options.data.type !== 'local') {
              // server pagination
              dt.paging(dt.getObject('meta', result || null));
            } else {
              // local pagination can be used by remote data also
              dt.paging(buildMeta(), function (ctx, meta) {
                if (!$(ctx.pager).hasClass('c-datatable--paging-loaded')) {
                  $(ctx.pager).remove();
                  ctx.init(meta);
                }
                $(ctx.pager).off().on('c-datatable--on-goto-page', function (e) {
                  $(ctx.pager).remove();
                  ctx.init(meta);
                });

                var start = Math.max(meta.perpage * (meta.page - 1), 0);
                var end = Math.min(start + meta.perpage, meta.total);

                dt.localDataUpdate();
                datatable.dataSet = $(datatable.dataSet).slice(start, end);

                // insert data into table content
                dt.insertData();
              });
            }
          } else {
            dt.localDataUpdate();
          }
          // insert data into table content
          dt.insertData();
        };

        // get local datasource
        if (options.data.type === 'local'
          // for remote json datasource
          || typeof options.data.source.read === 'undefined' &&
          datatable.dataSet !== null
          // for remote datasource, server sorting is disabled and data already received from remote
          || options.data.serverSorting === false && action === 'sort'
        ) {
          afterGetData();
          return;
        }

        // getting data from remote only
        dt.getData().done(afterGetData);
      },

      /**
       * Process ajax data
       */
      insertData: function () {
        datatable.dataSet = datatable.dataSet || [];
        var params = API.getDataSourceParam();

        // todo; fix performance
        var tableBody = $('<tbody/>').
          addClass('c-datatable__body').
          css('visibility', 'hidden');
        $.each(datatable.dataSet, function (i, row) {
          // keep data object to row
          var tr = $('<tr/>').attr('data-row', i).data('obj', row);
          var idx = 0;
          var tdArr = [];
          var colLength = options.columns.length;
          for (var a = 0; a < colLength; a += 1) {
            var column = options.columns[a];
            var classes = [];
            // add sorted class to cells
            if (params.sort.field === column.field) {
              classes.push('c-datatable__cell--sorted');
            }

            // apply text align
            if (typeof column.textAlign !== 'undefined') {
              var align = typeof datatable.textAlign[column.textAlign] !==
                'undefined' ? datatable.textAlign[column.textAlign] : '';
              classes.push(align);
            }

            tdArr[idx++] = '<td data-field="' + column.field + '"';
            tdArr[idx++] = ' class="' + classes.join(' ') + '"';
            tdArr[idx++] = '>';
            tdArr[idx++] = row[column.field];
            tdArr[idx++] = '</td>';
          }
          $(tr).append(tdArr.join(''));
          $(tableBody).append(tr);
        });

        // display no records message
        if (datatable.dataSet.length === 0) {
          $('<span/>').
            addClass('c-datatable--error').
            width('100%').
            html(API.getOption('translate.records.noRecords')).
            appendTo(tableBody);
          $(datatable.wrap).addClass('c-datatable--error');
        }

        // replace existing table body
        $(datatable.tableBody).replaceWith(tableBody);
        datatable.tableBody = tableBody;

        // layout update
        dt.setupDOM(datatable.table);
        dt.setupCellField([datatable.tableBody]);
        dt.setupTemplateCell(datatable.tableBody);
        dt.layoutUpdate();
      },

      updateTableComponents: function () {
        datatable.tableHead = $(datatable.table).children('thead');
        datatable.tableBody = $(datatable.table).children('tbody');
        datatable.tableFoot = $(datatable.table).children('tfoot');
      },

      /**
       * Call ajax for raw JSON data
       */
      getData: function () {
        var params = {
          dataType: 'json',
          method: 'GET',
          data: {},
          timeout: 30000,
        };

        if (options.data.type === 'local') {
          params.url = options.data.source;
        }

        if (options.data.type === 'remote') {
          params.url = API.getOption('data.source.read.url');
          if (typeof params.url !== 'string') params.url = API.getOption(
            'data.source.read');
          if (typeof params.url !== 'string') params.url = API.getOption(
            'data.source');
          params.headers = API.getOption('data.source.read.headers');
          params.data['datatable'] = API.getDataSourceParam();
          params.method = API.getOption('data.source.read.method') || 'POST';
          // remove if server params is not enabled
          if (!API.getOption('data.serverPaging')) {
            delete params.data['datatable']['pagination'];
          }
          if (!API.getOption('data.serverSorting')) {
            delete params.data['datatable']['sort'];
          }
        }

        return $.ajax(params).done(function (data, textStatus, jqXHR) {
          // extendible data map callback for custom datasource
          datatable.dataSet = datatable.originalDataSet
            = dt.dataMapCallback(data);
          $(datatable).
            trigger('c-datatable--on-ajax-done', [datatable.dataSet]);
        }).fail(function (jqXHR, textStatus, errorThrown) {
          $(datatable).trigger('c-datatable--on-ajax-fail', [jqXHR]);
          $('<span/>').
            addClass('c-datatable--error').
            width('100%').
            html(API.getOption('translate.records.noRecords')).
            appendTo(datatable.tableBody);
          $(datatable).addClass('c-datatable--error');
        }).always(function () {
        });
      },

      /**
       * Pagination object
       * @param meta if null, local pagination, otherwise remote pagination
       * @param callback for update data when navigating page
       */
      paging: function (meta, callback) {
        var pg = {
          meta: null,
          pager: null,
          paginateEvent: null,
          pagerLayout: { pagination: null, info: null },
          callback: null,
          init: function (meta) {
            pg.meta = meta;

            // always recount total pages
            pg.meta.pages = Math.max(Math.ceil(pg.meta.total / pg.meta.perpage),
              1);

            // current page must be not over than total pages
            if (pg.meta.page > pg.meta.pages) pg.meta.page = pg.meta.pages;

            // set unique event name between tables
            pg.paginateEvent = dt.getTablePrefix();

            pg.pager = $(datatable.table).siblings('.c-datatable__pager');
            if ($(pg.pager).hasClass('c-datatable--paging-loaded')) return;

            // if class .c-datatable--paging-loaded not exist, recreate pagination
            $(pg.pager).remove();

            // if no pages available
            if (pg.meta.pages === 0) return;

            // update datasource params
            API.setDataSourceParam('pagination', pg.meta);

            // default callback function, contains remote pagination handler
            pg.callback = pg.serverCallback;
            // custom callback function
            if (typeof callback === 'function') pg.callback = callback;

            pg.addPaginateEvent();
            pg.populate();

            pg.meta.page = Math.max(pg.meta.page || 1, pg.meta.page);

            $(datatable).trigger(pg.paginateEvent, pg.meta);

            pg.pagingBreakpoint.call();
            $(window).resize(pg.pagingBreakpoint);
          },
          serverCallback: function (ctx, meta) {
            dt.dataRender();
          },
          populate: function () {
            var icons = API.getOption('layout.icons.pagination');
            var title = API.getOption(
              'translate.toolbar.pagination.items.default');
            // pager root element
            pg.pager = $('<div/>').
              addClass(
                'c-datatable__pager c-datatable--paging-loaded clearfix');
            // numbering links
            var pagerNumber = $('<ul/>').addClass('c-datatable__pager-nav');
            pg.pagerLayout['pagination'] = pagerNumber;

            // pager first/previous button
            $('<li/>').
              append($('<a/>').
                attr('title', title.first).
                addClass(
                  'c-datatable__pager-link c-datatable__pager-link--first').
                append($('<i/>').addClass(icons.first)).
                on('click', pg.gotoMorePage).
                attr('data-page', 1)).
              appendTo(pagerNumber);
            $('<li/>').
              append($('<a/>').
                attr('title', title.prev).
                addClass(
                  'c-datatable__pager-link c-datatable__pager-link--prev').
                append($('<i/>').addClass(icons.prev)).
                on('click', pg.gotoMorePage)).
              appendTo(pagerNumber);

            // more previous pages
            $('<li/>').
              append($('<a/>').
                attr('title', title.more).
                addClass(
                  'c-datatable__pager-link c-datatable__pager-link--more-prev').
                html($('<i/>').addClass(icons.more)).
                on('click', pg.gotoMorePage)).
              appendTo(pagerNumber);

            $('<li/>').
              append($('<input/>').
                attr('type', 'text').
                addClass('c-pager-input form-control').
                attr('title', title.input).
                on('keyup', function () {
                  // on keyup update [data-page]
                  $(this).attr('data-page', Math.abs($(this).val()));
                }).
                on('keypress', function (e) {
                  // on keypressed enter button
                  if (e.which === 13) pg.gotoMorePage(e);
                })).
              appendTo(pagerNumber);

            var pagesNumber = API.getOption(
              'toolbar.items.pagination.pages.desktop.pagesNumber');
            var end = Math.ceil(pg.meta.page / pagesNumber) * pagesNumber;
            var start = end - pagesNumber;
            if (end > pg.meta.pages) {
              end = pg.meta.pages;
            }
            for (var x = start; x < end; x++) {
              var pageNumber = x + 1;
              $('<li/>').
                append($('<a/>').
                  addClass(
                    'c-datatable__pager-link c-datatable__pager-link-number').
                  text(pageNumber).
                  attr('data-page', pageNumber).
                  attr('title', pageNumber).
                  on('click', pg.gotoPage)).
                appendTo(pagerNumber);
            }

            // more next pages
            $('<li/>').
              append($('<a/>').
                attr('title', title.more).
                addClass(
                  'c-datatable__pager-link c-datatable__pager-link--more-next').
                html($('<i/>').addClass(icons.more)).
                on('click', pg.gotoMorePage)).
              appendTo(pagerNumber);

            // pager next/last button
            $('<li/>').
              append($('<a/>').
                attr('title', title.next).
                addClass(
                  'c-datatable__pager-link c-datatable__pager-link--next').
                append($('<i/>').addClass(icons.next)).
                on('click', pg.gotoMorePage)).
              appendTo(pagerNumber);
            $('<li/>').
              append($('<a/>').
                attr('title', title.last).
                addClass(
                  'c-datatable__pager-link c-datatable__pager-link--last').
                append($('<i/>').addClass(icons.last)).
                on('click', pg.gotoMorePage).
                attr('data-page', pg.meta.pages)).
              appendTo(pagerNumber);

            // page info
            if (API.getOption('toolbar.items.info')) {
              pg.pagerLayout['info'] = $('<div/>').
                addClass('c-datatable__pager-info').
                append($('<span/>').addClass('c-datatable__pager-detail'));
            }

            $.each(API.getOption('toolbar.layout'), function (i, layout) {
              $(pg.pagerLayout[layout]).appendTo(pg.pager);
            });

            // page size select
            var pageSizeSelect = $('<select/>').
              addClass('selectpicker c-datatable__pager-size').
              attr('title', API.getOption(
                'translate.toolbar.pagination.items.default.select')).
              attr('data-width', '70px').
              val(pg.meta.perpage).
              on('change', pg.updatePerpage).
              prependTo(pg.pagerLayout['info']);
            $.each(API.getOption('toolbar.items.pagination.pageSizeSelect'),
              function (i, size) {
                var display = size;
                if (size === -1) display = 'All';
                $('<option/>').
                  attr('value', size).
                  html(display).
                  appendTo(pageSizeSelect);
              });

            // init selectpicker to dropdown
            $(datatable).ready(function () {
              $('.selectpicker').
                selectpicker().
                siblings('.dropdown-toggle').
                attr('title', API.getOption(
                  'translate.toolbar.pagination.items.default.select'));
            });

            pg.paste();
          },
          paste: function () {
            // insert pagination based on placement position, top|bottom
            $.each($.unique(API.getOption('toolbar.placement')),
              function (i, position) {
                if (position === 'bottom') {
                  $(pg.pager).clone(true).insertAfter(datatable.table);
                }
                if (position === 'top') {
                  // pager top need some extra space
                  $(pg.pager).
                    clone(true).
                    addClass('c-datatable__pager--top').
                    insertBefore(datatable.table);
                }
              });
          },
          gotoMorePage: function (e) {
            e.preventDefault();
            // $(this) is a link of .c-datatable__pager-link

            if ($(this).attr('disabled') === 'disabled') return false;

            var page = $(this).attr('data-page');

            // event from text input
            if (typeof page === 'undefined') {
              page = $(e.target).attr('data-page');
            }

            pg.openPage(parseInt(page));
            return false;
          },
          gotoPage: function (e) {
            e.preventDefault();
            // prevent from click same page number
            if ($(this).hasClass('c-datatable__pager-link--active')) return;

            pg.openPage(parseInt($(this).data('page')));
          },
          openPage: function (page) {
            // currentPage is 1-based index
            pg.meta.page = parseInt(page);

            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta);

            // update page callback function
            $(pg.pager).trigger('c-datatable--on-goto-page', pg.meta);
          },
          updatePerpage: function (e) {
            e.preventDefault();
            if (API.getOption('layout.height') === null) {
              // fix white space, when perpage is set from many records to less records
              $('html, body').animate({ scrollTop: $(datatable).position().top });
            }

            pg.pager = $(datatable.table).
              siblings('.c-datatable__pager').
              removeClass('c-datatable--paging-loaded');

            // on change select page size
            if (e.originalEvent) {
              pg.meta.perpage = parseInt($(this).val());
            }

            $(pg.pager).
              find('select.c-datatable__pager-size').
              val(pg.meta.perpage).
              attr('data-selected', pg.meta.perpage);

            // update datasource params
            API.setDataSourceParam('pagination', pg.meta);

            // update page callback function
            $(pg.pager).trigger('c-datatable--on-update-perpage', pg.meta);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta);

            // update pagination info
            pg.updateInfo.call();
          },
          addPaginateEvent: function (e) {
            // pagination event
            $(datatable).
              off(pg.paginateEvent).
              on(pg.paginateEvent, function (e, meta) {
                dt.spinnerCallback(true);

                pg.pager = $(datatable.table).siblings('.c-datatable__pager');
                var pagerNumber = $(pg.pager).find('.c-datatable__pager-nav');

                // set sync active page class
                $(pagerNumber).
                  find('.c-datatable__pager-link--active').
                  removeClass('c-datatable__pager-link--active');
                $(pagerNumber).
                  find('.c-datatable__pager-link-number[data-page="' +
                    meta.page + '"]').
                  addClass('c-datatable__pager-link--active');

                // set next and previous link page number
                $(pagerNumber).
                  find('.c-datatable__pager-link--prev').
                  attr('data-page', Math.max(meta.page - 1, 1));
                $(pagerNumber).
                  find('.c-datatable__pager-link--next').
                  attr('data-page', Math.min(meta.page + 1, meta.pages));

                // current page input value sync
                $(pg.pager).each(function () {
                  $(this).
                    find('.c-pager-input[type="text"]').
                    prop('value', meta.page);
                });

                $(pg.pager).find('.c-datatable__pager-nav').show();
                if (meta.pages <= 1) {
                  // hide pager if has 1 page
                  $(pg.pager).find('.c-datatable__pager-nav').hide();
                }

                // update datasource params
                API.setDataSourceParam('pagination', pg.meta);

                $(pg.pager).
                  find('select.c-datatable__pager-size').
                  val(meta.perpage).
                  attr('data-selected', meta.perpage);

                // clear active rows
                $(datatable.table).
                  find('.c-checkbox > [type="checkbox"]').
                  prop('checked', false);
                $(datatable.table).
                  find('.c-datatable__row--active').
                  removeClass('c-datatable__row--active');

                pg.updateInfo.call();
                pg.pagingBreakpoint.call();
                // dt.resetScroll();
              });
          },
          updateInfo: function () {
            var start = Math.max(pg.meta.perpage * (pg.meta.page - 1) + 1, 1);
            var end = Math.min(start + pg.meta.perpage - 1, pg.meta.total);
            // page info update
            $(pg.pager).
              find('.c-datatable__pager-info').
              find('.c-datatable__pager-detail').
              html(dt.dataPlaceholder(
                API.getOption('translate.toolbar.pagination.items.info'), {
                start: start,
                end: pg.meta.perpage === -1 ? pg.meta.total : end,
                pageSize: pg.meta.perpage === -1 ||
                  pg.meta.perpage >= pg.meta.total
                  ? pg.meta.total
                  : pg.meta.perpage,
                total: pg.meta.total,
              }));
          },

          /**
           * Update pagination layout breakpoint
           */
          pagingBreakpoint: function () {
            // keep page links reference
            var pagerNumber = $(datatable.table).
              siblings('.c-datatable__pager').
              find('.c-datatable__pager-nav');
            if ($(pagerNumber).length === 0) return;

            var currentPage = API.getCurrentPage();
            var pagerInput = $(pagerNumber).
              find('.c-pager-input').
              closest('li');

            // reset
            $(pagerNumber).find('li').show();

            // pagination update
            $.each(API.getOption('toolbar.items.pagination.pages'),
              function (mode, option) {
                if (cUtil.isInResponsiveRange(mode)) {
                  switch (mode) {
                    case 'desktop':
                    case 'tablet':
                      var end = Math.ceil(currentPage / option.pagesNumber) *
                        option.pagesNumber;
                      var start = end - option.pagesNumber;
                      $(pagerInput).hide();
                      pg.meta = API.getDataSourceParam('pagination');
                      pg.paginationUpdate();
                      break;

                    case 'mobile':
                      $(pagerInput).show();
                      $(pagerNumber).
                        find('.c-datatable__pager-link--more-prev').
                        closest('li').
                        hide();
                      $(pagerNumber).
                        find('.c-datatable__pager-link--more-next').
                        closest('li').
                        hide();
                      $(pagerNumber).
                        find('.c-datatable__pager-link-number').
                        closest('li').
                        hide();
                      break;
                  }

                  return false;
                }
              });
          },

          /**
           * Update pagination number and button display
           */
          paginationUpdate: function () {
            var pager = $(datatable.table).
              siblings('.c-datatable__pager').
              find('.c-datatable__pager-nav'),
              pagerMorePrev = $(pager).
                find('.c-datatable__pager-link--more-prev'),
              pagerMoreNext = $(pager).
                find('.c-datatable__pager-link--more-next'),
              pagerFirst = $(pager).find('.c-datatable__pager-link--first'),
              pagerPrev = $(pager).find('.c-datatable__pager-link--prev'),
              pagerNext = $(pager).find('.c-datatable__pager-link--next'),
              pagerLast = $(pager).find('.c-datatable__pager-link--last');

            // get visible page
            var pagerNumber = $(pager).find('.c-datatable__pager-link-number');
            // get page before of first visible
            var morePrevPage = Math.max($(pagerNumber).first().data('page') - 1,
              1);
            $(pagerMorePrev).each(function (i, prev) {
              $(prev).attr('data-page', morePrevPage);
            });
            // show/hide <li>
            if (morePrevPage === 1) {
              $(pagerMorePrev).parent().hide();
            } else {
              $(pagerMorePrev).parent().show();
            }

            // get page after of last visible
            var moreNextPage = Math.min($(pagerNumber).last().data('page') + 1,
              pg.meta.pages);
            $(pagerMoreNext).each(function (i, prev) {
              $(pagerMoreNext).attr('data-page', moreNextPage).show();
            });

            // show/hide <li>
            if (moreNextPage === pg.meta.pages
              // missing dot fix when last hidden page is one left
              && moreNextPage === $(pagerNumber).last().data('page')) {
              $(pagerMoreNext).parent().hide();
            } else {
              $(pagerMoreNext).parent().show();
            }

            // begin/end of pages
            if (pg.meta.page === 1) {
              $(pagerFirst).
                attr('disabled', true).
                addClass('c-datatable__pager-link--disabled');
              $(pagerPrev).
                attr('disabled', true).
                addClass('c-datatable__pager-link--disabled');
            } else {
              $(pagerFirst).
                removeAttr('disabled').
                removeClass('c-datatable__pager-link--disabled');
              $(pagerPrev).
                removeAttr('disabled').
                removeClass('c-datatable__pager-link--disabled');
            }
            if (pg.meta.page === pg.meta.pages) {
              $(pagerNext).
                attr('disabled', true).
                addClass('c-datatable__pager-link--disabled');
              $(pagerLast).
                attr('disabled', true).
                addClass('c-datatable__pager-link--disabled');
            } else {
              $(pagerNext).
                removeAttr('disabled').
                removeClass('c-datatable__pager-link--disabled');
              $(pagerLast).
                removeAttr('disabled').
                removeClass('c-datatable__pager-link--disabled');
            }

            // display more buttons
            var nav = API.getOption('toolbar.items.pagination.navigation');
            if (!nav.first) $(pagerFirst).remove();
            if (!nav.prev) $(pagerPrev).remove();
            if (!nav.next) $(pagerNext).remove();
            if (!nav.last) $(pagerLast).remove();
          },
        };
        pg.init(meta);
        return pg;
      },

      /**
       * Hide/show table cell defined by options[columns][i][responsive][visible/hidden]
       */
      columnHide: function () {
        var screen = cUtil.getViewPort().width;
        // foreach columns setting
        $.each(options.columns, function (i, column) {
          if (typeof column.responsive !== 'undefined') {
            var field = column.field;
            var tds = $.grep($(datatable.table).find('.c-datatable__cell'), function (n, i) {
              return field === $(n).data('field');
            });
            if (cUtil.getBreakpoint(column.responsive.hidden) >= screen) {
              $(tds).hide();
            } else {
              $(tds).show();
            }
            if (cUtil.getBreakpoint(column.responsive.visible) <= screen) {
              $(tds).show();
            } else {
              $(tds).hide();
            }
          }
        });
      },

      /**
       * Setup sub datatable
       */
      setupSubDatatable: function () {
        var detailCallback = API.getOption('detail.content');
        if (typeof detailCallback === 'function') {
          // subtable already exist
          if ($(datatable.table).find('.c-datatable__detail').length >
            0) return;

          $(datatable.wrap).addClass('c-datatable--subtable');

          options.columns[0]['subtable'] = true;

          // toggle on open sub table
          var toggleSubTable = function (e) {
            e.preventDefault();
            // get parent row of this detail table
            var parentRow = $(this).closest('.c-datatable__row');
            // get detail row for sub table
            var detailRow = $(parentRow).next().toggle();
            // get id from first column of parent row
            var primaryKey = $(this).
              closest('[data-field]:first-child').
              find('.c-datatable__toggle-subtable').
              data('value');

            var icon = $(this).find('i').removeAttr('class');
            if ($(detailRow).is(':hidden')) {
              $(icon).
                addClass(API.getOption('layout.icons.rowDetail.collapse'));
              // remove expand class from parent row
              $(parentRow).removeClass('c-datatable__row--detail-expanded');
              // trigger event on collapse
              $(datatable).
                trigger('c-datatable--on-collapse-detail', [parentRow]);
            } else {
              // expand and run callback function
              $(icon).addClass(API.getOption('layout.icons.rowDetail.expand'));
              // add expand class to parent row
              $(parentRow).addClass('c-datatable__row--detail-expanded');
              // trigger event on expand
              $(datatable).
                trigger('c-datatable--on-expand-detail', [parentRow]);

              $.map(datatable.dataSet, function (n, i) {
                if (primaryKey === n[options.columns[0].field]) {
                  e.data = n;
                  return true;
                }
                return false;
              });

              // pass placeholder cell for sub table
              e.detailCell = $(detailRow).find('.c-datatable__detail');
              if ($(e.detailCell).find('.c-datatable').length === 0) {
                // run callback with event
                detailCallback(e);
              }
            }
          };

          var columns = options.columns;
          $(datatable.tableBody).
            find('.c-datatable__row').
            each(function (tri, tr) {
              $(tr).find('.c-datatable__cell').each(function (tdi, td) {
                // get column settings by field
                var column = $.grep(columns, function (n, i) {
                  return $(td).data('field') === n.field;
                })[0];
                if (typeof column !== 'undefined') {
                  var value = $(td).text();
                  // enable column subtable toggle
                  if (typeof column.subtable !== 'undefined' &&
                    column.subtable) {
                    // check if subtable toggle exist
                    if ($(td).find('.c-datatable__toggle-subtable').length >
                      0) return;
                    // append subtable toggle
                    $(td).
                      children().
                      html($('<a/>').
                        addClass('c-datatable__toggle-subtable').
                        attr('href', '#').
                        attr('data-value', value).
                        attr('title', API.getOption('detail.title')).
                        on('click', toggleSubTable).
                        append($('<i/>').
                          addClass(API.getOption(
                            'layout.icons.rowDetail.collapse'))));
                  }
                }
              });
            });

          // prepare DOM for sub table, each <tr> as parent and add <tr> as child table
          $(datatable.tableBody).find('.c-datatable__row').each(function () {
            var detailRow = $('<tr/>').
              addClass('c-datatable__row-detail').
              hide().
              append($('<td/>').
                addClass('c-datatable__detail').
                attr('colspan', dt.getTotalColumns()));
            $(this).after(detailRow);
            // add class to even row
            if ($(this).hasClass('c-datatable__row--even')) {
              $(detailRow).addClass('c-datatable__row-detail--even');
            }
          });
        }
      },

      /**
       * Datasource mapping callback
       */
      dataMapCallback: function (raw) {
        // static dataset array
        var dataSet = raw;
        // dataset mapping callback
        if (typeof API.getOption('data.source.read.map') === 'function') {
          return API.getOption('data.source.read.map')(raw);
        } else {
          // default data mapping
          if (typeof raw.data !== 'undefined') {
            dataSet = raw.data;
          }
        }
        return dataSet;
      },

      isSpinning: false,
      /**
       * BlockUI spinner callback
       * @param block
       */
      spinnerCallback: function (block) {
        if (block) {
          if (!dt.isSpinning) {
            // get spinner options
            var spinnerOptions = API.getOption('layout.spinner');
            if (spinnerOptions.message === true) {
              // use default spinner message from translation
              spinnerOptions.message = API.getOption(
                'translate.records.processing');
            }
            dt.isSpinning = true;
            if (typeof mApp !== 'undefined') {
              mApp.block(datatable, spinnerOptions);
            }
          }
        } else {
          dt.isSpinning = false;
          if (typeof mApp !== 'undefined') {
            mApp.unblock(datatable);
          }
        }
      },

      /**
       * Default sort callback function
       * @param data
       * @param sort
       * @param column
       * @returns {*|Array.<T>|{sort, field}|{asc, desc}}
       */
      sortCallback: function (data, sort, column) {
        var type = column['type'] || 'string';
        var format = column['format'] || '';
        var field = column['field'];

        if (type === 'date' && typeof moment === 'undefined') {
          throw new Error('Moment.js is required.');
        }

        return $(data).sort(function (a, b) {
          var aField = a[field];
          var bField = b[field];

          switch (type) {
            case 'date':
              var diff = moment(aField, format).diff(moment(bField, format));
              if (sort === 'asc') {
                return diff > 0 ? 1 : diff < 0 ? -1 : 0;
              } else {
                return diff < 0 ? 1 : diff > 0 ? -1 : 0;
              }
              break;

            case 'number':
              if (isNaN(parseFloat(aField)) && aField != null) {
                aField = Number(aField.replace(/[^0-9\.-]+/g, ''));
              }
              if (isNaN(parseFloat(bField)) && bField != null) {
                bField = Number(bField.replace(/[^0-9\.-]+/g, ''));
              }
              aField = parseFloat(aField);
              bField = parseFloat(bField);
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }
              break;

            case 'string':
            default:
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }
              break;
          }
        });
      },

      /**
       * Custom debug log
       * @param text
       * @param obj
       */
      log: function (text, obj) {
        if (typeof obj === 'undefined') obj = '';
        if (datatable.debug) {
          console.log(text, obj);
        }
      },

      /********************
       ** HELPERS
       ********************/

      /**
       * Check if table is a locked colums table
       */
      isLocked: function () {
        return $(datatable.wrap).hasClass('c-datatable--lock') || false;
      },

      /**
       * Insert html into table content, take count mCustomScrollbar DOM to prevent replace
       * @param html
       * @param tablePart
       */
      replaceTableContent: function (html, tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        if ($(tablePart).hasClass('mCustomScrollbar')) {
          $(tablePart).find('.mCSB_container').html(html);
        } else {
          $(tablePart).html(html);
        }
      },

      /**
       * Get total extra space of an element for width calculation, including padding, margin, border
       * @param element
       * @returns {number}
       */
      getExtraSpace: function (element) {
        var padding = parseInt($(element).css('paddingRight')) +
          parseInt($(element).css('paddingLeft'));
        var margin = parseInt($(element).css('marginRight')) +
          parseInt($(element).css('marginLeft'));
        var border = Math.ceil(
          $(element).css('border-right-width').replace('px', ''));
        return padding + margin + border;
      },

      /**
       * Insert data of array into {{ }} template placeholder
       * @param template
       * @param data
       * @returns {*}
       */
      dataPlaceholder: function (template, data) {
        var result = template;
        $.each(data, function (key, val) {
          result = result.replace('{{' + key + '}}', val);
        });
        return result;
      },

      /**
       * Get table unique ID
       * Note: table unique change each time refreshed
       * @param suffix
       * @returns {*}
       */
      getTableId: function (suffix) {
        if (typeof suffix === 'undefined') suffix = '';
        return $(datatable).attr('id') + suffix;
      },

      /**
       * Get table prefix with depth number
       */
      getTablePrefix: function (suffix) {
        if (typeof suffix !== 'undefined') suffix = '-' + suffix;
        return 'c-datatable__' + dt.getTableId() + '-' + dt.getDepth() + suffix;
      },

      /**
       * Get current table depth of sub table
       * @returns {number}
       */
      getDepth: function () {
        var depth = 0;
        var table = datatable.table;
        do {
          table = $(table).parents('.c-datatable__table');
          depth++;
        } while ($(table).length > 0);
        return depth;
      },

      /**
       * Keep state item
       * @param key
       * @param value
       */
      stateKeep: function (key, value) {
        key = dt.getTablePrefix(key);
        if (API.getOption('data.saveState') === false) return;
        if (API.getOption('data.saveState.webstorage') && localStorage) {
          localStorage.setItem(key, JSON.stringify(value));
        }
        if (API.getOption('data.saveState.cookie')) {
          Cookies.set(key, JSON.stringify(value));
        }
      },

      /**
       * Get state item
       * @param key
       * @param defValue
       */
      stateGet: function (key, defValue) {
        key = dt.getTablePrefix(key);
        if (API.getOption('data.saveState') === false) return;
        var value = null;
        if (API.getOption('data.saveState.webstorage') && localStorage) {
          value = localStorage.getItem(key);
        } else {
          value = Cookies.get(key);
        }
        if (typeof value !== 'undefined' && value !== null) {
          return JSON.parse(value);
        }
      },

      /**
       * Update data in state without clear existing
       * @param key
       * @param value
       */
      stateUpdate: function (key, value) {
        var ori = dt.stateGet(key);
        if (typeof ori === 'undefined' || ori === null) ori = {};
        dt.stateKeep(key, $.extend({}, ori, value));
      },

      /**
       * Remove state item
       * @param key
       */
      stateRemove: function (key) {
        key = dt.getTablePrefix(key);
        if (localStorage) {
          localStorage.removeItem(key);
        }
        Cookies.remove(key);
      },

      /**
       * Get total columns.
       */
      getTotalColumns: function (tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        return $(tablePart).
          find('.c-datatable__row').
          first().
          find('.c-datatable__cell').length;
      },

      /**
       * Get total number of rows in a table.
       * Work both locked column and normal table
       * @param tablePart Optional
       */
      getTotalRows: function (tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        return $(tablePart).
          find('.c-datatable__row').
          first().
          parent().
          find('.c-datatable__row').length;
      },

      /**
       * Get table row. Useful to get row when current table is in lock mode.
       * Can be used for both lock and normal table mode.
       * By default, returning result will be in a list of <td>.
       * @param tablePart
       * @param row 1-based index
       * @param tdOnly Optional. Default true
       * @returns {*}
       */
      getOneRow: function (tablePart, row, tdOnly) {
        if (typeof tdOnly === 'undefined') tdOnly = true;
        // get list of <tr>
        var result = $(tablePart).
          find('.c-datatable__row:not(.c-datatable__row-detail):nth-child(' +
            row + ')');
        if (tdOnly) {
          // get list of <td> or <th>
          result = result.find('.c-datatable__cell');
        }
        return result;
      },

      /**
       * Check if element has horizontal overflow
       * @param element
       * @returns {boolean}
       */
      hasOverflowCells: function (element) {
        var children = $(element).
          find('tr:first-child').
          find('.c-datatable__cell');
        var maxWidth = 0;

        if (children.length > 0) {
          $(children).each(function (tdi, td) {
            maxWidth += Math.ceil($(td).innerWidth());
          });

          return maxWidth >= $(element).outerWidth();
        }

        return false;
      },

      /**
       * Check if element has horizontal overflow
       * @param element
       * @returns {boolean}
       */
      hasOverflowX: function (element) {
        var children = $(element).find('*');

        if (children.length > 0) {
          var maxWidth = Math.max.apply(null, $(children).map(function () {
            return $(this).outerWidth(true);
          }).get());

          return maxWidth > $(element).width();
        }

        return false;
      },

      /**
       * Check if element has vertical overflow
       * @param element
       * @returns {boolean}
       */
      hasOverflowY: function (element) {
        var children = $(element).find('.c-datatable__row');
        var maxHeight = 0;

        if (children.length > 0) {
          $(children).each(function (tdi, td) {
            maxHeight += Math.floor($(td).innerHeight());
          });

          return maxHeight > $(element).innerHeight();
        }

        return false;
      },

      /**
       * Sort table row at HTML level by column index.
       * todo; Not in use.
       * @param header Header sort clicked
       * @param sort asc|desc. Optional. Default asc
       * @param int Boolean. Optional. Comparison value parse to integer. Default false
       */
      sortColumn: function (header, sort, int) {
        if (typeof sort === 'undefined') sort = 'asc'; // desc
        if (typeof int === 'undefined') int = false;

        var column = $(header).index();
        var rows = $(datatable.tableBody).find('.c-datatable__row');
        var hIndex = $(header).closest('.c-datatable__lock').index();
        if (hIndex !== -1) {
          rows = $(datatable.tableBody).
            find('.c-datatable__lock:nth-child(' + (hIndex + 1) + ')').
            find('.c-datatable__row');
        }

        var container = $(rows).parent();
        $(rows).sort(function (a, b) {
          var tda = $(a).find('td:nth-child(' + column + ')').text();
          var tdb = $(b).find('td:nth-child(' + column + ')').text();

          if (int) {
            // useful for integer type sorting
            tda = parseInt(tda);
            tdb = parseInt(tdb);
          }

          if (sort === 'asc') {
            return tda > tdb ? 1 : tda < tdb ? -1 : 0;
          } else {
            return tda < tdb ? 1 : tda > tdb ? -1 : 0;
          }
        }).appendTo(container);
      },

      /**
       * Perform sort remote and local
       */
      sorting: function () {
        var sortObj = {
          init: function () {
            if (options.sortable) {
              $(datatable.tableHead).
                find('.c-datatable__cell:not(.c-datatable__cell--check)').
                addClass('c-datatable__cell--sort').
                off('click').
                on('click', sortObj.sortClick);
              // first init
              sortObj.setIcon();
            }
          },
          setIcon: function () {
            var meta = API.getDataSourceParam('sort');
            // sort icon beside column header
            var td = $(datatable.tableHead).
              find('.c-datatable__cell[data-field="' + meta.field + '"]').
              attr('data-sort', meta.sort);
            var sorting = $(td).find('span');
            var icon = $(sorting).find('i');

            var icons = API.getOption('layout.icons.sort');
            // update sort icon; desc & asc
            if ($(icon).length > 0) {
              $(icon).removeAttr('class').addClass(icons[meta.sort]);
            } else {
              $(sorting).append($('<i/>').addClass(icons[meta.sort]));
            }
          },
          sortClick: function (e) {
            var meta = API.getDataSourceParam('sort');
            var field = $(this).data('field');
            var column = dt.getColumnByField(field);
            // sort is disabled for this column
            if (typeof column.sortable !== 'undefined' &&
              column.sortable === false) return;

            $(datatable.tableHead).
              find('.c-datatable__cell > span > i').
              remove();

            if (options.sortable) {
              dt.spinnerCallback(true);

              var sort = 'desc';
              if (meta.field === field) {
                sort = meta.sort;
              }

              // toggle sort
              sort = typeof sort === 'undefined' || sort === 'desc'
                ? 'asc'
                : 'desc';

              // update field and sort params
              meta = { field: field, sort: sort };
              API.setDataSourceParam('sort', meta);

              sortObj.setIcon();

              setTimeout(function () {
                dt.dataRender('sort');
                $(datatable).trigger('c-datatable--on-sort', meta);
              }, 300);
            }
          },
        };
        sortObj.init();
      },

      /**
       * Update JSON data list linked with sort, filter and pagination.
       * Call this method, before using dataSet variable.
       * @returns {*|null}
       */
      localDataUpdate: function () {
        var params = API.getDataSourceParam();
        if (typeof datatable.originalDataSet === 'undefined') {
          datatable.originalDataSet = datatable.dataSet;
        }

        var field = params.sort.field;
        var sort = params.sort.sort;
        var column = dt.getColumnByField(field);
        if (typeof column !== 'undefined') {
          if (typeof column.sortCallback === 'function') {
            datatable.dataSet = column.sortCallback(datatable.originalDataSet,
              sort, column);
          } else {
            datatable.dataSet = dt.sortCallback(datatable.originalDataSet, sort,
              column);
          }
        } else {
          datatable.dataSet = datatable.originalDataSet;
        }

        if (typeof params.query === 'object') {
          params.query = params.query || {};

          var search = $(API.getOption('search.input')).val();
          if (typeof search !== 'undefined' && search !== '') {
            search = search.toLowerCase();
            datatable.dataSet = $.grep(datatable.dataSet, function (obj) {
              for (var field in obj) {
                if (!obj.hasOwnProperty(field)) continue;
                if (typeof obj[field] === 'string') {
                  if (obj[field].toLowerCase().indexOf(search) > -1) {
                    return true;
                  }
                }
              }
              return false;
            });
            // remove generalSearch as we don't need this for next columns filter
            delete params.query[dt.getGeneralSearchKey()];
          }

          // remove empty element from array
          $.each(params.query, function (k, v) {
            if (v === '') {
              delete params.query[k];
            }
          });

          // filter array by query
          datatable.dataSet = dt.filterArray(datatable.dataSet, params.query);

          // reset array index
          datatable.dataSet = datatable.dataSet.filter(function () {
            return true;
          });
        }

        return datatable.dataSet;
      },

      /**
       * Utility helper to filter array by object pair of {key:value}
       * @param list
       * @param args
       * @param operator
       * @returns {*}
       */
      filterArray: function (list, args, operator) {
        if (typeof list !== 'object') {
          return [];
        }

        if (typeof operator === 'undefined') operator = 'AND';

        if (typeof args !== 'object') {
          return list;
        }

        operator = operator.toUpperCase();

        if ($.inArray(operator, ['AND', 'OR', 'NOT']) === -1) {
          return [];
        }

        var count = Object.keys(args).length;
        var filtered = [];

        $.each(list, function (key, obj) {
          var to_match = obj;

          var matched = 0;
          $.each(args, function (m_key, m_value) {
            if (to_match.hasOwnProperty(m_key) && m_value == to_match[m_key]) {
              matched++;
            }
          });

          if (('AND' == operator && matched == count) ||
            ('OR' == operator && matched > 0) ||
            ('NOT' == operator && 0 == matched)) {
            filtered[key] = obj;
          }
        });

        list = filtered;

        return list;
      },

      /**
       * Reset lock column scroll to 0 when resize
       */
      resetScroll: function () {
        if (typeof options.detail === 'undefined' && dt.getDepth() === 1) {
          $(datatable.table).find('.c-datatable__row').css('left', 0);
          $(datatable.table).find('.c-datatable__lock').css('top', 0);
          $(datatable.tableBody).scrollTop(0);
        }
      },

      /**
       * Get column options by field
       * @param field
       * @returns {boolean}
       */
      getColumnByField: function (field) {
        var result;
        $.each(options.columns, function (i, column) {
          if (field === column.field) {
            result = column;
            return false;
          }
        });
        return result;
      },

      /**
       * Get default sort column
       */
      getDefaultSortColumn: function () {
        var result = { sort: '', field: '' };
        $.each(options.columns, function (i, column) {
          if (typeof column.sortable !== 'undefined'
            && $.inArray(column.sortable, ['asc', 'desc']) !== -1) {
            result = { sort: column.sortable, field: column.field };
            return false;
          }
        });
        return result;
      },

      /**
       * Helper to get element dimensions, when the element is hidden
       * @param element
       * @param includeMargin
       * @returns {{width: number, height: number, innerWidth: number, innerHeight: number, outerWidth: number, outerHeight: number}}
       */
      getHiddenDimensions: function (element, includeMargin) {
        var props = {
          position: 'absolute',
          visibility: 'hidden',
          display: 'block',
        },
          dim = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          hiddenParents = $(element).parents().addBack().not(':visible');
        includeMargin = (typeof includeMargin === 'boolean')
          ? includeMargin
          : false;

        var oldProps = [];
        hiddenParents.each(function () {
          var old = {};

          for (var name in props) {
            old[name] = this.style[name];
            this.style[name] = props[name];
          }

          oldProps.push(old);
        });

        dim.width = $(element).width();
        dim.outerWidth = $(element).outerWidth(includeMargin);
        dim.innerWidth = $(element).innerWidth();
        dim.height = $(element).height();
        dim.innerHeight = $(element).innerHeight();
        dim.outerHeight = $(element).outerHeight(includeMargin);

        hiddenParents.each(function (i) {
          var old = oldProps[i];
          for (var name in props) {
            this.style[name] = old[name];
          }
        });

        return dim;
      },

      getGeneralSearchKey: function () {
        var searchInput = $(API.getOption('search.input'));
        return $(searchInput).prop('name') || $(searchInput).prop('id');
      },

      /**
       * Get value by dot notation path string and to prevent undefined errors
       * @param path String Dot notation path in string
       * @param object Object to iterate
       * @returns {*}
       */
      getObject: function (path, object) {
        return path.split('.').reduce(function (obj, i) {
          return obj !== null && typeof obj[i] !== 'undefined' ? obj[i] : null;
        }, object);
      },

      /**
       * Extend object
       * @param obj
       * @param path
       * @param value
       * @returns {*}
       */
      extendObj: function (obj, path, value) {
        var levels = path.split('.'),
          i = 0;

        function createLevel(child) {
          var name = levels[i++];
          if (typeof child[name] !== 'undefined' && child[name] !== null) {
            if (typeof child[name] !== 'object' &&
              typeof child[name] !== 'function') {
              child[name] = {};
            }
          } else {
            child[name] = {};
          }
          if (i === levels.length) {
            child[name] = value;
          } else {
            createLevel(child[name]);
          }
        }

        createLevel(obj);
        return obj;
      },
    };

    this.API = {
      row: null,
      record: null,
      column: null,
      value: null,
      params: null,
    };

    /********************
     ** PUBLIC API METHODS
     ********************/
    var API = {
      // delay timer
      timer: 0,

      /**
       * Redraw datatable by recalculating its DOM elements, etc.
       * @returns {jQuery}
       */
      redraw: function () {
        dt.adjustCellsWidth.call();
        dt.adjustCellsHeight.call();
        dt.adjustLockContainer.call();
        dt.initHeight.call();
        return datatable;
      },

      /**
       * Shortcode to reload
       * @returns {jQuery}
       */
      load: function () {
        API.reload();
        return datatable;
      },

      /**
       * Datasource reload
       * @returns {jQuery}
       */
      reload: function () {
        var delay = (function () {
          return function (callback, ms) {
            clearTimeout(API.timer);
            API.timer = setTimeout(callback, ms);
          };
        })();
        delay(function () {
          // local only. remote pagination will skip this block
          if (options.data.serverFiltering === false) {
            dt.localDataUpdate();
          }
          dt.dataRender();
          $(datatable).trigger('c-datatable--on-reloaded');
        }, API.getOption('search.delay'));
        return datatable;
      },

      /**
       * Get record by record ID
       * @param id
       * @returns {jQuery}
       */
      getRecord: function (id) {
        if (typeof datatable.tableBody === 'undefined') datatable.tableBody = $(
          datatable.table).children('tbody');
        $(datatable.tableBody).
          find('.c-datatable__cell:first-child').
          each(function (i, cell) {
            if (id == $(cell).text()) {
              datatable.API.row = $(cell).closest('.c-datatable__row');
              var rowNumber = datatable.API.row.index() + 1;
              datatable.API.record = datatable.API.value = dt.getOneRow(
                datatable.tableBody, rowNumber);
              return datatable;
            }
          });
        return datatable;
      },

      /**
       * Get column of current record ID
       * @param columnName
       * @returns {jQuery}
       */
      getColumn: function (columnName) {
        datatable.API.column = datatable.API.value = $(datatable.API.record).
          find('[data-field="' + columnName + '"]');
        return datatable;
      },

      /**
       * Destroy datatable to original DOM state before datatable was initialized
       * @returns {jQuery}
       */
      destroy: function () {
        $(datatable).parent().find('.c-datatable__pager').remove();
        $(datatable).
          replaceWith(
            $(datatable.old).addClass('c-datatable--destroyed').show());
        $(datatable).trigger('c-datatable--on-destroy');
        return datatable;
      },

      /**
       * Sort by column field
       * @param field
       * @param sort
       */
      sort: function (field, sort) {
        if (typeof sort === 'undefined') sort = 'asc';
        $(datatable.tableHead).
          find('.c-datatable__cell[data-field="' + field + '"]').
          trigger('click');
        return datatable;
      },

      /**
       * Get current column value
       * @returns {jQuery}
       */
      getValue: function () {
        return $(datatable.API.value).text();
      },

      /**
       * Set checkbox active
       * @param cell JQuery selector or checkbox ID
       */
      setActive: function (cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).
            find('.c-checkbox--single > [type="checkbox"][value="' + cell +
              '"]');
        }

        $(cell).prop('checked', true);

        // normal table
        var row = $(cell).
          closest('.c-datatable__row').
          addClass('c-datatable__row--active');
        var index = $(row).index() + 1;

        // lock table
        $(row).
          closest('.c-datatable__lock').
          parent().
          find('.c-datatable__row:nth-child(' + index + ')').
          addClass('c-datatable__row--active');

        var ids = [];
        $(row).each(function (i, td) {
          var id = $(td).
            find(
              '.c-checkbox--single:not(.c-checkbox--all) > [type="checkbox"]').
            val();
          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });

        $(datatable).trigger('c-datatable--on-check', [ids]);
      },

      /**
       * Set checkbox inactive
       * @param cell JQuery selector or checkbox ID
       */
      setInactive: function (cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).
            find('.c-checkbox--single > [type="checkbox"][value="' + cell +
              '"]');
        }

        $(cell).prop('checked', false);

        // normal table
        var row = $(cell).
          closest('.c-datatable__row').
          removeClass('c-datatable__row--active');
        var index = $(row).index() + 1;

        // lock table
        $(row).
          closest('.c-datatable__lock').
          parent().
          find('.c-datatable__row:nth-child(' + index + ')').
          removeClass('c-datatable__row--active');

        var ids = [];
        $(row).each(function (i, td) {
          var id = $(td).
            find(
              '.c-checkbox--single:not(.c-checkbox--all) > [type="checkbox"]').
            val();
          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });

        $(datatable).trigger('c-datatable--on-uncheck', [ids]);
      },

      /**
       * Set all checkboxes active or inactive
       * @param active
       */
      setActiveAll: function (active) {
        // todo; check if child table also will set active?
        if (active) {
          API.setActive($(datatable.table).
            find('.c-datatable__body .c-datatable__row').
            find('.c-datatable__cell'));
        } else {
          API.setInactive($(datatable.table).
            find('.c-datatable__body .c-datatable__row').
            find('.c-datatable__cell'));
        }
        $(datatable.table).
          find('.c-datatable__body .c-datatable__row').
          find('.c-checkbox [type="checkbox"]').
          prop('checked', active || false);
      },

      /**
       * Get selected rows which are active
       * @returns {jQuery}
       */
      setSelectedRecords: function () {
        datatable.API.record = $(datatable.tableBody).
          find('.c-datatable__row--active');
        return datatable;
      },

      getSelectedRecords: function () {
        API.setSelectedRecords();
        return datatable.API.record;
      },

      /**
       * Get options by dots notation path
       * @param path String Dot notation path in string
       * @returns {*}
       */
      getOption: function (path) {
        return dt.getObject(path, options);
      },

      /**
       * Set global options nodes by dots notation path
       * @param path
       * @param object
       */
      setOption: function (path, object) {
        options = dt.extendObj(options, path, object);
      },

      /**
       * Search filter for local & remote
       * @param value
       * @param columns. Optional list of columns to be filtered.
       */
      search: function (value, columns) {
        if (typeof columns !== 'undefined') columns = $.makeArray(columns);
        var delay = (function () {
          return function (callback, ms) {
            clearTimeout(API.timer);
            API.timer = setTimeout(callback, ms);
          };
        })();

        delay(function () {
          // get query parameters
          var query = API.getDataSourceQuery();

          // search not by columns
          if (typeof columns === 'undefined' && typeof value !== 'undefined') {
            var key = dt.getGeneralSearchKey();
            query[key] = value;
          }

          // search by columns, support multiple columns
          if (typeof columns === 'object') {
            $.each(columns, function (k, column) {
              query[column] = value;
            });
            // remove empty element from arrays
            $.each(query, function (k, v) {
              if (v === '') {
                delete query[k];
              }
            });
          }

          API.setDataSourceQuery(query);

          // local filter only. remote pagination will skip this block
          if (options.data.serverFiltering === false) {
            dt.localDataUpdate();
          }
          dt.dataRender();
        }, API.getOption('search.delay'));
      },

      /**
       * Set datasource params
       * @param param
       * @param value
       */
      setDataSourceParam: function (param, value) {
        var defaultSort = dt.getDefaultSortColumn();
        datatable.API.params = $.extend({}, {
          pagination: { page: 1, perpage: API.getOption('data.pageSize') },
          sort: { sort: defaultSort.sort, field: defaultSort.field },
          query: {},
        }, datatable.API.params, dt.stateGet(dt.stateId));

        datatable.API.params = dt.extendObj(datatable.API.params, param, value);

        dt.stateKeep(dt.stateId, datatable.API.params);
      },

      /**
       * Get datasource params
       * @param param
       */
      getDataSourceParam: function (param) {
        var defaultSort = dt.getDefaultSortColumn();
        datatable.API.params = $.extend({}, {
          pagination: { page: 1, perpage: API.getOption('data.pageSize') },
          sort: { sort: defaultSort.sort, field: defaultSort.field },
          query: {},
        }, datatable.API.params, dt.stateGet(dt.stateId));

        if (typeof param === 'string') {
          return dt.getObject(param, datatable.API.params);
        }

        return datatable.API.params;
      },

      /**
       * Shortcode to datatable.getDataSourceParam('query');
       * @returns {*}
       */
      getDataSourceQuery: function () {
        return API.getDataSourceParam('query') || {};
      },

      /**
       * Shortcode to datatable.setDataSourceParam('query', query);
       * @param query
       */
      setDataSourceQuery: function (query) {
        API.setDataSourceParam('query', query);
      },

      /**
       * Get current page number
       * @returns {number}
       */
      getCurrentPage: function () {
        return $(datatable.table).
          siblings('.c-datatable__pager').
          last().
          find('.c-datatable__pager-nav').
          find('.c-datatable__pager-link.c-datatable__pager-link--active').
          data('page') || 1;
      },

      /**
       * Get selected dropdown page size
       * @returns {*|number}
       */
      getPageSize: function () {
        return $(datatable.table).
          siblings('.c-datatable__pager').
          last().
          find('.c-datatable__pager-size').
          val() || 10;
      },

      /**
       * Get total rows
       */
      getTotalRows: function () {
        return datatable.API.params.pagination.total;
      },

      /**
       * Get full dataset in grid
       * @returns {*|null|Array}
       */
      getDataSet: function () {
        return datatable.originalDataSet;
      },

      /**
       * Hide column by column's field name
       * @param fieldName
       */
      hideColumn: function (fieldName) {
        // add hide option for this column
        $.map(options.columns, function (column) {
          if (fieldName === column.field) {
            column.responsive = { hidden: 'xl' };
          }
          return column;
        });
        // hide current displayed column
        var tds = $.grep($(datatable.table).find('.c-datatable__cell'), function (n, i) {
          return fieldName === $(n).data('field');
        });
        $(tds).hide();
      },

      /**
       * Show column by column's field name
       * @param fieldName
       */
      showColumn: function (fieldName) {
        // add hide option for this column
        $.map(options.columns, function (column) {
          if (fieldName === column.field) {
            delete column.responsive;
          }
          return column;
        });
        // hide current displayed column
        var tds = $.grep($(datatable.table).find('.c-datatable__cell'), function (n, i) {
          return fieldName === $(n).data('field');
        });
        $(tds).show();
      },
    };

    /**
     * Public API methods can be used directly by datatable
     */
    $.each(API, function (funcName, func) {
      datatable[funcName] = func;
    });

    // initialize plugin
    if (typeof options === 'string') {
      API[options].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof options === 'object' || !options) {
      datatable.textAlign = {
        left: 'c-datatable__cell--left',
        center: 'c-datatable__cell--center',
        right: 'c-datatable__cell--right',
      };
      datatable.dataSet = null;

      // merge default and user defined options
      options = $.extend(true, {}, $.fn.cDatatable.defaults, options);
      $(datatable).data('options', options);
      $(datatable).trigger('c-datatable--on-init', options);

      // init plugin process
      dt.init.apply(this, [options]);
    } else {
      $.error('Method ' + options + ' does not exist');
    }

    return datatable;
  };

  // default options
  $.fn.cDatatable.defaults = {
    // datasource definition
    data: {
      type: 'local',
      source: null,
      pageSize: 10, // display 20 records per page
      saveState: {
        cookie: true,
        webstorage: true,
      }, // save datatable state(pagination, filtering, sorting, etc) in cookie or browser webstorage

      serverPaging: false,
      serverFiltering: false,
      serverSorting: false,
    },

    // layout definition
    layout: {
      theme: 'default', // datatable will support multiple themes and designs
      class: 'c-datatable--brand', // custom wrapper class
      scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
      height: null, // datatable's body's fixed height
      footer: false, // display/hide footer
      header: true, // display/hide header

      // datatable custom scroll params
      smoothScroll: {
        scrollbarShown: true,
      },

      // datatable spinner
      spinner: {
        overlayColor: '#000000',
        opacity: 0,
        type: 'loader',
        state: 'brand',
        message: true,
      },

      // datatable UI icons
      icons: {
        sort: { asc: 'las la-angle-up', desc: 'las la-angle-down' },
        pagination: {
          next: 'las la-angle-right',
          prev: 'las la-angle-left',
          first: 'las la-angle-double-left',
          last: 'las la-angle-double-right',
          more: 'las la-ellipsis-h',
        },
        rowDetail: { expand: 'las la-caret-down', collapse: 'las la-caret-right' },
      },
    },

    // column sorting
    sortable: true,

    // resize column size with mouse drag coming soon)
    resizable: false,

    // column based filtering (coming soon)
    filterable: false,

    pagination: true,

    // inline and bactch editing (cooming soon)
    editable: false,

    // columns definition
    columns: [],

    search: {
      // input text for search
      input: null,
      // search delay in milliseconds
      delay: 400,
    },

    rows: {},

    // toolbar
    toolbar: {
      // place pagination and displayInfo blocks according to the array order
      layout: ['pagination', 'info'],

      // toolbar placement can be at top or bottom or both top and bottom repeated
      placement: ['bottom'],  //'top', 'bottom'

      // toolbar items
      items: {
        // pagination
        pagination: {
          // pagination type(default or scroll)
          type: 'default',

          // number of pages to display by breakpoints
          pages: {
            desktop: {
              layout: 'default',
              pagesNumber: 6,
            },
            tablet: {
              layout: 'default',
              pagesNumber: 3,
            },
            mobile: {
              layout: 'compact',
            },
          },

          // navigation buttons
          navigation: {
            prev: true, // display prev link
            next: true, // display next link
            first: true, // display first link
            last: true // display last link
          },

          // page size select
          pageSizeSelect: [10, 20, 30, 50, 100/*, -1*/] // display dropdown to select pagination size. -1 is used for "ALl" option
        },

        // records info
        info: true,
      },
    },

    // here we will keep all strings and message used by datatable UI so developer can easiliy translate to any language.
    // By default the stirngs will be in the plugin source and here can override it
    translate: {
      records: {
        processing: 'Please wait...',
        noRecords: 'No records found',
      },
      toolbar: {
        pagination: {
          items: {
            default: {
              first: 'First',
              prev: 'Previous',
              next: 'Next',
              last: 'Last',
              more: 'More pages',
              input: 'Page number',
              select: 'Select page size',
            },
            info: 'Displaying {{start}} - {{end}} of {{total}} records',
          },
        },
      },
    },
  };

}(jQuery));