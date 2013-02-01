jQuery Fix `box-sizing: border-box` Width and Height Animations
===============================================================

In jQuery 1.7.x and previous the `.css('width')` and `.css('height')` will deduct any
padding and margins. But the CSS property `box-sizing: border-box` means these should
*not* be deducted. The upshot is if you've ever tried to animate width or height on
an element with `box-sizing: border-box` you'll notice all kinds of weird jerkiness.

Take this example which tries to add 50px to the width of a border-box which has 20px
padding and 1px border:

    $('.border-box').animate(
        { width: parseInt($('.border-box').css('width')) + 50 }
    );

The box will appear to jerkily narrow then expand. If the animation was ging the other
way, wide to narrow, it would appear to skip the first part of the animation.

This script will allow you to workaround that by using a pseudo CSS property `bbwidth`:

    $('.border-box').animate(
        { bbwidth: parseInt($('.border-box').css('bbwidth')) + 50 }
    );

This is fixed in jQuery 1.8.x and above to work as expected, although the
`width()` function has not changed and still returns the width *without* border
and padding.

MIT License.
