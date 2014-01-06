(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t = this.length > 1 ? this.eq(0) : this,
            t  = $t.get(0),
            vpHeight = $w.height(),
            vpWidth  = $w.width(),
            direction  = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true,
            rec = getRec1($t) || getRec2($t),
            tViz = rec.top    >= 0 && rec.top    <  vpHeight,
            bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
            lViz = rec.left   >= 0 && rec.left   <  vpWidth,
            rViz = rec.right  >  0 && rec.right  <= vpWidth,
            vVisible   = partial ? tViz || bViz : tViz && bViz,
            hVisible   = partial ? lViz || lViz : lViz && rViz;

        if(direction === 'both')
            return clientSize && vVisible && hVisible;
        else if(direction === 'vertical')
            return clientSize && vVisible;
        else if(direction === 'horizontal')
            return clientSize && hVisible;
    };

    function getRec1($el){
        var el = $el[0];
        if (typeof el.getBoundingClientRect !== 'function')
            return;
        return el.getBoundingClientRect();
    }

    function getRec2($el){
        var offset = $el.offset(),
            elTop = offset.top,
            elLeft = offset.left,
            scrollTop = $w.scrollTop(),
            scrollLeft = $w.scrollLeft(),
            top = elTop - scrollTop,
            left = elLeft - scrollLeft,
            elHeight = $el.height(),
            elWidth = $el.width();
        return {
            top: top,
            left: left,
            bottom: top + elHeight,
            right: left + elWidth
        };
    }

})(jQuery);








