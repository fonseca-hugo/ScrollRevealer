ScrollRevealer
===========

ScrollRevealer is a light plugin that reveals elements on the page as you scroll.

Dependencies
========

FluidLayout depends on [jQuery](http://jquery.com).

Features
========

ScrollRevealer allows tiles to reveal and animate elements on the page, whether by simply revealing, or also animating up, left or right.
It very easy to use and also highly customizable and lighweight.

Usage
========

Default usage:

<pre>
$(document).ready(function () {
    ScrollRevealer.init(".js-scroll-reveal");
});
</pre>

Specify a custom class:

<pre>
ScrollRevealer.init(".js-sr");
</pre>

Change the debounce time:

<pre>
ScrollRevealer.init(".js-scroll-reveal", 40);
</pre>


License
========

ScrollRevealer is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).