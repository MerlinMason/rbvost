(function ($) {
    "use strict";

    var rbvost = {

        siteurl:    "http://127.0.0.1:8080/wordpress/",
        themeurl:   "http://127.0.0.1:8080/wordpress//wp-content/themes/rbvost/",

        init: function () {
            $.ajax({
                url: rbvost.siteurl + "?json=1"
            })
            .done(function (data) {
                rbvost.renderView(data);
                console.log(data);
            })
            .fail(function () {
                alert("error");
            });
        },

        renderView: function (data) {
            $.get(rbvost.themeurl + "_template.html", function (template) {
                $("#app").html(
                    Mustache.render(template, data)
                );
                rbvost.bindUIActions();
            });
        },

        bindUIActions: function () {
            $(".btn").on("click", function (e) { rbvost.sayHello(e); });
        },

        windowLoaded: function () {
            console.log("Loaded");
        },

        windowResized: function () {
            console.log("Resized");
        },

        windowScrolled: function () {
            // Improve performance while scrolling by not triggering hover events
            // http://www.thecssninja.com/javascript/pointer-events-60fps
            var body = document.documentElement;
            var timer;

            if (!body.style.pointerEvents) {
                body.style.pointerEvents = "none";
            }

            timer = setTimeout(function () {
                body.style.pointerEvents = "";
            }, 200);
        },

        sayHello: function (e) {
            var button = $(e.currentTarget);
            console.log("Hello! You clicked " + button);
        }

    };

    // DOM Ready
    $(function () { rbvost.init(); });
    // Images Loaded
    $(window).load(function () { rbvost.windowLoaded(); });
    // Window Resized (smart debounced event)
    $(window).bind("debouncedresize", function () { rbvost.windowResized(); });
    // Window Scrolled
    $(window).on("scroll", function () { rbvost.windowScrolled(); });

} (jQuery));
