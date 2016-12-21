/*
    simpler show/hide toggle
    example:
    <a href="#" data-action="toggle" data-open-text="Hide RFR details" data-target="rfrList" id="toggleRFRList" class="js-only">Show added RFR details</a>
    data-action="toggle" // define action applied to element
    data-open-text="Hide RFR details" // text to swap out once clicked
    data-target="rfrList" // ID of target
*/

(function (globals) {
    'use strict';
    var init,
        showerHider,
        ShowHideToggle,
        DVSA = globals.DVSA || {};

    ShowHideToggle = function ShowHideToggle() {};

    function isHidden(el) {
        // This does not work in older version of IE annoyingly
        // return (el.offsetParent === null); 

        // But this hideous monstrosity does
        // TODO: Ditch this in favour of above or stop supporting <=IE9
        var style = window.getComputedStyle(el);
        return (style.display === 'none');
    }

    ShowHideToggle.prototype.init = function(){

        var self = this;
        this.triggerElements = document.querySelectorAll('[data-action="showHideToggle"]');

        for (var i=0; i < this.triggerElements.length; i++){
            (function () {
                var triggerElement = self.triggerElements[i],
                    triggerElementStartText = triggerElement.text,
                    triggerElementOpenText = triggerElement.getAttribute('data-open-text'),
                    targetId = triggerElement.getAttribute('data-target'),
                    toggleType = triggerElement.getAttribute('data-toggle-type'),
                    targetElement = document.querySelector('#' + targetId),
                    footerTriggerElement = self.triggerElements[1];
                    // use the less particular jQuery to be a bit more flexible about what elements we can target, either one # or many .
                    // targetElement = $(targetId);

                triggerElement.setAttribute('data-closed-text', triggerElementStartText);

                // add class to target element in case it doesn't have one
                // a lapse into jQuery to save adding tons of extra code to check class list etc
                // seeing as we're loading it anyway...
                if(toggleType != 'responsive') {
                    $(targetElement).addClass(' js-hidden');
                }

                if (window.addEventListener) {
                    triggerElement.addEventListener('click', function(e) {
                        e.preventDefault();
                        self.checkState(triggerElement, targetElement, triggerElementStartText, triggerElementOpenText, targetId);
                    });

                    footerTriggerElement.addEventListener('click', function(e) {
                        e.preventDefault();
                        self.scrollToTable(targetId);
                    });
                }
            }());
        }
    };

    ShowHideToggle.prototype.checkState = function(triggerElement, targetElement, triggerElementStartText, triggerElementOpenText, toggleType){

        if(isHidden(targetElement)) {
            
            this.showToggle(targetElement, triggerElementOpenText, toggleType);
        } else {
            
            this.hideToggle(targetElement, triggerElementStartText, toggleType);
        }
    };

    // OK, lapsing into more jQuery as time is of the essence...
    ShowHideToggle.prototype.showToggle = function(targetElement, triggerElementOpenText, toggleType) {

        if(toggleType == 'responsive') {

            $(targetElement).removeClass('hide-small');

        } else {

            $(targetElement).removeClass('js-hidden');

        }

        $('[data-action="showHideToggle"]').each(function(){
            $(this).text(triggerElementOpenText);
            $(this).removeClass('toggle-switch').addClass('toggle-switch--open');
        });
    };

    ShowHideToggle.prototype.hideToggle = function(targetElement, triggerElementStartText, toggleType) {

        if(toggleType == 'responsive') {

            $(targetElement).addClass('hide-small');

        } else {

             $(targetElement).addClass('js-hidden');
        }

        $('[data-action="showHideToggle"]').each(function(){
            $(this).text(triggerElementStartText);
            $(this).removeClass('toggle-switch--open').addClass('toggle-switch');
        });
    };

    ShowHideToggle.prototype.scrollToTable = function(targetId) {
        // If the bottom link is changed, then pull the "header bar" of the active area back into focus at the top of the screen to prevent user from getting lost
        $('#' + targetId + 'Parent')[0].scrollIntoView(true);
    };

    // use below to init on all pages
    // showerHider = new ShowHideToggle();
    // this has been left in, in case requirements change
    init = function () {
        //showerHider.init();
    };

    globals.DVSAShowHideToggle = {
        init: init,
        showerHider: ShowHideToggle
    };

}(this));
