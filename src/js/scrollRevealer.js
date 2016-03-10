/* ===================================================
 * scrollRevealer.js v1.0
 * https://github.com/fonseca-hugo/ScrollRevealer
 *
 * @name scrollRevealer.js
 * @author Hugo Fonseca (hugofonseca.co.uk)
 * @version 1.0
 * @date 01/09/2016
 * ===================================================
 * Copyright (c) 2011-2015 Hugo Fonseca (fonseca.hugo@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
ScrollRevealer = (function () {
    "use strict";
    /* global ScrollRevealer, $, document, window */
    return {
        elems: [],
        debounceTime: 20,
        /**
         * Initialize the ScrollRevealer
         *
         * @param elems - the className
         * @param debounceTime - time for scroll debounce in ms
         */
        init: function (elems, debounceTime) {
            ScrollRevealer.elems = $(elems);
            ScrollRevealer.elems.each(function () {
                $(this).addClass('before-animation');
            });
            if (debounceTime) {
                ScrollRevealer.debounceTime = debounceTime;
            }
            ScrollRevealer.debounce(ScrollRevealer.areElemsVisible(), ScrollRevealer.debounceTime);
            $(document).scroll(function () {
                ScrollRevealer.debounce(ScrollRevealer.areElemsVisible(), ScrollRevealer.debounceTime);
            });
        },
        debounce: function (func, wait, immediate) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments,
                    later = function () {
                        timeout = null;
                        if (!immediate) {
                            func.apply(context, args);
                        }
                    },
                    callNow = immediate && !timeout;

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            };
        },
        /**
         * Check if the elements are visible
         */
        areElemsVisible: function () {
            ScrollRevealer.elems.each(function () {
                var elem = $(this),
                    delay,
                    direction;

                if (elem.hasClass('before-animation') && ScrollRevealer.isOnScreen(elem)) {
                    delay = elem.data('animation-delay');
                    direction = elem.data('animation-dir');
                    direction = direction ? "-" + direction : "";

                    if (delay) {
                        elem.css({'animation-delay': delay});
                    }

                    elem.addClass('fade-in' + direction).removeClass('before-animation').addClass('animated');
                }
            });
        },
        /**
         * Check if the element is in the viewport
         * @param elem - the element
         * @param onlyViewport - true -> only trigger if the element is visible on the viewport
         * @returns {boolean}
         */
        isOnScreen: function (elem, onlyViewport) {
            var win = $(window),
                viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                },
                bounds = elem.offset(),
                isInViewport = false;

            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();

            bounds.right = bounds.left + elem.outerWidth();
            bounds.bottom = bounds.top + elem.outerHeight();

            if (onlyViewport) {
                isInViewport = viewport.top > bounds.bottom;
            }

            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || isInViewport));
        }
    };
})();