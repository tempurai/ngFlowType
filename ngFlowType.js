/*
 * Original project
 * FlowType.JS v1.1
 * Copyright 2013-2014, Simple Focus http://simplefocus.com/
 *
 * FlowType.JS by Simple Focus (http://simplefocus.com/)
 * is licensed under the MIT License. Read a copy of the
 * license in the LICENSE.txt file or at
 * http://choosealicense.com/licenses/mit
 *
 * Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
 */

'use strict';

/* Directives */

angular.module('ngFlowtype', []).
    directive('flowtype', function ($compile) {

        var flowType = function (element, options) {
            var settings = $.extend({
                maximum  : 9999,
                minimum  : 1,
                maxFont  : 9999,
                minFont  : 1,
                fontRatio: 35
            }, options);

            var changes = function (element) {
                var $el = $(element),
                    elw = $el.width(),
                    width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
                    fontBase = width / settings.fontRatio,
                    fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
                $el.css('font-size', fontSize + 'px');
            };


            $(window).resize(function () {
                changes(element);
            });

            changes(element)

        };

        return {
            restrict: 'A',
            link    : function (scope, element, attrs) {
                var options = {};
                options.maximum = attrs.maximum || 9999;
                options.minimum = attrs.minimum || 1;
                options.minFont = attrs.minFont || 1;
                options.maxFont = attrs.maxFont || 9999;
                options.fontRatio = attrs.fontRatio || 35;
                options.lineRatio = attrs.lineRatio || 1.45;
                flowType(element, options);
            }
        };
    });
