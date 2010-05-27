; (function($) {

    $.fn.Marquee = function(options) {
        return this.each(function() {
            var obj = new Marquee(this, options);
            $.data(this, 'Marquee', obj);
            obj.Start();
        });
    };

    function Marquee(element, options) {
        options = $.extend({
            Delay: 10,
            LineHeight: 20,
            CharWidth: 20,
            Amount: 1,
            Direction: "up",
            Timeout: 1500
        }, options) || {};

        this.Delay = options.Delay;
        this.LineHeight = options.LineHeight;
        this.CharWidth = options.CharWidth;
        this.Amount = options.Amount;
        this.Direction = options.Direction;
        this.Timeout = options.Timeout;
        this.ScrollContent = element;
        this.$content = $(element);
        this.ScrollContent.innerHTML += this.ScrollContent.innerHTML;
        this.ScrollContent.onmouseover = this.GetFunction(this, "Stop");
        this.ScrollContent.onmouseout = this.GetFunction(this, "Start");
    }

    Marquee.prototype = {
        Start: function() {
            if (this.Direction == 'up' || this.Direction == 'down') {
                this.ScrollContent.style.overflow = "hidden";
            }
            if (this.Direction == 'left' || this.Direction == 'right') {
                this.$content.css('overflow-x', 'hidden').css('white-space', 'nowrap');
            }
            clearTimeout(this.AutoScrollTimer);
            this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Timeout);
        },

        Stop: function() {
            clearTimeout(this.ScrollTimer);
            clearTimeout(this.AutoScrollTimer);
        },

        AutoScroll: function() {
            if (this.Direction == "up") {
                this.ScrollContent.scrollTop += this.Amount;
                if (parseInt(this.ScrollContent.scrollTop) >= parseInt(this.ScrollContent.scrollHeight) / 2) {
                    this.ScrollContent.scrollTop = 0;
                }
            }
            else if (this.Direction == "down") {
                this.ScrollContent.scrollTop -= this.Amount;
                if (parseInt(this.ScrollContent.scrollTop) <= 0) {
                    this.ScrollContent.scrollTop = parseInt(this.ScrollContent.scrollHeight) / 2;
                }
            }
            else if (this.Direction == "left") {
                this.ScrollContent.scrollLeft += this.Amount;
                if (parseInt(this.ScrollContent.scrollLeft) >= parseInt(this.ScrollContent.scrollWidth) / 2) {
                    this.ScrollContent.scrollLeft = 0;
                }
                else if (parseInt(this.ScrollContent.scrollLeft) + this.ScrollContent.offsetWidth >= parseInt(this.ScrollContent.scrollWidth)) {
                    this.ScrollContent.scrollLeft = 0;
                }
            }
            else if (this.Direction == "right") {
                this.ScrollContent.scrollLeft -= this.Amount;
                if (parseInt(this.ScrollContent.scrollLeft) <= 0) {
                    this.ScrollContent.scrollLeft = parseInt(this.ScrollContent.scrollWidth) / 2;
                }
            }

            if (this.Direction == "up" || this.Direction == "down") {
                if (parseInt(this.ScrollContent.scrollTop) % this.LineHeight != 0) {
                    this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Delay);
                }
                else {
                    this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Timeout);
                }
            }

            if (this.Direction == "left" || this.Direction == "right") {
                if (parseInt(this.ScrollContent.scrollLeft) % this.CharWidth != 0) {
                    this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Delay);
                }
                else {
                    this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Timeout);
                }
            }
        },

        GetFunction: function(variable, method, param) {
            return function() {
                variable[method](param);
            }
        }

    };
} (jQuery));
