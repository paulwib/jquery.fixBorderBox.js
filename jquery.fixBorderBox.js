/**
 *
 * jQuery.fixBorderBox.js
 *
 * This fixes animations of width/height for elements with
 * `box-sizing:border-box` by introducing two new CSS properties `bbwidth` and
 * `bbheight` e.g.
 *
 *         $('.border-box').animate({ bbwidth: 150, bbheight: 200 });
 *
 * This is only needed for jQuery 1.7.x and below, it's fixed in 1.8.x and above
 * (but it won't do any harm if you accidentally include it).
 *
 * @author Paul Willoughby <paul@fivetide.com>
 */

(function($) {
    if(!$.cssHooks) {
        throw("jQuery 1.4.3 or above is required to for jQuery.fixBorderBox.js");
    }

    $(function() {

        // For width and height
        $.each(["Width", "Height"], function(k, v) {
            var lv = v.toLowerCase();
            var p = "bb" + lv;

            // Set the CSS hook
            $.cssHooks[p] = {
                get: function(elem) {
                    return $(elem)["outer"+v]();
                },
                set: function(elem, val) {
                    $(elem).css(lv, val);
                }
            };

            // Set the animation step to use the hook
            $.fx.step[p] = function(fx) {
                $.cssHooks[p].set(fx.elem, fx.now + fx.unit);
            };
        });
    });
})(jQuery);
